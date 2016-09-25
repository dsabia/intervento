var express = require('express');
var router = express.Router();

/* GET tecnico */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('app/tecnico/view', { title: 'Get tecnico' });
});
/* GET add tecnico: open page add */
router.get('/add', ensureAuthenticated, function(req, res, next) {
    res.render('app/tecnico/add', { title: 'Aggiungi uno nuovo' });
});

router.post('/add', ensureAuthenticated, function(req, res, next) {
    console.log('database ' + req.db);
    console.log('body ' + req.body);
    console.log('tecnico ' + req.body.nome);
    res.redirect('/tecnico/'+req.body.nome);
});

router.get('/:nome', ensureAuthenticated, function(req, res, next) {
    res.render('app/tecnico/view', { title: req.params.nome });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
