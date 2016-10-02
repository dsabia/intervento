var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest:  'uploads/' })

var Image = require('../models/image');
/*
var upload = multer({
  dest: __dirname + '/../public/upload/',
  limits: {fileSize: 1000000, files:1},
});
*/

/* GET dettaglio unica tariffa */
router.get('/', ensureAuthenticated, function(req, res, next) {
  Image.find({}, function(err, list_results) {
    if (err){
      console.log(err);
      return;
    }
    if(list_results.length > 0){
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
    image.nome_immagine   = req.body.nome_immagine;
    image.descrizione     = req.body.descrizione;

    var file = req.file;
    console.log("File : " + file);
    var path = file.path;
    console.log("Path immagine : " + path);
    var buffer = file.buffer;
    console.log("Data:  " + buffer);

    image.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        return;
    });
    res.redirect('/immagine/');
});


/* stream image */
router.get('/:nome_immagine', ensureAuthenticated, function(req, res, next) {
  Image.findOne({ 'nome_immagine' :  req.params.nome_immagine }, function(err, pojo) {
    if (err){
      console.log(err);
      return;
    }
  //  res.sendfile(path.resolve('./uploads/image.png'));
    res.render('app/immagine/view', { title: 'Aggiungi immagine', immagine: pojo });
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
