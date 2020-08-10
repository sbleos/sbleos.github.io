const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp(functions.config().firebase);

// Firebase Cloud Functions uses Node.js, Firebase Admin SDK is used to interact with Firestore from the server


const transporter = nodemailer.createTransport({
   service: "Gmail", // no need to set host or port etc.
   auth: {
       user: functions.config().email.username,  // this will need to be initialized if you want to update any cloud functions
       pass: functions.config().email.password
   }
});

// isActive, getActiveBoardEmails, and getFiscalYear are adapted from src/store/actions/userActions.js and src/utils/utils/js

const getFiscalYear = (date) => {
  const eventDate = new Date(date);
  const benchmark = new Date(`July 1, ${eventDate.getFullYear()}`); // start of new fiscal year in year of the event

  const numMonths = eventDate.getMonth() - benchmark.getMonth() + (12 * (eventDate.getFullYear() - benchmark.getFullYear()));

  const fiscalYear =  numMonths < 0
                      ? `${eventDate.getFullYear()-1}-${eventDate.getFullYear()}`   // event is before benchmark
                      : `${eventDate.getFullYear()}-${eventDate.getFullYear()+1}`   // event is after benchmark

  return fiscalYear;
}

const isActive = (startYear, endYear) => {
  const startDate = new Date(`July 1, ${startYear}`),
  today = new Date(),
  endDate = new Date(`June 30, ${endYear}`);

  return startDate <= today && today <= endDate;
}

/**
 * Gets the email addresses of the active board using Admin SDK
 * @return {Promise} "Thenable" contains array of the email addresses of the active board
 */
const getActiveBoardEmails = () => {
  return admin.firestore().collection("users").get().then(querySnapshot => {
    var activeBoardMemberEmails = [];
    querySnapshot.forEach(userDoc => {
      var user = userDoc.data();

      var start = parseInt(user["start"].split("-")[0]),
      end = user["end"] !== "" ? parseInt(user["end"].split("-")[1]) : parseInt(getFiscalYear(new Date()).split("-")[1]);

      if(user["position"] !== "Member" && isActive(start, end))
        activeBoardMemberEmails.push(user["email"])

    })

    return activeBoardMemberEmails;
  })
}

exports.userJoined = functions.firestore
  .document(`users/{userID}`)
  .onCreate(snap => {
    const user = snap.data();

    var recipients = ['sarangmohaniraj@gmail.com'];
    return getActiveBoardEmails().then(recipients =>
      transporter.sendMail({
        from: functions.config().email.username,
        to: recipients,
        subject: 'A New Leo Joined The Club!',
        text: `${user.firstName} ${user.lastName} joined the club! Once ${user.email} is accepted to MyLCI, you can verify ${user.firstName} using the new Leo's member ID.`,
        html: `<p>${user.firstName} ${user.lastName} joined the club! Once ${user.email} is accepted to MyLCI, you can <a href="http://sbleos.org/dashboard">verify</a> ${user.firstName} using the member ID.</p>`
      })
    )
   })