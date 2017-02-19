var express = require('express');
var router = express.Router();

module.exports = function(){
  /* TECHNICIAN RATES */
  router.get('/technician_rate/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/technician_rate/view');
  });
  router.get('/technician_rate/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/technician_rate/form');
  });

  /* MATERIAL */
  router.get('/material/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/material/view');
  });
  router.get('/material/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/material/form');
  });

  /* TECHNICIAN */
  router.get('/technician/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/technician/view');
  });
  router.get('/technician/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/technician/form');
  });

  /* CUSTOMER */
  router.get('/customer/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/customer/view');
  });
  router.get('/customer/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/customer/form');
  });

  /* INTERVENTION */
  router.get('/intervention/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/intervention/view');
  });
  router.get('/intervention/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/intervention/form');
  });

  /* WORK FOLDER */
  router.get('/work_folder/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/work_folder/view');
  });
  router.get('/work_folder/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/work_folder/form');
  });
  
};
