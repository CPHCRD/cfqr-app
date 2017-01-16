import firebase from 'firebase';

export const fb = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

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

export function verify() {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return false;
  }
  return firebaseCurrentUser.sendEmailVerification();
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}
