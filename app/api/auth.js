import firebase from 'firebase';

// .env file fallback for environment variables
require('dotenv').config();

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const ref = firebase.database().ref();

const firebaseAuth = firebase.auth;

export function register(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function saveUserInfo(userInfo) {
  const remoteUserInfo = Object.assign({}, userInfo);
  delete remoteUserInfo._id; // useless
  return ref
    .child(`users/${remoteUserInfo.uid}/info`)
    .set(remoteUserInfo);
}
