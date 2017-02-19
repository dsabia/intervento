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

  /* MATERIALS */
  router.get('/material/view', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/material/view');
  });
  router.get('/material/form', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/material/form');
  });

};
