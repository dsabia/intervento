var express = require('express');
var router = express.Router();
var WorkFolder = require('../models/work_folder');
var Customer = require('../models/customer').model;
var Technician = require('../models/technician').model;
var appUtil = require('../services/app_util');
var Promise = require('promise');

var options_status = [
  "o-status-aperto" ,
  "o-status-chiuso-non-pagato",
  "o-status-chiuso"
];

module.exports = function(_i18n){
  var i18n = _i18n;

  /* PAGE VIEW */
  router.get('/page/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/work_folder/view');
  });

  /* PAGE FORM */
  router.get('/page/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/work_folder/form');
  });

  /* open form add */
  router.get('/formAdd', appUtil.ensureAuthenticated, function(req, res, next) {
    var pojo = new WorkFolder();
    res.json({ title: 'Nuovo lavoro' });
  });

  /* open form edit */
  router.get('/formEdit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    WorkFolder.findOne({ 'code' :  req.params.code, 'owner' : req.user._id})
        .populate('customer','company_name')
        .populate('technician','name')
        .exec( function(err, pojo) {
          if (err){
            console.log(err);
            return;
          }
          res.json({ title: 'Modifica lavoro',
                     pojo : pojo,
                     options_status : appUtil.applyI18NforCollection(i18n, options_status) });
        });
  });

  /* REST API */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    WorkFolder.find({'owner' : req.user._id})
      .populate('customer','company_name')
      .populate('technician','name')
      .exec( function(err, list) {
        if (err){
          console.log(err);
          return;
        }
        list.forEach(function(pojo) {
          pojo.status = appUtil.applyI18N(i18n, pojo.status);
        });
        res.json(list);
      });
  });

  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    WorkFolder.findOne({ 'code' :  req.params.code, 'owner' : req.user._id})
        .populate('customer','company_name')
        .populate('technician','name')
        .exec( function(err, pojo) {
          if (err){
            console.log(err);
            return;
          }
          pojo.status = appUtil.applyI18N(i18n, pojo.status);
          res.json(pojo);
        });
  });

  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var work = new WorkFolder();
    populateRequestAndSave(req, res, work);
  });

  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    WorkFolder.findById(req.params.id, function(err, pojo) {
      populateRequestAndSave(req, res, pojo);
    });
  });

  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    WorkFolder.remove({ '_id' :  req.params.id }, function(err, pojo) {
      res.end();
    });
  });

  function populateRequestAndSave(req, res, work){
    work.code        = req.body.code;
    work.owner       = req.user._id;
    work.status      = req.body.status;
    work.note        = req.body.note;

    Customer.findOne({"company_name":req.body.customer.company_name, "owner":req.user._id}, function (err, customer){
      work.customer    = customer;

      Technician.findOne({"name" : req.body.technician.name, "owner":req.user._id}, function (err, technician){
        work.technician    = technician;

        // follows the other elements to save, like interventions etc....

        work.save(function(err) {
          console.log('save ' + err);
          if (err)
            throw err;
          res.json({'code' : work.code});
          return;
        });
      });
    });
  }

  return router;
}
