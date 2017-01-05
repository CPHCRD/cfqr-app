import firebase from 'firebase';

// .env file fallback for environment variables
require('dotenv').config();

const fb = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const ref = fb.database().ref();

export const firebaseAuth = fb.auth;


export function register(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function updateLoginInfo(userInfo) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  return new Promise((resolve, reject) => {
    if (!firebaseCurrentUser) {
      resolve(Object.assign({}, userInfo, {
        token: '' // reset token
      }));
    }
    firebaseCurrentUser.getToken()
      .then(token => {
        resolve(Object.assign({}, userInfo, {
          uid: firebaseCurrentUser.uid,
          email: firebaseCurrentUser.email,
          token
        }));
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function saveUserInfo(userInfo) {
  const remoteUserInfo = Object.assign({}, userInfo);
  delete remoteUserInfo._id; // useless
  delete remoteUserInfo.token; // unsafe
  return new Promise((resolve, reject) => {
    ref
      .child(`users/${remoteUserInfo.uid}/info`)
      .set(remoteUserInfo)
      .then(() => {
        resolve(userInfo);
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });
}
