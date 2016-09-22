var express = require('express');
var router = express.Router();



/* GET tecnico */
router.get('/', function(req, res, next) {
  res.render('tecnico/view', { title: 'Get tecnico' });
});
/* GET add tecnico: open page add */
router.get('/add', function(req, res, next) {
    res.render('tecnico/add', { title: 'Aggiungi uno nuovo' });
});

router.post('/add', function(req, res, next) {
    console.log('database ' + req.db);
    console.log('body ' + req.body);
    console.log('tecnico ' + req.body.nome);
    res.redirect('/tecnico/'+req.body.nome);
});

router.get('/:nome', function(req, res, next) {
    res.render('tecnico/view', { title: req.params.nome });
});


module.exports = router;
