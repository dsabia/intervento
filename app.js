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
var methodOverride = require('method-override');
var i18n = require("i18n");
var cookieParser = require('cookie-parser');

//Mongo DB code
var config = require('config');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connect(config.database_url);
db.safe = {w: 1};

i18n.configure({
    locales:['it', 'en'],
    defaultLocale: 'it',
    cookie: 'locales',
    directory: __dirname + '/locales',
    autoReload: false,
    updateFiles: false,
    register: global
});

app.use(cookieParser());
app.use(i18n.init);

i18n.setLocale('it');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
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

// routes
var router = require('./routes/index')();
var pages = require('./routes/pages')();
var technician = require('./routes/technician')();
var customer = require('./routes/customer')();
var material = require('./routes/material')();
var technician_rate = require('./routes/technician_rate')();
var intervention = require('./routes/intervention')();
var work_folder = require('./routes/work_folder')();
var typeahead = require('./routes/typeahead')();
require('./services/passport')(passport);

app.use('/', router);
app.use('/page', pages);
app.use('/api/material', material);
app.use('/api/technician_rate', technician_rate);
app.use('/technician', technician);
app.use('/customer', customer);
app.use('/intervention', intervention);
app.use('/work_folder', work_folder);
app.use('/typeahead', typeahead);
app.use('/image', require('./routes/image')(mongo, db));

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

console.log("Initialization completed!");
module.exports = app;
