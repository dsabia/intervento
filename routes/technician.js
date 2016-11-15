var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Technician = require('../models/technician').model;

/* GET elenco tecnici */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Technician.find({'owner' : req.user._id}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/technician/view', { title: 'Elenco dei tecnici', list:  list_pojos });
  });
});

/* open page add new tecnico */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/technician/add', { title: 'Aggiungi un tecnico'});
});

// add form data on the db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    // update
    Technician.findById(req.body.id, function(err, technician){
      populateRequestAndSave(req, technician);
      res.redirect('/technician/'+technician.account_code);
    });
  }else{
    // insert
    var technician = new Technician();
    populateRequestAndSave(req, technician);
    res.redirect('/technician/'+technician.account_code);
  }
});

/* GET tecnico */
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Technician.findOne({ 'account_code' :  req.params.code , 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/technician/view', { technician: pojo });
  });
});

/* open page add new tecnico */
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Technician.findOne({ 'account_code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/technician/add', { title: 'Modifica il tecnico', technician : pojo });
  });
});

/* open page add new tecnico */
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Technician.remove({ '_id' :  req.params.id}, function(err) {
    res.redirect('/tecnico');
  });
});

function populateRequestAndSave(req, technician){
  technician.name         = req.body.name;
  technician.surname      = req.body.surname;
  technician.account_code = req.body.account_code;
  technician.address      = req.body.address;
  technician.phone        = req.body.phone;
  technician.email        = req.body.email;
  technician.owner        = req.user._id;

  technician.save(function(err) {
    console.log('save ' + err);
    if (err)
      throw err;
    return;
  });
}

module.exports = router;