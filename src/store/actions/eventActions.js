import { createNotification } from './notificationActions';

export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const db = getFirebase().firestore();

    db.collection('events').add({
      ...event
    }).then(() => {
      dispatch({type: 'CREATE_EVENT', event})
       dispatch(createNotification({
        title: "Created New Event",
        message: `Created Event "${event.title}"`,
        type: "success",
        delay: 5000
      }))
    }).catch((error) => {
      dispatch({type: 'CREATE_EVENT_ERROR', error})
      dispatch(createNotification({error}))
    });

  }
};