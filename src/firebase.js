import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//the apiKey is only to identify the project, it does not need to be hidden
export const firebaseConfig = {
  apiKey: "AIzaSyB4QKxS21T2sfo2nDGtdrrWkuVCZUJqoCs",
  authDomain: "sbleos.firebaseapp.com",
  databaseURL: "https://sbleos.firebaseio.com",
  projectId: "sbleos",
  storageBucket: "sbleos.appspot.com",
  messagingSenderId: "427651251851",
  appId: "1:427651251851:web:4d4c2c0e8f566b4f6a9e8e",
  measurementId: "G-QDS4894X9T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.firestore();
export default firebase;