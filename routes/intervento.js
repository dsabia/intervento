var express = require('express');
var router = express.Router();
var Intervento = require('../models/intervento');

var tipo_intervento_option = [
  "o-tipo-intervento-sopralluogo" ,
  "o-tipo-intervento-installazione" ,
  "o-tipo-intervento-manutenzione" ,
  "o-tipo-intervento-assistenza" ,
  "o-tipo-intervento-fornitura-materiale" ,
  "o-tipo-intervento-preventivo"
];


/* GET elenco tecnici */
router.get('/', ensureAuthenticated, function(req, res, next) {
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

/* open page add new tecnico */
router.get('/add', ensureAuthenticated, function(req, res, next) {
    res.render('app/intervento/add', { title: 'Aggiungi un intervento tecnico', tipo_intervento_option: tipo_intervento_option });
});

// add form data on the db
router.post('/add', ensureAuthenticated, function(req, res, next) {
    var intervento = new Intervento();
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

    res.redirect('/intervento/'+intervento.codice);
});

/* GET tecnico */
router.get('/:code', ensureAuthenticated, function(req, res, next) {
    Intervento.findOne({ 'codice' :  req.params.code }, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.render('app/intervento/view', { title: 'Dettaglio intervento', intervento: pojo });
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
