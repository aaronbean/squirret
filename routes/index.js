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

        return Promise.try(function () {
            switch (req.param.command.toLowerCase()) {
                case 'down':
                    return cheeky.moveDownAsync(duration);
                case 'left':
                    return cheeky.moveLeftAsync(duration);
                case 'right':
                    return cheeky.moveRightAsync(duration);
                case 'up':
                    return cheeky.moveUpAsync(duration);
                case 'stop':
                    return cheeky.stopAsync();
                case 'fire':
                    return cheeky.fireAsync(shots);
                default:
                    return cheeky.parkAsync(duration);
            }
        })
        .then(function () {
            return res.send(200);
        });
    });

    app.get('/turret/exec/:commands', function (req, res) {
        return cheeky.executeAsync(req.param.commands)
            .then(function () {
                return res.send(200);
            });
    });

    app.get('/down', function (req, res, next) {
        return cheeky.moveDownAsync(200)
            .then(function () {
                return res.send(200);
            });
    });

    app.get('/up', function (req, res, next) {
        return cheeky.moveUpAsync(200)
            .then(function () {
                 return res.send(200);
            });
    });
};
