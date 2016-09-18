var express = require('express');
var router = express.Router();


/* GET homepage */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'App di Rocco' });
});

/* GET tecnico */
router.get('/tecnico', function(req, res, next) {
  res.render('tecnico/view', { title: 'Rocco' });
});
/* POST tecnico - add new one*/
router.get('/tecnico/add', function(req, res, next) {
  res.render('tecnico/add', { title: 'Rocco' });
});


module.exports = router;
