export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const db = getFirebase().firestore();

    db.collection('events').add({
      ...event
    }).then(() => {
      dispatch({type: 'CREATE_EVENT', event})
    }).catch((error) => {
      dispatch({type: 'CREATE_EVENT_ERROR', error})
    });

  }
};