import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getApi } from '../helpers/firebaseApi';

const API_KEY = await getApi();

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "react-journal-app-f53d5.firebaseapp.com",
  projectId: "react-journal-app-f53d5",
  storageBucket: "react-journal-app-f53d5.appspot.com",
  messagingSenderId: "375600979655",
  appId: "1:375600979655:web:aae34559a702185aee68e2"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}