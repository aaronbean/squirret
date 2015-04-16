var _ = require('lodash');
var errors = require('../errors');
var fmt = require('util').format;

var e = module.exports;

/**
 * `Express` middleware to verify that the requester's IP is in
 * our whitelist of trusted IPs.
 *
 * __Usage:__
 * Add something like the following to a config-compliant json file:
 *
 *     "trust": {
 *         "enabled": true,
 *         "whitelist": {
 *             "required": true,
 *             "ips": [
 *                 "127.0.0.1"
 *             ]
 *         }
 *     }
 */

e.checkTrust = function (options) {
    return function (err, req, res, next) {
        if (!!options.enabled) {
            if (!!options.whitelist.required) {
                if (!checkWhitelist(req.ip, options.whitelist.ips)) {
//                    res.header(400);
                    err = new errors.Permission(fmt('Requesting IP address "%s" is not whitelisted', req.ip));
                }
            }
        }
        return next(err);
    }
};

function checkWhitelist(ipAddress, whiteIps) {
    return _.find(whiteIps, function (ip) {
        return ip === ipAddress
    });
}
