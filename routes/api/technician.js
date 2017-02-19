var express = require('express');
var router = express.Router();
var appUtil = require('../../services/app_util');
var Technician = require('../../models/technician').model;

module.exports = function(){

  /* GET elenco tecnici */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.find({'owner' : req.user._id}, function(err, list) {
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });

  /* GET for form */
  router.get('/formData', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.findOne({ 'account_code' :  req.params.code , 'owner' : req.user._id}, function(err, pojo){
      if(!pojo){
        res.json({ title: res.__('title-add-technician') });
      }else{
        res.json({ title: res.__('title-edit-technician'),
                   pojo: pojo });
      }
    });
  });

  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
    var rate = new Technician();
    populateRequestAndSave(req, rate);
    res.end();
  });


  // load detail page by code
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.findOne({ 'account_code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.json(pojo);
    });
  });

  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.remove({ '_id' :  req.params.id}, function(err) {
      res.end();
    });
  });

  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
      var technician = new Technician();
      populateRequestAndSave(req, res, technician);
      //res.json({"account_code": technician.account_code});
  });

  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Technician.findById(req.params.id, function(err, pojo){
      populateRequestAndSave(req, res, pojo);
      //res.json({"account_code": pojo.account_code});
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
      res.json({"account_code": technician.account_code});
      return;
    });
  }

  return router;
}
