var express = require('express');
var router = express.Router();

var Customer            = require('../models/customer');

/* GET scheda */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('app/clienti/scheda');
});
// add form data on db
router.post('/add', ensureAuthenticated, function(req, res, next) {
  var customer = new Customer();
  console.log(req.body.codice);
  console.log(customer);
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

  res.redirect('/clienti/'+customer.codice);
});
// load detail page by code
router.get('/:codice', ensureAuthenticated, function(req, res, next) {
  var customer = Customer.findOne({ 'codice' :  req.param.codice }, function(err, customer) {
    if (err){
      console.log(err);
      return;
    }
  });
  console.log('if work> ' + customer.codice);
  res.render('app/clienti/dettaglio', {'customer' : customer});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login')
}

module.exports = router;
