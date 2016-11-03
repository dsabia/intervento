var express = require('express');
var router = express.Router();

var Material            = require('../models/material');

/* GET scheda */
router.get('/', ensureAuthenticated, function(req, res, next) {
  Material.find({}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/materiale/view', { title: 'Elenco materiali', list:  list_pojos });
  });
});

/* open page add new material */
router.get('/add', ensureAuthenticated, function(req, res, next) {
  res.render('app/materiale/add', { title: 'Aggiungi materiale'});
});

/* open page edit material */
router.get('/edit/:codice', ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'codice' :  req.params.codice }, function(err, pojo){
    res.render('app/materiale/add', { title: 'Modifica materiale', material : pojo});
  });
});

// load detail page by code
router.get('/:codice', ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'codice' :  req.params.codice }, function(err, pojo) {
    if (err){
      pojo.log(err);
      return;
    }
    res.render('app/materiale/view', { 'materiale': pojo});
  });
});

// add form data on db
router.post('/add', ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Material.findById(req.body.id, function(err, pojo){
      populateRequestAndSave(req, pojo);
      res.redirect('/materiale/'+pojo.codice);
    });
  }else{
    var material = new Material();
    populateRequestAndSave(req, material);
    res.redirect('/materiale/'+material.codice);
  }
});

function populateRequestAndSave(req, material){
  material.codice    		   = req.body.codice;
  material.nome_prodotto   = req.body.nome_prodotto;
  material.descrizione     = req.body.descrizione;
  material.prezzo     		 = req.body.prezzo;
  //material.matricola     	 = req.body.matricola;
  //material.sconto     		 = req.body.sconto;
  //material.quantita     	 = req.body.quantita;

  material.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
