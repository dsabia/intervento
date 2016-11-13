var express = require('express');
var router = express.Router();
var Work = require('../models/work');
var appUtil = require('../services/app_util');
var Customer = require('../models/customer').model;

/* GET elenco lavori */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Work.find({'owner' : req.user._id}, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
      res.render('app/lavoro/view', { title: 'Elenco lavori', list:  list_results });
    }else{
      res.render('app/lavoro/view', { title: 'Nessun lavoro presente'});
    }
  });
});

/* open page add new lavoro */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/lavoro/add', { title: 'Nuovo lavoro'});
});

/* delete lavoro */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Work.remove({ '_id' :  req.params.id }, function(err, pojo) {
    res.redirect('/lavoro');
  });
});

/* edit lavoro */
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Work.findOne({ 'codice' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/lavoro/add',{ title: 'Modifica lavoro', work : pojo });
  });
});

// add form data on the db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Work.findById(req.body.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.redirect('/lavoro/'+pojo.codice);
    });
  }else{
    var work = new Work();
    populateRequestAndSave(req, work);
    res.redirect('/lavoro/'+work.codice);
  }
});

router.get('/clienti/:q', appUtil.ensureAuthenticated, function(req, res, next) {
  console.log("Input: " + req.params.q + " user " + req.user._id + " regexP: " + new RegExp(req.params.q, "i"));
  Customer.find({
    "owner" : req.user._id,
    "ragione_sociale" : new RegExp(req.params.q, "i")
  }, function(err, list_results){
    if (err){
      console.log(err);
      return;
    }
    console.log(list_results);
    res.json(list_results);
  });
});




/* GET lavoro */
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Work.findOne({ 'codice' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/lavoro/view', { title: 'Dettaglio lavoro', work: pojo });
  });
});

function populateRequestAndSave(req, work){
  work.codice      = req.body.codice;
  work.customer    = req.body.customer;

  work.owner       = req.user._id;

  work.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
