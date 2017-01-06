var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Customer = require('../models/customer').model;

module.exports = function(_i18n){
  var i18n = _i18n;
  /* PAGE VIEW */
  router.get('/page/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/customer/view');
  });

  /* PAGE FORM */
  router.get('/page/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/customer/form');
  });

  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.find({'owner' : req.user._id}, function(err, list) {
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });
  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var customer = new Customer();
    populateRequestAndSave(req, customer);
      res.json({"code": customer.code});
  });

  // load detail page by code
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.json(pojo);
    });
  });

  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.remove({ '_id' :  req.params.id}, function(err) {
      res.end();
    });
  });

  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
      Customer.findById(req.params.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.json({"code": pojo.code});
    });
  });

  function populateRequestAndSave(req, customer){
      customer.code               = req.body.code;
      customer.discount           = req.body.discount;
      customer.company_name       = req.body.company_name;
      customer.piva_cf            = req.body.piva_cf;
      customer.address            = req.body.address;
      customer.phone              = req.body.phone;
      customer.email              = req.body.email;
      customer.owner              = req.user._id;

      customer.save(function(err) {
          console.log('save ' + err);
          if (err)
              throw err;
          return;
      });
  }

  return router;
}
