import { fb, firebaseAuth } from './auth';
import { getQuestionnaires } from './database';

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
  if (!firebaseCurrentUser) {
    return remoteUserInfo;
  }
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

export function getUserQuestionnaires() {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return null;
  }
  return ref
    .child(`users/${firebaseCurrentUser.uid}/questionnaires`)
    .once('value')
    .then(snapshot => snapshot.val() || []);
}

export function getUserQuestionnaire(questionnaireId) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return null;
  }
  return ref
    .child(`users/${firebaseCurrentUser.uid}/questionnaires/${questionnaireId}`)
    .once('value')
    .then(snapshot => snapshot.val() || {});
}

export function saveUserQuestionnaire(questionnaire) {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return null;
  }
  return ref
    .child(`users/${firebaseCurrentUser.uid}/questionnaires/${questionnaire._id}`)
    .set(questionnaire)
    .then(() => questionnaire);
}

export function getNewQuestionnaires() {
  let localQuestionnairesId = [];
  return getQuestionnaires()
    .then(questionnaires => {
      localQuestionnairesId = questionnaires.map(qst => qst._id);
      return getUserQuestionnaires();
    })
    .then(onlineQuestionnaires => onlineQuestionnaires
      .filter(qst => (localQuestionnairesId.indexOf(qst._id) < 0))
    );
    // @todo save in localdb new questionnaires
}

export function saveNewQuestionnaires() {
  let onlineQuestionnairesId = [];
  return getUserQuestionnaires()
    .then(questionnaires => {
      onlineQuestionnairesId = questionnaires.map(qst => qst._id);
      return getQuestionnaires();
    })
    .then(localQuestionnaires => localQuestionnaires
      .filter(qst => (onlineQuestionnairesId.indexOf(qst._id) < 0))
    );
    // @todo upload new questionnaires
}
