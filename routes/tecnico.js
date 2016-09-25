var express = require('express');
var router = express.Router();

/* GET tecnico */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('tecnico/view', { title: 'Get tecnico' });
});
/* GET add tecnico: open page add */
router.get('/add', isLoggedIn, function(req, res, next) {
    res.render('tecnico/add', { title: 'Aggiungi uno nuovo' });
});

router.post('/add', isLoggedIn, function(req, res, next) {
    console.log('database ' + req.db);
    console.log('body ' + req.body);
    console.log('tecnico ' + req.body.nome);
    res.redirect('/tecnico/'+req.body.nome);
});

router.get('/:nome', isLoggedIn, function(req, res, next) {
    res.render('tecnico/view', { title: req.params.nome });
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
