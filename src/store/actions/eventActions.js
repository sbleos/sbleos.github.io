import { createNotification } from './notificationActions';
import { getFiscalYear, generateID } from '../../utils/utils'

export const createEvent = (event) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();

    const uuid = generateID(20);

    if(event.hasOwnProperty(("date"))){
      event.date = new Date(event.date).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
    }

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
        console.log(error)
      });
    }

  }
};

export const getImage = (imgsrc) => {
  return (dispatch, getState, { getFirebase }) => {
    const storage = getFirebase().storage();
    const storageRef = storage.ref();

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

export const updateEvent = (updatedEvent, originalDate) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    var attendees = Object.keys(updatedEvent)
                          .filter(event => event.indexOf("user-") === 0 && !isNaN(updatedEvent[event]) && parseFloat(updatedEvent[event]) > 0)
                          .reduce((obj, event) =>{
                            let key = event.replace("user-","");
                            obj[key] = parseFloat(updatedEvent[event]);

                            if(isNaN(obj[key]) || obj[key] === 0)
                              delete obj[key];

                            delete updatedEvent[event]
                            return obj;
                            }, {})

    updatedEvent = {
      ...Object.keys(updatedEvent)
               .filter(event => event.indexOf("user-") !== 0)
               .reduce((obj, key) => {
                  obj[key] = updatedEvent[key]
                  return obj;
               }, {}),
      attendees
    }

    const docRef = firestore.collection('events').doc(getFiscalYear(originalDate));

    firestore.runTransaction(transaction => (
      transaction.get(docRef).then(doc => {
        var events = doc.data().events;

        let idx = events.findIndex(event => {return event.id === updatedEvent.id});

        if(idx > -1){
          if(getFiscalYear(originalDate) === getFiscalYear(updatedEvent.date)){
            events[idx] = updatedEvent;
            return events;
          }
          else{
            dispatch(createEvent(updatedEvent));
            dispatch(deleteEvent(updatedEvent,originalDate));
            return null;
          }
        }
      }).then(events => {
        if(events)
          transaction.update(docRef,{ events })
      })
    )).then(() => {
      dispatch({type: 'UPDATE_EVENT', updatedEvent})
    }).catch(error => {
      dispatch({type: 'UPDATE_EVENT_ERROR', error})
    })

  }
};

export const deleteEvent = (deletedEvent, originalDate) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    const docRef = !originalDate ? firestore.collection('events').doc(getFiscalYear(deletedEvent.date)) : firestore.collection('events').doc(getFiscalYear(originalDate));

    firestore.runTransaction(transaction => (
      transaction.get(docRef).then(doc => {
        const events = doc.data().events;
        let idx = events.findIndex(event => {return event.id === deletedEvent.id}); //call this again the order of 'events' may not be the same
        if(idx > -1)
          events.splice(idx,1)

        return events;
      }).then(events => {
        events.length !== 0 ? transaction.update(docRef,{events}) : transaction.delete(docRef) // update event if there are other events in the year, or else delete the year (because it holds no data)
      }).then(() => {
        if(!originalDate && deletedEvent.hasOwnProperty("imgPath")){ // delete image if there was a stored image
          const storage = firebase.storage();
          const storageRef = storage.ref();
          storageRef.child(deletedEvent.imgPath).delete()
        }
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
        else{ // Users in fiscalYear
          var yearArr = [user["start"]],
          start = parseInt(user["start"].split("-")[0]),
          end = user["end"] !== "" ? parseInt(user["end"].split("-")[1]) : parseInt(getFiscalYear(new Date()).split("-")[1]);

          for(start; start !== end; start++)
            yearArr.push(`${start}-${start+1}`)

          if(yearArr.includes(fiscalYear))
            dispatch({type: 'GET_USER_IN_FISCAL_YEAR', user})

        }

      })
    }).catch(error => {
      dispatch({type: 'GET_USER_IN_FISCAL_YEAR_ERROR', error})
    });


  }
};