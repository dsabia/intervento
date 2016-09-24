var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/account', function(req, res, next) {
  res.render('account');
});

/* GET homepage */
router.get('/homepage', function(req, res, next) {
  res.render('homepage', { title: 'App di Rocco' });
});





module.exports = router;
