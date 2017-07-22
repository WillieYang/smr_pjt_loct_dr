var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// User Authentication
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
require('./app_api/models/db');

// tell application to include the routes in app_server.
var routes = require('./app_server/routes/index');

// tell application to include the routes in app_server.
var routesApi = require('./app_api/routes/index');

var app = express();

app.locals.env = process.env;

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the routes(index) in app_server
app.use('/', routes);

// set the routes(index) in app_api
app.use('/api', routesApi);

// Configuring Passport
app.use(expressSession({
	secret: 'mySecretKey',
	resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// using flash middleware provided by connect-flash to store message in session.
app.use(flash());

// initialize passport
var initPassport = require('./app_api/models/passport/init');
initPassport(passport);

// set the routes(users) in app_server
var users = require('./app_server/routes/users')(passport);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
