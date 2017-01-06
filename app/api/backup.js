import { fb, firebaseAuth } from './auth';

const ref = fb.database().ref();

export function updateLoginInfo(userInfo) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return Object.assign({}, userInfo);
  }
  return Object.assign({}, userInfo, {
    email: firebaseCurrentUser.email
  });
}

export function saveRemoteUserInfo(userInfo) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  const remoteUserInfo = Object.assign({}, userInfo);
  delete remoteUserInfo._id; // useless
  return ref
    .child(`users/${firebaseCurrentUser.uid}/info`)
    .set(remoteUserInfo)
    .then(() => userInfo);
}

export function getRemoteUserInfo(user: Object = {}) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return user;
  }
  return ref
    .child(`users/${firebaseCurrentUser.uid}/info`)
    .once('value')
    .then(snapshot => {
      const remoteInfo = snapshot.val();
      return Object.assign({}, user, remoteInfo);
    });
}
