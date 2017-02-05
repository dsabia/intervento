var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Customer = require('../models/customer').model;
var Technician = require('../models/technician').model;

module.exports = function(){

  /* TYPEAHEAD - GET CUSTOMER BY company_name*/
  router.get('/customers/:q', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.find({ "owner" : req.user._id, "company_name" : new RegExp(req.params.q, "i") }, function(err, list){
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });

  /* TYPEAHEAD - GET CUSTOMER BY name*/
  router.get('/technicians/:q', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.find({"owner" : req.user._id , "name" : new RegExp(req.params.q, "i")}, function(err, list){
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });

  return router;
}
