var express = require('express');
var router = express.Router();
var appUtil = require('../../services/app_util');
var Material = require('../../models/material');

module.exports = function(){
  /* GET for form */
  router.get('/formAdd', appUtil.ensureAuthenticated, function(req, res, next) {
    res.json({ title: res.__('title-add-material') });
  });

  router.get('/formEdit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Material.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      res.json({ title: res.__('title-edit-material'),
                 pojo: pojo });
    });
  });


  /* REST API */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Material.find({'owner' : req.user._id}, function(err, list) {
      if (err){
        console.log(err);
        return;
      }
      res.json(list);
    });
  });

  // load detail page by code
  router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
    Material.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.json(pojo);
    });
  });

  /* open page delete material */
  router.delete('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Material.remove({ '_id' :  req.params.id }, function(err){
      res.end();
    });
  });

  // add form data on db
  router.post('/', appUtil.ensureAuthenticated, function(req, res, next) {
      var material = new Material();
      populateRequestAndSave(req, res, material);
//      res.json({"code": material.code});
  });

  // add form data on db
  router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Material.findById(req.params.id, function(err, pojo){
      populateRequestAndSave(req, res, pojo);
//      res.json({"code": pojo.code});
    });
  });

  function populateRequestAndSave(req, res, material){
    material.code    		   = req.body.code;
    material.product_name  = req.body.product_name;
    material.description   = req.body.description;
    material.price     		 = req.body.price;
    material.owner         = req.user._id;

    material.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        res.json({"code": material.code});
        return;
    });
  }

  return router;
}
