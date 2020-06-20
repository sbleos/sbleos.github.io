export const updateUser = (updatedUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    console.log(updatedUser)
    // firestore.collection('users').add({
    //   ...updatedUser
    // }).then(() => {
    //   dispatch({type: 'UPDATE_USER', updatedUser})
    // }).catch((error) => {
    //   console.log(error)
    // });

  }
};