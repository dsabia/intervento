var express = require('express');
var router = express.Router();
var TechnicianRate = require('../models/technician_rate');

/* GET dettaglio unica tariffa */
router.get('/', ensureAuthenticated, function(req, res, next) {
  TechnicianRate.find({}, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
      var pojo = list_results[0];
      res.render('app/tariffe/detail', { title: 'Dettaglio della tariffa', tariffa: pojo });
    }else{
      res.render('app/tariffe/detail', { title: 'Tariffa non presente'});
    }
  });
});

/* open page add new tariffa */
router.get('/add', ensureAuthenticated, function(req, res, next) {
    res.render('app/tariffe/edit', { title: 'Aggiungi tariffa' });
});

// add form data on the db
router.post('/edit', ensureAuthenticated, function(req, res, next) {
    var rate = new TechnicianRate();
    rate.diritto_chiamata   = req.body.diritto_chiamata;
    rate.tariffa_fissa      = req.body.tariffa_fissa;
    rate.tariffa_km         = req.body.tariffa_km;
    rate.tariffa_oraria     = req.body.tariffa_oraria;
    rate.frazioni_ora       = req.body.frazioni_ora;

    rate.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        return;
    });

    res.redirect('/tariffe/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
