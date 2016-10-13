var express = require('express');
var fs = require('fs');
var multer = require('multer');

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
  router.get('/', ensureAuthenticated, function(req, res, next) {
    Image.find({}, function(err, list_results) {
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
  router.get('/add', ensureAuthenticated, function(req, res, next) {
      res.render('app/immagine/add', { title: 'Aggiungi immagine' });
  });

  // add form data on the db
  router.post('/add',  upload.single('immagine'), function(req, res, next) {
      var image = new Image();
      image.descrizione     = req.body.descrizione;
      image.nome_immagine   = req.file.filename;
      image.data            = fs.readFileSync(req.file.path);
      image.contentType     = req.file.mimetype;

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
  router.get('/detail/:nome_immagine', ensureAuthenticated, function(req, res, next) {
    Image.findOne({ 'nome_immagine' :  req.params.nome_immagine }, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
    //  res.sendfile(path.resolve('./uploads/image.png'));
      res.render('app/immagine/view', { title: 'Aggiungi immagine', immagine: pojo });
    });
  });

  /* stream image */
  router.get('/file/:nome_immagine', ensureAuthenticated, function(req, res, next) {
    var nome_immagine = req.params.nome_immagine;
    Image.findOne({'nome_immagine' : nome_immagine}, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.set('Content-Type', pojo.contentType);
      res.send(pojo.data);
    });
  });


  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
  }

  return router;
};
