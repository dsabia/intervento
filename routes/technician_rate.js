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
      res.render('app/technician_rate/detail', { title: 'Dettaglio della tariffa', rate: pojo });
    }else{
      res.render('app/technician_rate/detail', { title: 'Tariffa non presente'});
    }
  });
});

/* open page add new tariffa */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/technician_rate/edit', { title: 'Aggiungi tariffa', frazioni_dora_option: frazioni_dora_option });
});

/* open page add new tariffa */
router.get('/edit', appUtil.ensureAuthenticated, function(req, res, next) {
  TechnicianRate.findOne({ 'owner' : req.user._id }, function(err, pojo){
    res.render('app/technician_rate/edit', { title: 'Modifica tariffa',
                                     rate: pojo,
                                     frazioni_dora_option: appUtil.setSelectedOption(frazioni_dora_option, pojo.frazioni_ora) });
  });
});

// add form data on the db
router.post('/edit', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    TechnicianRate.findById(req.body.id, function(err, rate){
      populateRequestAndSave(req, rate);
      res.redirect('/technician_rate/');
    });
  }else{
    var rate = new TechnicianRate();
    populateRequestAndSave(req, rate);
    res.redirect('/technician_rate/');
  }
});

function populateRequestAndSave(req, rate){
  rate.consultancy_fee    = req.body.consultancy_fee;
  rate.fixed_rate         = req.body.fixed_rate;
  rate.km_rate            = req.body.km_rate;
  rate.hour_rate          = req.body.hour_rate;
  rate.fraction_of_hour   = req.body.fraction_of_hour;
  rate.owner              = req.user._id;

  rate.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
