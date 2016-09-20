var express = require('express');
var router = express.Router();


/* GET homepage */
router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'App di Rocco' });
});

/* GET tecnico */
router.get('/tecnico', function(req, res, next) {
  res.render('tecnico/view', { title: 'Get tecnico' });
});
/* GET add tecnico: open page add */
router.route('/tecnico/add')
  .get(function(req, res, next) {
    res.render('tecnico/add', { title: 'Get tecnico add' });
  })
  .post(function(req, res, next) {
    console.log('database ' + req.db);
    console.log('tecnico ' + req.body.tecnico);
    res.render('tecnico/view', { title: 'Post tecnico add' });
  });


module.exports = router;
