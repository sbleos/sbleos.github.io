import { createNotification } from './notificationActions';

export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();

    if(event.image){
      const uuid = [...Array(10)].map(_=>(Math.random()*36|0).toString(36)).join``;
      const imgPath = `images/events/${uuid}-${event.image.name}`;
      storageRef.child(imgPath).put(event.image)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          dispatch({type: 'UPLOAD_EVENT_IMAGE_SUCCESS'})

          delete event.image;
          firestore.collection('events').add({
            ...event,
            imgURL: url,
            imgPath
          }).then(() => {
            dispatch({type: 'CREATE_EVENT', event})
            dispatch(createNotification({
              title: "Created New Event",
              message: `Created Event "${event.title}"`,
              type: "success",
              delay: 5000
            }))
          });
        });

      }).catch((error) => {
        dispatch({type: 'UPLOAD_EVENT_IMAGE_ERROR', error})
        dispatch(createNotification({error}))
      });
    }
    else {
      firestore.collection('events').add({
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

  }
};

export const getImage = (imgsrc) => {
  return (dispatch, getState, { getFirebase }) => {
    const storage = getFirebase().storage();
    const storageRef = storage.ref();
    console.log(imgsrc)
    storageRef.child(imgsrc).getDownloadURL().then((url) => {
      dispatch({type: 'GET_EVENT_IMAGE_SUCCESS',
        image: {
          url,
          imgsrc
        }})
    }).catch(error => {
      dispatch({type: 'GET_EVENT_IMAGE_ERROR', error})
    })
  }
};

export const updateEvent = (updatedEvent) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection('events').doc(updatedEvent.id).update(updatedEvent)
    .then(() => {
      dispatch({type: 'UPDATE_EVENT', updatedEvent})
    }).catch(error => {
      dispatch({type: 'UPDATE_EVENT_ERROR', error})
    });
  }
};

export const deleteEvent = (deletedEventID) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection('events').doc(deletedEventID).delete()
    .then(() => {
      dispatch({type: 'DELETE_EVENT', deletedEventID})
    }).catch(error => {
      dispatch({type: 'DELETE_EVENT_ERROR', error})
    });
  }
};