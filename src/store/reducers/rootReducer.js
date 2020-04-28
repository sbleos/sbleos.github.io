import authReducer from './authReducer';
import eventReducer from './eventReducer';
import notificationReducer from './notificationReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  notification: notificationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer;