var express = require('express');
var router = express.Router();
var appUtil = require('../../services/app_util');
var Customer = require('../../models/customer').model;

module.exports = function(){

  /* GET for form */
  router.get('/formAdd', appUtil.ensureAuthenticated, function(req, res, next) {
    res.json({ title: res.__('title-add-customer') });
  });

  router.get('/formEdit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      res.json({ title: res.__('title-edit-customer'),
                 pojo: pojo });
    });
  });

  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.find({'owner' : req.user._id}, function(err, list) {
      if (err){
        console.log(err);
        return;
      }
      res.json({list:list,
                title:res.__('title-list-customer')});
    });
  });


  // load detail page by code
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.json({pojo:pojo,
                title:res.__('title-det-customer')});
    });
  });

  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.remove({ '_id' :  req.params.id}, function(err) {
      res.end();
    });
  });

  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var customer = new Customer();
    populateRequestAndSave(req, res, customer);
      //res.json({"code": customer.code});
  });

  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
      Customer.findById(req.params.id, function(err, pojo) {
      populateRequestAndSave(req, res, pojo);
      //res.json({"code": pojo.code});
    });
  });

  function populateRequestAndSave(req, res, customer){
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
          res.json({"code": customer.code});
          return;
      });
  }

  return router;
}
