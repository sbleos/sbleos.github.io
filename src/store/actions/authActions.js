 import { createNotification } from './notificationActions';
import { getFiscalYear } from '../../utils/utils'

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({type: "LOGIN_SUCCESS"})
    })
    .catch(error => {
      dispatch({type: "LOGIN_ERROR", error})
      dispatch(createNotification({error}))
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const auth = firebase.auth();

    auth.signOut()
    .then(() => {
      dispatch({type: "SIGNOUT_SUCCESS"})
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    auth.createUserWithEmailAndPassword(newUser.email,newUser.password)
    .then((res) => {
      var actionCodeSettings = {
        url: 'https://sbleos.org'
      };
      res.user.sendEmailVerification(actionCodeSettings)
      .then(() => {
        dispatch({type: "EMAIL_VERIFICATION_SUCCESS"})
      })
      .catch((error) => {
        dispatch({type: "EMAIL_VERIFICATION_ERROR", error: error})
        dispatch(createNotification({error}))
      });
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        id: res.user.uid, //document id
        memberID: "",
        position: "Member",
        developer: false,
        start: getFiscalYear(new Date()),
        end: "",
        dateOfBirth: "",
        address: "",
        city: "",
        zipCode: "",
        phoneNumber: "",
        joinDate: new Intl.DateTimeFormat('en-US').format(new Date())
      });
    }).then(() => {
      dispatch({type: "SIGNUP_SUCCESS"})
      dispatch(createNotification({
        title: "You signed up!",
        message: "Welcome to the South Brunswick Leo Club!",
        type: "success",
        delay: 5000
      }))
    }).catch(error => {
      dispatch({type: "SIGNUP_ERROR", error})
      dispatch(createNotification({error}))
    });;

  }
}

export const sendPasswordResetEmail = (emailAddress) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(emailAddress)
    .then(() => {
      dispatch({type: "SEND_PASSWORD_RESET_EMAIL_SUCCESS"})
      dispatch(createNotification({
        title: "Password Reset Email Sent!",
        message: "Check your email for a link to reset your password.",
        type: "success",
        delay: 5000
      }))
    }).catch(error => {
      dispatch({type: "SEND_PASSWORD_RESET_EMAIL_ERROR", error: error})
      dispatch(createNotification({error}))
    });
  }
}

export const updatePassword = (currentPassword, newPassword) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const auth = firebase.auth();
    const user = auth.currentUser;

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    )

    user.reauthenticateWithCredential(credential)
    .then(() => {
      user.updatePassword(newPassword);
    })
    .then(() => {
      dispatch({type: "UPDATE_PASSWORD_SUCCESS"})
      dispatch(createNotification({
        title: "Updated Password!",
        type: "success",
        delay: 5000
      }))
    }).catch(error => {
      dispatch({type: "UPDATE_PASSWORD_ERROR", error})
      dispatch(createNotification({error}))
    });
  }
}