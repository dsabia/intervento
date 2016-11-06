var express = require('express');
var fs = require('fs');
var multer = require('multer');
var appUtil = require('../services/app_util');
var Image = require('../models/image');

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
        res.render('app/immagine/view', { title: 'Elenco immagini', list_immagini: list_results });
      }else if(list_results.length == 1){
        var pojo = list_results[0];
        res.render('app/immagine/view', { title: 'Dettaglio immagine', immagine: pojo });
      }else{
        res.render('app/immagine/view', { title: 'Imamgini non presenti'});
      }
    });
  });

  /* open page add immagine */
  router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
    res.render('app/immagine/add', { title: 'Aggiungi immagine' });
  });

  // add form data on the db
  router.post('/add',  upload.single('immagine'), function(req, res, next) {
    var image = new Image();
    image.descrizione     = req.body.descrizione;
    image.nome_immagine   = req.file.originalname;
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

    res.redirect('/immagine/detail/' + image.nome_immagine);
  });

  /* detail image */
  router.get('/detail/:nome_immagine', appUtil.ensureAuthenticated, function(req, res, next) {
    Image.findOne({ 'nome_immagine' :  req.params.nome_immagine, 'owner' : req.user._id}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.render('app/immagine/view', { title: 'Dettaglio immagine', immagine: pojo });
    });
  });

  /* delete image */
  router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
    Image.remove({ '_id' :  req.params.id }, function(err, pojo) {
      res.redirect('/immagine');
    });
  });

  /* stream image */
  router.get('/file/:nome_immagine', appUtil.ensureAuthenticated, function(req, res, next) {
    var nome_immagine = req.params.nome_immagine;
    Image.findOne({'nome_immagine' : nome_immagine, 'owner' : req.user._id}, function(err, pojo) {
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
