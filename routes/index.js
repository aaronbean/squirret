var _ = require('lodash');
var Promise = require('bluebird');
var cheeky = Promise.promisifyAll(require('dream-cheeky-driver'));

var cmds = {
    "u": "moveUp",
    "d": "moveDown",
    "l": "moveLeft",
    "r": "moveRight",
    "s": "stop",
    "f": "fire",
    "p": "park"
};

cheeky.exec = Promise.method(function (commands) {
    if (_.isString(commands)) return cheeky.exec(commands.split(','));
    if (commands.length === 0) return cheeky.stopAsync();

    var command = commands.slice(0, 1)[0];
    var rest = commands.slice(1);

    var func = command.length > 0 ? cheeky[cmds[command[0]] + 'Async'] : function () { return Promise.resolve(); };

    var next = _.partial(cheeky.exec, rest);

    if (func === cheeky.parkAsync || func === cheeky.stopAsync) {
        return func().then(next);
    }

    var number = (function () {
        try {
            return parseInt(command.slice(1), 10);
        }
        catch (ignore) {
            return null;
        }
    })();

    func(number).then(next);
});

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
            switch (req.params.command.toLowerCase()) {
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
        return cheeky.exec(req.params.commands)
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
