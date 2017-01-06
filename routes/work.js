var express = require('express');
var router = express.Router();
var Work = require('../models/work');
var Customer = require('../models/customer').model;
var Technician = require('../models/technician').model;
var appUtil = require('../services/app_util');

// To RESTify

module.exports = function(_i18n){
  var i18n = _i18n;

  /* GET elenco lavori */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Work.find({'owner' : req.user._id})
        .populate('customer','company_name')
        .populate('technician','name')
        .exec( function(err, list_results) {
          if (err){
            console.log(err);
            return;
          }
          if(list_results.length > 0){
            res.render('app/work/view', { title: 'Elenco lavori', list:  list_results });
          }else{
            res.render('app/work/view', { title: 'Nessun lavoro presente'});
          }
        });
  });

  /* open page add new lavoro */
  router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/work/form', { title: 'Nuovo lavoro'});
  });

  /* edit lavoro */
  router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Work.findOne({ 'code' :  req.params.code, 'owner' : req.user._id})
        .populate('customer','company_name')
        .populate('technician','name')
        .exec( function(err, pojo) {
          if (err){
            console.log(err);
            return;
          }
          res.render('app/work/form',{ title: 'Modifica lavoro', work : pojo });
        });
  });

  /* delete lavoro */
  router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Work.remove({ '_id' :  req.params.id }, function(err, pojo) {
      res.redirect('/work');
    });
  });

  // add form data on the db
  router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
    if(req.body.id){
      Work.findById(req.body.id, function(err, pojo) {
        populateRequestAndSave(req, pojo);
        res.redirect('/work/'+pojo.code);
      });
    }else{
      var work = new Work();
      populateRequestAndSave(req, work);
      res.redirect('/work/'+work.code);
    }
  });

  /* GET lavoro */
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Work.findOne({ 'code' :  req.params.code, 'owner' : req.user._id})
        .populate('customer','company_name')
        .populate('technician','name')
        .exec(function(err, pojo) {
          if (err){
            console.log(err);
            return;
          }
          res.render('app/work/view', { title: 'Dettaglio lavoro', pojo: pojo });
        });
  });


  router.get('/customer/:q', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.find({
      "owner" : req.user._id,
      "company_name" : new RegExp(req.params.q, "i")
    }, function(err, list_results){
      if (err){
        console.log(err);
        return;
      }
      res.json(list_results);
    });
  });

  router.get('/technician/:q', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.find({
      "owner" : req.user._id,
      "name" : new RegExp(req.params.q, "i")
    }, function(err, list_results){
      if (err){
        console.log(err);
        return;
      }
      res.json(list_results);
    });
  });

  function populateRequestAndSave(req, work){
    work.code        = req.body.code;
    work.owner       = req.user._id;

    Customer.findOne({"company_name":req.body.customer, "owner":req.user._id}, function (err, customer){
      work.customer    = customer;

      Technician.findOne({"name" : req.body.technician, "owner":req.user._id}, function (err, technician){
        work.technician    = technician;

        // follows the other elements to load, like technician, etc....

        work.save(function(err) {
          console.log('save ' + err);
          if (err)
            throw err;
          return;
        });
      });
    });
  }

  return router;
}
