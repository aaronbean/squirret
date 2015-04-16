var util = require('util');

var e = module.exports;

/**
 * Collection of _Licensing API_-specific error classes.
 *
 * __Usage:__
 *
 *      var errors = require('./path/to/errors');
 *      if (somethingBad()) {
 *        throw new errors.Argument('Bad you!!!');
 *      }
 *
 * Please refer to the _Exports_ section for the publicly
 * available constructor names.
 */

/** */

/**
 * Abstract base error class for exceptions produced by the _Licensing API_.
 *
 * @class Abstract base error class.
 * @param {String} code
 * @param {String} msg
 * @param {Object} constr
 */
var AbstractError = function (code, msg, constr) {
    if (arguments.length == 2) {
        msg = code;
        constr = msg;
    }
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error';
    this.code = code || 'ER_UNKNOWN';
};
util.inherits(AbstractError, Error);
var abstractProto = AbstractError.prototype;
abstractProto.name = 'Abstract Error';
//abstractProto.code = 'ER_UNKNOWN';
abstractProto.display = false;
abstractProto.log = true;

/**
 * Error class indicating failure due to an invalid argument.
 *
 * @class Represents error due to bad argument.
 * @parent AbstractError
 * @param {String} msg
 */
var ArgumentError = e.Argument = function (code, msg) {
    ArgumentError.super_.call(this, code, msg, this.constructor)
};
util.inherits(ArgumentError, AbstractError);
ArgumentError.prototype.name = 'Argument Error';
ArgumentError.prototype.code = 'ER_INVALID_ARGUMENT';
ArgumentError.prototype.display = true;

/**
 * Error class indicating failure due to missing resource.
 *
 * @class Represents error due to missing resource.
 * @parent AbstractError
 * @param {String} msg
 */
var NotFoundError = e.NotFound = function (code, msg) {
    NotFoundError.super_.call(this, code, msg, this.constructor)
};
util.inherits(NotFoundError, AbstractError);
NotFoundError.prototype.name = 'Not Found Error';
NotFoundError.prototype.display = true;

/**
 * Error class indicating failure due to insufficient permissions.
 *
 * @class Represents error due to permissions.
 * @parent AbstractError
 * @param {String} msg
 */
var PermissionError = e.Permission = function (code, msg) {
    PermissionError.super_.call(this, code, msg, this.constructor)
};
util.inherits(PermissionError, AbstractError);
PermissionError.prototype.name = 'Permission Error';
PermissionError.prototype.display = true;
