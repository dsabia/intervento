var express = require('express');
var router = express.Router();


/* GET homepage */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'App di Rocco' });
});

module.exports = router;
