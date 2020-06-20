import authReducer from './authReducer';
import eventReducer from './eventReducer';
import notificationReducer from './notificationReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  notification: notificationReducer,
  profile: profileReducer, //only included for structure, it should not be used to access the profile --> firebase has access to the profile
  user: userReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;