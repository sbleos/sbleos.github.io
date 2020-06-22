import { createNotification } from './notificationActions';
import { getFiscalYear, generateID } from '../../utils/utils'

export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();

    const uuid = generateID(20);

    if(event.image){
      const imgPath = `images/events/${uuid}-${event.image.name}`;
      storageRef.child(imgPath).put(event.image)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          dispatch({type: 'UPLOAD_EVENT_IMAGE_SUCCESS'})

          delete event.image;
          firestore.collection('events').doc(getFiscalYear(event.date)).set(
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
      firestore.collection('events').doc(getFiscalYear(event.date)).set(
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

    const docRef = firestore.collection('events').doc(getFiscalYear(updatedEvent.date));

    firestore.runTransaction(transaction => (
      transaction.get(docRef).then(doc => {
        const events = doc.data().events;
        let updatedEvents = events;
        let idx = events.findIndex(event => {return event.id === updatedEvent.id});
        updatedEvents[idx] = updatedEvent;

        return updatedEvents;
      }).then(updatedEvents => {
        transaction.update(docRef,{ events: updatedEvents })
      })
    )).then(() => {
      dispatch({type: 'UPDATE_EVENT', updatedEvent})
    }).catch(error => {
      dispatch({type: 'UPDATE_EVENT_ERROR', error})
    })

  }
};

export const deleteEvent = (deletedEvent) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    const docRef = firestore.collection('events').doc(getFiscalYear(deletedEvent.date));

    firestore.runTransaction(transaction => (
      transaction.get(docRef).then(doc => {
        const events = doc.data().events;
        let idx = events.findIndex(event => {return event.id === deletedEvent.id}); //call this again the order of 'events' may not be the same
        if(idx > -1)
          events.splice(idx,1)

        return events;
      }).then(events => {
        transaction.update(docRef,{events})
      })
    )).then(() => {
      dispatch({type: 'DELETE_EVENT', deletedEvent})
    }).catch(error => {
      dispatch({type: 'DELETE_EVENT_ERROR', error})
    });

  }
};

export const getUsers = (fiscalYear) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    dispatch({type: 'RESET_USER_IN_FISCAL_YEAR'})

    firestore.collection("users").get().then(querySnapshot => {
      querySnapshot.forEach(userDoc => {
        var user = userDoc.data()

        if(!fiscalYear){ //All Users
          dispatch({type: 'GET_USER_IN_FISCAL_YEAR', user})
        }
        else{ // Users in Fiscal Year
          var yearArr = [user["start"]],
          start = parseInt(user["start"].split("-")[0]),
          end = user["end"] !== "" ? parseInt(user["end"].split("-")[1]) : parseInt(getFiscalYear(new Date()).split("-")[1]);

          for(start; start !== end; start++)
            yearArr.push(`${start}-${start+1}`)

          if(yearArr.includes(fiscalYear))
            dispatch({type: 'GET_USER_IN_FISCAL_YEAR', user})
        }

      })
    })


  }
};