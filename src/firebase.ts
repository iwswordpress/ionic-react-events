import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyADdbZjUIJJUpt24TgZaxYnQU342CqiZHw',
  authDomain: 'daily-moments-ionic.firebaseapp.com',
  databaseURL: 'https://daily-moments-ionic.firebaseio.com',
  projectId: 'daily-moments-ionic',
  storageBucket: 'daily-moments-ionic.appspot.com',
  messagingSenderId: '887084105807',
  appId: '1:887084105807:web:5a948418970fffacf8aa3a'
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
