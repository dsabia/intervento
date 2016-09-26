var express = require('express');
var router = express.Router();
var Technician = require('../models/technician');

/* GET elenco tecnici */
router.get('/', ensureAuthenticated, function(req, res, next) {
  Technician.find({}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/tecnico/view', { title: 'Elenco dei tecnici', list:  list_pojos });
  });
});

/* open page add new tecnico */
router.get('/add', ensureAuthenticated, function(req, res, next) {
    res.render('app/tecnico/add', { title: 'Aggiungi un tecnico' });
});

// add form data on the db
router.post('/add', ensureAuthenticated, function(req, res, next) {
    var technician = new Technician();
    technician.name         = req.body.name;
    technician.surname      = req.body.surname;
    technician.account_code = req.body.account_code;
    technician.address      = req.body.address;
    technician.phone        = req.body.phone;
    technician.email        = req.body.email;

    technician.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        return;
    });

    res.redirect('/tecnico/'+technician.account_code);
});

/* GET tecnico */
router.get('/:code', ensureAuthenticated, function(req, res, next) {
    Technician.findOne({ 'account_code' :  req.params.code }, function(err, pojo) {
      if (err){
        console.log(err);
        return;
      }
      res.render('app/tecnico/view', { tecnico: pojo });
    });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
