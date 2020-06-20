export const updateUser = (updatedUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const users = firestore.collection('users');

    users.where("email", "==", updatedUser['email'])
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        users.doc(doc.id)
        .update(updatedUser)
        .then(() => {
          dispatch({type: 'UPDATE_USER', updatedUser})
        })
      });
    })
    .catch(error => {});

  }
};