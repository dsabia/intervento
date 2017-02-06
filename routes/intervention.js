var express = require('express');
var router = express.Router();
var Intervention = require('../models/intervention').model;
var appUtil = require('../services/app_util');

var intervention_type_option = [
  "o-tipo-intervento-sopralluogo" ,
  "o-tipo-intervento-installazione" ,
  "o-tipo-intervento-manutenzione" ,
  "o-tipo-intervento-assistenza" ,
  "o-tipo-intervento-fornitura-materiale" ,
  "o-tipo-intervento-preventivo"
];

module.exports = function(){

  /* PAGE VIEW */
  router.get('/page/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/intervention/view');
  });

  /* PAGE FORM */
  router.get('/page/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/intervention/form');
  });

  /* GET form datas */
  router.get('/formAdd', appUtil.ensureAuthenticated, function(req, res, next) {
    res.json({ title: res.__('title-add-intervention'),
               intervention_type_option: appUtil.translateCollection(res, intervention_type_option) });
  });

  /* GET form datas */
  router.get('/formEdit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Intervention.findOne({ 'code' :  req.params.code, 'owner' : req.user._id }, function(err, pojo){
      res.json({  title: res.__('title-edit-intervention'),
                  pojo : pojo,
                  intervention_type_option: appUtil.translateCollection(res, intervention_type_option) });
    });
  });


  /* GET elenco tecnici */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Intervention.find({'owner' : req.user._id}, function(err, list) {
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });

  /* delete intervento */
  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Intervention.remove({ '_id' :  req.params.id }, function(err, pojo) {
      res.end();
    });
  });

  // add form data on the db
  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var intervention = new Intervention();
    populateRequestAndSave(req, res, intervention);
    // res.json({'code' : intervention.code});
  });

  // add form data on the db
  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Intervention.findById(req.params.id, function(err, pojo) {
      populateRequestAndSave(req, res, pojo);
      // res.json({'code' : pojo.code});
    });
  });

  /* GET intervento */
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Intervention.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.json(pojo);
    });
  });

  function populateRequestAndSave(req, res, intervention){
    intervention.code                     = req.body.code;
    intervention.type_of_intervention     = req.body.type_of_intervention;
    intervention.date                     = req.body.date;
    intervention.start_time               = req.body.start_time;
    intervention.end_time                 = req.body.end_time;
    intervention.note                     = req.body.note;
    intervention.owner                    = req.user._id;

    intervention.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        res.json({'code' : intervention.code});
        return;
    });
  };

  return router;
}
