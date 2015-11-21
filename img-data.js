'use strict';

var gm = require('gm');

class Methods {
  /**
   *
   * @param path {String}
   * @returns {Promise}
   */
  static size (path) {
    let promise = new Promise(function (resolve, reject) {
      gm(path).size(function (err, val) {
        console.log(err);
        if (err) {
          reject(err);
        } else {
          resolve(val);
        }
      });
    });
    return promise
  }
}

/**
 * @example {
 * Methods.size('/path/to/image.jpg')
 *        .then(console.log)
 *        .catch(console.error);
 */

module.exports = Methods;
