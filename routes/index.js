var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('homepage');
  }else{
    res.render('index');
  }
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));
router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
});
// process the login form
router.post('/login', passport.authenticate('local-login', {
   successRedirect : '/homepage', // redirect to the secure profile section
   failureRedirect : '/login', // redirect back to the signup page if there is an error
   failureFlash : true // allow flash messages
}));
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
       user : req.user // get the user out of session and pass to template
    });
});

router.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/');
});

router.get('/account', isLoggedIn, function(req, res, next) {
  res.render('account');
});
/* GET homepage */
router.get('/homepage', isLoggedIn, function(req, res, next) {
  res.render('homepage', { title: 'App di Rocco' });
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
