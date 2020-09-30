//Server.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/resources');
var usersRouter = require('./routes/users');

var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

//Express Session
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", saveUninitialized: false, resave: false}));

app.use(function (req, res, next) {
  var timestamp = Date.now();
  var sessionID = req.sessionID; // Only available if you've enabled the express-session package.
  //var requestID = uuid.v4();
  //req.id = requestID; // In case other parts of the code require this ID.
  //console.log('timestamp: ' + timestamp, 'sessionID: ' + sessionID);
  next();
});

app.get('/test', function(req, res){
  if(req.session.page_views){
    req.session.page_views++;
    res.json("You visited this page " + req.session.page_views + " times ");
  } else {
    req.session.page_views = 1;
    res.json("Welcome to this page for the first time! ");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
