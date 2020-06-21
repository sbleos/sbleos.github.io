import { createNotification } from './notificationActions';


export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();

    const uuid = [...Array(20)].map(_=>(Math.random()*36|0).toString(36)).join``;

    if(event.image){
      const imgPath = `images/events/${uuid}-${event.image.name}`;
      storageRef.child(imgPath).put(event.image)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          dispatch({type: 'UPLOAD_EVENT_IMAGE_SUCCESS'})

          delete event.image;
          firestore.collection('events').doc(getFiscalYear(event)).set(
            {
              events: firebase.firestore.FieldValue.arrayUnion({
                ...event,
                id: uuid,
                imgURL: url,
                imgPath
              })
            },
            { merge: true }
          )
          .then(() => {
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
      firestore.collection('events').doc(getFiscalYear(event)).set(
        {
          events: firebase.firestore.FieldValue.arrayUnion({...event,id: uuid})
        },
        { merge: true }
      ).then(() => {
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

const getFiscalYear = (event) => {
  const eventDate = new Date(event.date);
  const benchmark = new Date(`July 1, ${eventDate.getFullYear()}`); // start of new fiscal year in year of the event

  const numMonths = eventDate.getMonth() - benchmark.getMonth() + (12 * (eventDate.getFullYear() - benchmark.getFullYear()));

  const fiscalYear =  numMonths < 0
                      ? `${eventDate.getFullYear()-1}-${eventDate.getFullYear()}`   // event is before benchmark
                      : `${eventDate.getFullYear()}-${eventDate.getFullYear()+1}`   // event is after benchmark

  return fiscalYear;
}


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

    const docRef = firestore.collection('events').doc(getFiscalYear(updatedEvent));

    docRef.get()
    .then(doc => {
      const events = doc.data().events;
      let updatedEvents = events;
      let idx = events.findIndex(event => {return event.id === updatedEvent.id});
      updatedEvents[idx] = updatedEvent;

      return updatedEvents;
    })
    .then(updatedEvents => {
      docRef.update({
        events: updatedEvents
      })
    })
    .then(() => {
      dispatch({type: 'UPDATE_EVENT', updatedEvent})
    })
    .catch(error => {
      dispatch({type: 'UPDATE_EVENT_ERROR', error})
      console.log(error)
    });
  }
};

export const deleteEvent = (deletedEvent) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    const docRef = firestore.collection('events').doc(getFiscalYear(deletedEvent));

    docRef.get()
    .then(doc => {
      const events = doc.data().events;
      let idx = events.findIndex(event => {return event.id === deletedEvent.id}); //call this again the order of 'events' may not be the same
      if(idx > -1)
        events.splice(idx,1)

      return events;
    })
    .then(events => {
      docRef.update({events})
    })
    .then(() => {
      dispatch({type: 'DELETE_EVENT', deletedEvent})
    })
    .catch(error => {
      dispatch({type: 'DELETE_EVENT_ERROR', error})
    });
  }
};
