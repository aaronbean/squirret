/**
 * Main app control
 */

var bodyParser = require('body-parser');
var config = require('config');
var cons = require('consolidate');
require('console-stamp')(console, 'yyyy-mm-dd HH:MM:ss.l');
var cookieParser = require('cookie-parser');
var dust = require('dustjs-linkedin');
var errorHandler = require('errorhandler');
var express = require('express');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = global.app = express();

app.engine('dust', cons.dust);
dust.config.whitespace = true; // stop whitespace suppression
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, '/views'));

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(require('./lib/middleware/trust').checkTrust(config.trust)); // custom authorization middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.session.secret,
    store: new RedisStore(config.redis)
}));
app.use(require('./lib/middleware/pretty').prettyPrint(2)); // pretty JSON output priting with pretty=1 URL parameter

// setup routes
require('./routes')(app);

app.use(errorHandler());
