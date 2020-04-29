import { createNotification } from './notificationActions';

export const updateProfile = (updatedProfile) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.updateProfile(updatedProfile)
    .then(() => {
      dispatch({type: 'UPDATE_PROFILE'})
      dispatch(createNotification({
        title: "Updated profile",
        type: "success",
        delay: 5000
      }))
    })
    .catch(error => {
      dispatch(createNotification({error}))
    })

  }
};