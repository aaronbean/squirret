var Promise = require('bluebird');
var cheeky = Promise.promisifyAll(require('dream-cheeky-driver'));

/**
 * Central request routing
 */

module.exports = function (app) {

  app.get('/', function (req, res, next) {
    res.send(200);
  });

  app.get('/turret/:command', function (req, res, next) {
    var duration = req.query.duration || 250;
    var shots = req.query.shots || 1;
    var promise;
    switch (req.param.command) {
      case 'down':
        promise = cheeky.moveDownAsync(duration);
        break;
      case 'left':
        promise = cheeky.moveLeftAsync(duration);
        break;
      case 'right':
        promise = cheeky.moveRightAsync(duration);
        break;
      case 'up':
        promise = cheeky.moveUpAsync(duration);
        break;
      case 'stop':
        promise = cheeky.stopAsync();
        break;
      case 'fire':
        promise = cheeky.fireAsync(shots);
        break;
      case 'park':
        promise = cheeky.parkAsync(duration);
    }
    return promise
        .then(function () {
          return res.send(200);
        })
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
