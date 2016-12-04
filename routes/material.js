var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Material = require('../models/material');

/* PAGE VIEW */
router.get('/view', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/material/view');
});

/* PAGE FORM */
router.get('/form', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/material/add');
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
    populateRequestAndSave(req, material);
    res.json({"code": material.code});
});

// add form data on db
router.put('/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Material.findById(req.params.id, function(err, pojo){
    populateRequestAndSave(req, pojo);
    res.json({"code": pojo.code});
  });
});

function populateRequestAndSave(req, material){
  material.code    		   = req.body.code;
  material.product_name  = req.body.product_name;
  material.description   = req.body.description;
  material.price     		 = req.body.price;
  material.owner           = req.user._id;

  material.save(function(err) {
      console.log('save ' + err);
      if (err)
          throw err;
      return;
  });
}

module.exports = router;
