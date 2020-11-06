import firebase from 'firebase';
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAJkm-Ys9dc5im1WXgd5iVVt6z6xMlb9Ik",
  authDomain: "digitests-e9230.firebaseapp.com",
  databaseURL: "https://digitests-e9230.firebaseio.com",
  projectId: "digitests-e9230",
  storageBucket: "digitests-e9230.appspot.com",
  messagingSenderId: "1002705129248",
  appId: "1:1002705129248:web:b71cf0834d64414158d145"
};


if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();