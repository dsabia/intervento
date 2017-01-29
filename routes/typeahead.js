var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Customer = require('../models/customer').model;
var Technician = require('../models/technician').model;

module.exports = function(_i18n){
  var i18n = _i18n;

  /* TYPEAHEAD - GET CUSTOMER BY company_name*/
  router.get('/customers', appUtil.ensureAuthenticated, function(req, res, next) {
    Customer.find({
      "owner" : req.user._id
      //, "company_name" : new RegExp(req.params.q, "i")
    }, function(err, list){
      if (err){
        console.log(err);
        return;
      }
      // format output
      var listPojo = [];
      var listTypeahead = [];
      var listNames = [];
      for(i = 0; i < list.length; i++){
        var c = list[i];
        var item = {
          label : c.company_name,
          ref: c
        };
        listTypeahead.push(item);
        listNames.push(c.company_name);
        listPojo.push(c);
      }
      //res.json(listTypeahead);
      //res.send(listNames);
      res.json(listPojo);
    });
  });

  /* TYPEAHEAD - GET CUSTOMER BY name*/
  router.get('/technicians', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.find({
      "owner" : req.user._id
      //, "name" : new RegExp(req.params.q, "i")
    }, function(err, list){
      if (err){
        console.log(err);
        return;
      }
      var listPojo = [];
      var listTypeahead = [];
      var listNames = [];
      for(i = 0; i < list.length; i++){
        var t = list[i];
        var item = {
          label : t.name + ' ' + t.surname,
          ref: t
        };
        listTypeahead.push(item);
        listNames.push(t.name + ' ' + t.surname);
        listPojo.push(t);
      }
      //res.json(listTypeahead);
      //res.send(listNames);
      res.json(listPojo);
    });
  });

  return router;
}
