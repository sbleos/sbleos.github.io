export const updateUser = (updatedUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection('users').doc(updatedUser.id).update(updatedUser)
    .then(() => {
      dispatch({type: 'UPDATE_USER', updatedUser})
    }).catch(error => {});
  }
};