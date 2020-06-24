import { createNotification } from './notificationActions';
import { getFiscalYear } from '../../utils/utils'

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();

    auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({type: "LOGIN_SUCCESS"})
    })
    .catch(error => {
      dispatch({type: "LOGIN_ERROR", error: error})
      dispatch(createNotification({error}))
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();
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
    const db = firebase.firestore();

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
      return db.collection('users').doc(res.user.uid).set({
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
        joinDate: new Date().toLocaleDateString()
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
      dispatch({type: "SIGNUP_ERROR", error: error})
      dispatch(createNotification({error}))
    });;

  }
}