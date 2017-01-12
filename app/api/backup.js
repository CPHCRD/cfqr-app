import { fb, firebaseAuth } from './auth';
import { getQuestionnaires, insertIntoDatabase } from './database';

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
    .then(snapshot => snapshot.val() || {})
    .then(questionnaire => Object.keys(questionnaire).map(key => questionnaire[key]));
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

export function getDiffQuestionnaire(oldQst, newQst) {
  if (oldQst.patient !== newQst.patient) {
    return true;
  }
  if (oldQst.isDeleted !== newQst.isDeleted) {
    return true;
  }
  return false;
}

export function getNewQuestionnaires() {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return null;
  }
  let localQuestionnairesId = [];
  let localQuestionnaires = [];
  let onlineQuestionnaires = [];
  return getQuestionnaires()
    .then(questionnaires => {
      localQuestionnaires = questionnaires;
      localQuestionnairesId = localQuestionnaires.map(qst => qst._id);
      return getUserQuestionnaires();
    })
    .then(questionnaires => {
      onlineQuestionnaires = questionnaires;
      return onlineQuestionnaires
        .filter(qst => (localQuestionnairesId.indexOf(qst._id) < 0));
    })
    .then(missingQuestionnaires => Promise.all(
      missingQuestionnaires.map(missing => insertIntoDatabase(missing))
    ))
    .then(() => {
      const diffQuestionnaires = [];
      onlineQuestionnaires.forEach(remoteQst => {
        localQuestionnaires.forEach(localQst => {
          if (localQst._id !== remoteQst._id) {
            return false;
          }
          const diffCheck = getDiffQuestionnaire(localQst, remoteQst);
          if (!diffCheck) {
            return false;
          }
          diffQuestionnaires.push(remoteQst);
        });
      });
      console.log('online diff', diffQuestionnaires);
      return diffQuestionnaires;
    })
    .then(missingQuestionnaires => Promise.all(
      missingQuestionnaires.map(missing => insertIntoDatabase(missing))
    ));
}

export function saveNewQuestionnaires() {
  const firebaseCurrentUser = firebaseAuth().currentUser;
  if (!firebaseCurrentUser) {
    return null;
  }
  let onlineQuestionnairesId = [];
  let onlineQuestionnaires = [];
  let localQuestionnaires = [];
  return getUserQuestionnaires()
    .then(questionnaires => {
      onlineQuestionnaires = questionnaires;
      onlineQuestionnairesId = onlineQuestionnaires.map(qst => qst._id);
      return getQuestionnaires();
    })
    .then(questionnaires => {
      localQuestionnaires = questionnaires;
      return localQuestionnaires
        .filter(qst => (onlineQuestionnairesId.indexOf(qst._id) < 0));
    })
    .then(missingQuestionnaires => Promise.all(
      missingQuestionnaires.map(missing => saveUserQuestionnaire(missing))
    ))
    .then(() => {
      const diffQuestionnaires = [];
      localQuestionnaires.forEach(localQst => {
        onlineQuestionnaires.forEach(remoteQst => {
          if (localQst._id !== remoteQst._id) {
            return false;
          }
          const diffCheck = getDiffQuestionnaire(localQst, remoteQst);
          if (!diffCheck) {
            return false;
          }
          diffQuestionnaires.push(localQst);
        });
      });
      console.log('local diff', diffQuestionnaires);
      return diffQuestionnaires;
    })
    .then(missingQuestionnaires => Promise.all(
      missingQuestionnaires.map(missing => saveUserQuestionnaire(missing))
    ));
}
