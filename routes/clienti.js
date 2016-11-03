var express = require('express');
var router = express.Router();

var Customer            = require('../models/customer');

/* GET scheda */
router.get('/', ensureAuthenticated, function(req, res, next) {
  Customer.find({}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/clienti/dettaglio', { title: 'Elenco clienti', list:  list_pojos });
  });
});

/* open page add new cliente */
router.get('/add', ensureAuthenticated, function(req, res, next) {
  res.render('app/clienti/scheda', { title: 'Aggiungi un cliente'});
});

// open page edit cliente
router.get('/edit/:codice', ensureAuthenticated, function(req, res, next) {
  Customer.findOne({ 'codice' :  req.params.codice }, function(err, customer) {
    res.render('app/clienti/scheda', { title: 'Modifica cliente', customer: customer});
  });
});

// load detail page by code
router.get('/:codice', ensureAuthenticated, function(req, res, next) {
  Customer.findOne({ 'codice' :  req.params.codice }, function(err, customer) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/clienti/dettaglio', { 'customer': customer});
  });
});

// add form data on db
router.post('/add', ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Customer.findById(req.body.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.redirect('/clienti/'+pojo.codice);
    });
  }else{
    var customer = new Customer();
    populateRequestAndSave(req, customer);
    res.redirect('/clienti/'+customer.codice);
  }
});

function populateRequestAndSave(req, customer){
    customer.codice                = req.body.codice;
    customer.sconto                = req.body.sconto;
    customer.ragione_sociale       = req.body.ragione_sociale;
    customer.piva_cf               = req.body.piva_cf;
    customer.indirizzo             = req.body.indirizzo;
    customer.telefono              = req.body.telefono;
    customer.email                 = req.body.email;

    customer.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        return;
    });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
