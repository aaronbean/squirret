var Promise = require('bluebird');
var cheeky = Promise.promisifyAll(require('dream-cheeky-driver'));

/**
 * Central request routing
 */

module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.send(200);
  });

  app.get('/down', function (req, res, next) {
    return cheeky.moveDownAsync(200)
        .then(function () {
          return res.send(200);
        })
  });

  app.get('/up', function (req, res, next) {
    return cheeky.moveUpAsync(200)
        .then(function () {
          return res.send(200);
        })
  });

};
