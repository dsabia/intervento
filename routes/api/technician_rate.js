var express = require('express');
var router = express.Router();
var TechnicianRate = require('../models/technician_rate');
var appUtil = require('../services/app_util');

var frazioni_dora_option = [1,  5, 15, 30, 60];


module.exports = function(){

  /* GET for view */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    TechnicianRate.find({ 'owner' : req.user._id }, function(err, list_results) {
      if (err){
        console.log(err);
        return;
      }
      if(list_results.length > 0){
        var pojo = list_results[0];
        res.json({ title:  res.__('title-det-technician-rate'), pojo: pojo });
      }else{
        res.json({ title:  res.__('title-np-technician-rate')});
      }
    });
  });

  /* GET for form */
  router.get('/formData', appUtil.ensureAuthenticated, function(req, res, next) {
    TechnicianRate.findOne({ 'owner' : req.user._id }, function(err, pojo){
      if(!pojo){
        res.json({ title: res.__('title-add-technician-rate'),
                   frazioni_dora_option: frazioni_dora_option });
      }else{
        res.json({ title: res.__('title-mod-technician-rate'),
                   pojo: pojo,
                   frazioni_dora_option: frazioni_dora_option });
      }
    });
  });


  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var rate = new TechnicianRate();
    populateRequestAndSave(req, res, rate);
    //res.end();
  });

  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    TechnicianRate.findById(req.params.id, function(err, rate){
      populateRequestAndSave(req, res, rate);
      //res.end();
    });
  });

  function populateRequestAndSave(req, res, rate){
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
        res.end();
        return;
    });
  }

  return router;
}
