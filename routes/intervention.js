var express = require('express');
var router = express.Router();
var Intervention = require('../models/intervention').model;
var appUtil = require('../services/app_util');

// To RESTify

var intervention_type_option = [
  "o-tipo-intervento-sopralluogo" ,
  "o-tipo-intervento-installazione" ,
  "o-tipo-intervento-manutenzione" ,
  "o-tipo-intervento-assistenza" ,
  "o-tipo-intervento-fornitura-materiale" ,
  "o-tipo-intervento-preventivo"
];


/* GET elenco tecnici */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervention.find({'owner' : req.user._id}, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
      res.render('app/intervention/view', { title: 'Elenco interventi', list:  list_results });
//    }else if(list_results.length == 1){
//      var pojo = list_results[0];
//      res.render('app/intervento/view', { title: 'Dettaglio intervento', intervento: pojo });
    }else{
      res.render('app/intervention/view', { title: 'Nessun intervento presente'});
    }
  });
});

/* open page add new intervento */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/intervention/form', { title: 'Aggiungi un intervento tecnico',
                                       tipo_intervento_option: intervention_type_option });
});

/* edit intervento */
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervention.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/intervention/form',{ title: 'Modifica intervento',
                                      intervention : pojo,
                                      tipo_intervento_option: appUtil.setSelectedOption(intervention_type_option, pojo.type_of_intervention) });
  });
});

/* delete intervento */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervention.remove({ '_id' :  req.params.id }, function(err, pojo) {
    res.redirect('/intervention');
  });
});

/* GET intervento */
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervention.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/intervention/view', { title: 'Dettaglio intervento', intervention: pojo });
  });
});

// add form data on the db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Intervention.findById(req.body.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.redirect('/intervention/'+pojo.code);
    });
  }else{
    var intervention = new Intervention();
    populateRequestAndSave(req, intervention);
    res.redirect('/intervention/'+intervention.code);
  }
});

function populateRequestAndSave(req, intervention){
  intervention.code                     = req.body.code;
  intervention.type_of_intervention     = req.body.type_of_intervention;
  intervention.date                     = req.body.date;
  intervention.start_time               = req.body.start_time;
  intervention.end_time                 = req.body.end_time;
  intervention.notes                    = req.body.notes;
  intervention.owner                    = req.user._id;

  intervention.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
