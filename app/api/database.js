// @flow
import Datastore from 'nedb';
import { v4 as uuidV4 } from 'uuid';
import { platform, release, arch } from 'os';

export const INFO_OBJECT_ID = 'info';

export let Database = {}; // eslint-disable-line import/no-mutable-exports

export function initDatastore(options: Object) {
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

export function initUserIntoDatabase() {
  const infoObject = {
    _id: INFO_OBJECT_ID,
    uuid: uuidV4(),
    password: '',
    analytics: true,
    usage: true,
    os: {
      platform: platform(),
      release: release(),
      arch: arch()
    },
    userAgent: navigator.userAgent,
    language: navigator.language
  };
  return insertIntoDatabase(infoObject);
}

export function insertIntoDatabase(doc: Object) {
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

export function findIntoDatabase(options: Object, params: Object = {}) {
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

export function findOneIntoDatabase(options: Object) {
  return new Promise((resolve, reject) => {
    Database.findOne(options, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}
