import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
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

export const db = firebase.firestore();