import Datastore from '@seald-io/nedb';
import { v4 as uuidV4 } from 'uuid';

export const INFO_OBJECT_ID = 'info';
export const BASE_FILTER = {
  $and: [{
    $not: {
      _id: INFO_OBJECT_ID
    }
  }, {
    $not: {
      isDeleted: true
    }
  }]
};

export let Database = {};

export function initDatastore(options) {
  Database = new Datastore(options);
}

export function loadDatastore() {
  return new Promise((resolve, reject) => {
    Database.loadDatabase(err => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

export function getUser() {
  return findOneIntoDatabase({ _id: INFO_OBJECT_ID })
    .then(user => {
      if (!user) {
        return updateUser();
      }
      return user;
    });
}

export function updateUser(info = {}) {
  const userInfo = Object.assign({
    _id: INFO_OBJECT_ID,
    uuid: uuidV4(),
    passphrase: '',
    analytics: true
  }, info, {
    os: {
      // same values the old webpack `os` polyfill returned in the browser
      platform: 'browser',
      release: navigator.appVersion || '',
      arch: 'javascript'
    },
    userAgent: navigator.userAgent,
    language: navigator.language,
    lastVisit: new Date()
  });

  return insertIntoDatabase(userInfo).then(() => userInfo);
}

export function getQuestionnaires() {
  return findIntoDatabase(BASE_FILTER);
}

export function insertIntoDatabase(doc) {
  return new Promise((resolve, reject) => {
    if (doc._id) {
      // doc.updatedAt = new Date();
      Database.update({
        _id: doc._id
      }, doc, {
        upsert: true
      }, (updateErr, numAffected, newDoc) => {
        if (updateErr) {
          reject(updateErr);
        }
        resolve(newDoc);
      });
    } else {
      // doc.createdAt = new Date();
      Database.insert(doc, (insertErr, newDoc) => {
        if (insertErr) {
          reject(insertErr);
        }
        resolve(newDoc);
      });
    }
  });
}

export function findIntoDatabase(options, params = {}) {
  return new Promise((resolve, reject) => {
    let findPromise = Database.find(options);
    if (params.sort) {
      findPromise = findPromise.sort(params.sort);
    }
    findPromise.exec((err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

export function findOneIntoDatabase(options) {
  return new Promise((resolve, reject) => {
    Database.findOne(options, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
