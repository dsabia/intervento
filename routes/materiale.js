var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Material = require('../models/material');

/* GET scheda */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.find({'owner' : req.user._id}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/materiale/view', { title: 'Elenco materiali', list:  list_pojos });
  });
});

/* open page add new material */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/materiale/add', { title: 'Aggiungi materiale'});
});

/* open page edit material */
router.get('/edit/:codice', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'codice' :  req.params.codice, 'owner' : req.user._id}, function(err, pojo){
    res.render('app/materiale/add', { title: 'Modifica materiale', material : pojo});
  });
});

/* open page delete material */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.remove({ '_id' :  req.params.id }, function(err){
    res.redirect('/materiale');
  });
});

// load detail page by code
router.get('/:codice', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'codice' :  req.params.codice, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      pojo.log(err);
      return;
    }
    res.render('app/materiale/view', { 'materiale': pojo});
  });
});

// add form data on db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
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
  material.owner           = req.user._id;
  
  material.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
