var express = require('express');
var flash = require('connect-flash');
var partials = require('express-partials');
var session = require('express-session');
var app = express();
var passport = require('passport');
var util = require('util');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

//Mongo DB code
var mongo = require('mongodb');
var configDB = require('./config/database.js');
//var monk = require('monk');
//var db = monk(configDB.url);
var mongoose = require('mongoose');
var db = mongoose.connect(configDB.url);

// routes
var routes = require('./routes/index');
var tecnico = require('./routes/tecnico');
var clienti = require('./routes/clienti');
var materiale = require('./routes/materiale');
//var sample = require('./routes/sample');

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);
app.use('/tecnico', tecnico);
app.use('/clienti', clienti);
app.use('/materiale', materiale);
// no longer
//app.use('/sample', sample);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

module.exports = app;
