export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const auth = getFirebase().auth();

    auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({type: "LOGIN_SUCCESS"})
    })
    .catch(error => {
      dispatch({type: "LOGIN_ERROR", error: error})
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
      res.user.sendEmailVerification()
      .then(() => { //.then() is nested and not added on to the main level to maintain seperation of errors
        dispatch({type: "EMAIL_VERIFICATION_SUCCESS"})
      })
      .catch((error) => {
        dispatch({type: "EMAIL_VERIFICATION_SUCCESS"})
      });
      return db.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        ID: 0,
        role: "Member",
        developer: false
      });
    }).then(() => {
      dispatch({type: "SIGNUP_SUCCESS"})
    }).catch(error => {
      dispatch({type: "SIGNUP_ERROR", error: error})
    });;

  }
}