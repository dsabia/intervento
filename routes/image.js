var express = require('express');
var fs = require('fs');
var multer = require('multer');
var appUtil = require('../services/app_util');
var Image = require('../models/image');

// To RESTify

/*
var upload = multer({
  dest: __dirname + '/../public/upload/',
  limits: {fileSize: 1000000, files:1},
});
*/

module.exports = function(mongo, db){

  var upload = multer({ dest:  'uploads/' });
  var router = express.Router();

  /* GET dettaglio unica tariffa */
  router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
    Image.find({'owner' : req.user._id}, function(err, list_results) {
      if (err){
        console.log(err);
        return;
      }
      if(list_results.length > 0){
        res.render('app/image/view', { title: res.__('title-list-image'), list: list_results });
      }else if(list_results.length == 1){
        var pojo = list_results[0];
        res.render('app/image/view', { title: res.__('title-det-image'), image: pojo });
      }else{
        res.render('app/image/view', { title: res.__('title-np-image')});
      }
    });
  });

  /* open page add immagine */
  router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/image/add', { title: res.__('title-add-image')});
  });

  // add form data on the db
  router.post('/add',  upload.single('immagine'), function(req, res, next) {
    var image = new Image();
    image.description     = req.body.description;
    image.name            = req.file.originalname;
    image.data            = fs.readFileSync(req.file.path);
    image.contentType     = req.file.mimetype;
    image.owner           = req.user._id;

    image.save(function(err) {
      if (err){
        console.log('save ' + err);
        throw err;
      }
      return;
    });

    res.redirect('/image/detail/' + image.name);
  });

  /* detail image */
  router.get('/detail/:name', appUtil.ensureAuthenticated, function(req, res, next) {
    Image.findOne({ 'name' :  req.params.name, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.render('app/image/view', { title: res.__('title-det-image'), image: pojo });
    });
  });

  /* delete image */
  router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Image.remove({ '_id' :  req.params.id }, function(err, pojo) {
      res.redirect('/image');
    });
  });

  /* stream image */
  router.get('/file/:name', appUtil.ensureAuthenticated, function(req, res, next) {
    var name = req.params.name;
    Image.findOne({'name' : name, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.set('Content-Type', pojo.contentType);
      res.send(pojo.data);
    });
  });

  return router;
};
