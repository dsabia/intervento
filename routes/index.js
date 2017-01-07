var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

module.exports = function(_i18n){
  var i18n = _i18n;

  // open root application
  router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
      res.redirect('/homepage');
    }else{
      res.render('index');
    }
  });

  // open signup page
  router.get('/signup', function(req, res, next) {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // open login page
  router.get('/login', function(req, res) {
      res.render('login', { message: req.flash('loginMessage') });
  });

  // process the login form
  router.post('/login', passport.authenticate('local-login', {
     successRedirect : '/homepage', // redirect to the secure profile section
     failureRedirect : '/login', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
  }));

  // open profile page
  router.get('/profile', isLoggedIn, function(req, res) {
    // get the user out of session and pass to template
    User.findOne({ '_id' :  req.user._id }, function(err, user) {
      res.render('profile', { 'user' : user});
    });
  });

  // logout and redirect to /
  router.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
  });

  /* open homepage */
  router.get('/homepage', isLoggedIn, function(req, res, next) {
    res.render('app/homepage', { title: 'App di Rocco' });
  });

  /* open technician home */
  router.get('/technician_home', isLoggedIn, function(req, res, next) {
    res.render('app/technician_home', { title: 'Dati di Rocco' });
  });

  /* open customer home */
  router.get('/customer_home', isLoggedIn, function(req, res, next) {
    res.render('app/customer_home', { title: 'Dati dei clienti di Rocco' });
  });

  /* open intervention home */
  router.get('/intervention_home', isLoggedIn, function(req, res, next) {
    res.render('app/intervention_home', { title: 'Dati degli interventi di Rocco' });
  });

  /* open work folder home */
  router.get('/work_folder_home', isLoggedIn, function(req, res, next) {
    res.render('app/work_folder_home', { title: 'Dati delle cartelle lavoro di Rocco' });
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();
      // if they aren't redirect them to the home page
      res.redirect('/');
  }

  return router;
}
