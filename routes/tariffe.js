var express = require('express');
var router = express.Router();
var TechnicianRate = require('../models/technician_rate');
var appUtil = require('../services/app_util');

var frazioni_dora_option = [1,  5, 15, 30, 60];

/* GET dettaglio unica tariffa */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  TechnicianRate.find({ 'owner' : req.user._id }, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
      var pojo = list_results[0];
      res.render('app/tariffe/detail', { title: 'Dettaglio della tariffa', rate: pojo });
    }else{
      res.render('app/tariffe/detail', { title: 'Tariffa non presente'});
    }
  });
});

/* open page add new tariffa */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/tariffe/edit', { title: 'Aggiungi tariffa', frazioni_dora_option: frazioni_dora_option });
});

/* open page add new tariffa */
router.get('/edit', appUtil.ensureAuthenticated, function(req, res, next) {
  TechnicianRate.findOne({ 'owner' : req.user._id }, function(err, pojo){
    res.render('app/tariffe/edit', { title: 'Modifica tariffa',
                                     rate: pojo,
                                     frazioni_dora_option: appUtil.setSelectedOption(frazioni_dora_option, pojo.frazioni_ora) });
  });
});

// add form data on the db
router.post('/edit', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    TechnicianRate.findById(req.body.id, function(err, rate){
      populateRequestAndSave(req, rate);
      res.redirect('/tariffe/');
    });
  }else{
    var rate = new TechnicianRate();
    populateRequestAndSave(req, rate);
    res.redirect('/tariffe/');
  }
});

function populateRequestAndSave(req, rate){
  rate.diritto_chiamata   = req.body.diritto_chiamata;
  rate.tariffa_fissa      = req.body.tariffa_fissa;
  rate.tariffa_km         = req.body.tariffa_km;
  rate.tariffa_oraria     = req.body.tariffa_oraria;
  rate.frazioni_ora       = req.body.frazioni_ora;
  rate.owner              = req.user._id;

  rate.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
