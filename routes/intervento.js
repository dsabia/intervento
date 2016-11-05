var express = require('express');
var router = express.Router();
var Intervento = require('../models/intervento');
var appUtil = require('../services/app_util');

var tipo_intervento_option = [
  "o-tipo-intervento-sopralluogo" ,
  "o-tipo-intervento-installazione" ,
  "o-tipo-intervento-manutenzione" ,
  "o-tipo-intervento-assistenza" ,
  "o-tipo-intervento-fornitura-materiale" ,
  "o-tipo-intervento-preventivo"
];


/* GET elenco tecnici */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervento.find({}, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
      res.render('app/intervento/view', { title: 'Elenco interventi', list:  list_results });
//    }else if(list_results.length == 1){
//      var pojo = list_results[0];
//      res.render('app/intervento/view', { title: 'Dettaglio intervento', intervento: pojo });
    }else{
      res.render('app/intervento/view', { title: 'Nessun intervento presente'});
    }
  });
});

/* open page add new intervento */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/intervento/add', { title: 'Aggiungi un intervento tecnico',
                                     tipo_intervento_option: tipo_intervento_option });
});

/* edit intervento */
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervento.findOne({ 'codice' :  req.params.code }, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/intervento/add',{ title: 'Modifica intervento',
                                      intervento : pojo,
                                      tipo_intervento_option: appUtil.setSelectedOption(tipo_intervento_option, pojo.tipo_intervento) });
  });
});

/* delete intervento */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervento.remove({ '_id' :  req.params.id }, function(err, pojo) {
    res.redirect('/intervento');
  });
});

/* GET intervento */
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Intervento.findOne({ 'codice' :  req.params.code }, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/intervento/view', { title: 'Dettaglio intervento', intervento: pojo });
  });
});

// add form data on the db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Intervento.findById(req.body.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.redirect('/intervento/'+pojo.codice);
    });
  }else{
    var intervento = new Intervento();
    populateRequestAndSave(req, intervento);
    res.redirect('/intervento/'+intervento.codice);
  }
});

function populateRequestAndSave(req, intervento){
  intervento.codice                  = req.body.codice;
  intervento.tipo_intervento         = req.body.tipo_intervento;
  intervento.data                    = req.body.data;
  intervento.ora_inizio              = req.body.ora_inizio;
  intervento.ora_fine                = req.body.ora_fine;
  intervento.note                    = req.body.note;

  intervento.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
