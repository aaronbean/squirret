/**
 * Server startup and shutdown control
 */

require('./app');

var config = require('config');
var serverLib = require('./lib/server');

var port = +process.env.PORT || config.node.port || 3000;

var server = global.app.listen(port, function () {
    console.log('Express server listening on port %d', server.address().port);
});

server.on('listening', function () {
    if (process.send) {
        process.send('online');
    }
});

process.on('message', function (message) {
    if (message === 'shutdown') {
        serverLib.performCleanup();
        process.exit(0);
    }
});
