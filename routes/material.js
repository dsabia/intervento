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
    res.render('app/material/view', { title: 'Elenco materiali', list:  list_pojos });
  });
});

/* open page add new material */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/material/add', { title: 'Aggiungi materiale'});
});

/* open page edit material */
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo){
    res.render('app/material/add', { title: 'Modifica materiale', material : pojo});
  });
});

/* open page delete material */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.remove({ '_id' :  req.params.id }, function(err){
    res.redirect('/material');
  });
});

// load detail page by code
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      pojo.log(err);
      return;
    }
    res.render('app/material/view', { 'material': pojo});
  });
});

// add form data on db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Material.findById(req.body.id, function(err, pojo){
      populateRequestAndSave(req, pojo);
      res.redirect('/material/'+pojo.code);
    });
  }else{
    var material = new Material();
    populateRequestAndSave(req, material);
    res.redirect('/material/'+material.code);
  }
});

function populateRequestAndSave(req, material){
  material.code    		   = req.body.code;
  material.product_name  = req.body.product_name;
  material.description   = req.body.description;
  material.price     		 = req.body.price;
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
