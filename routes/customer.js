var express = require('express');
var router = express.Router();
var appUtil = require('../services/app_util');
var Customer = require('../models/customer').model;

/* GET scheda */
router.get('/', appUtil.ensureAuthenticated, function(req, res, next) {
  Customer.find({'owner' : req.user._id}, function(err, list_pojos) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/customer/dettaglio', { title: 'Elenco clienti', list:  list_pojos });
  });
});

/* open page add new cliente */
router.get('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  res.render('app/customer/scheda', { title: 'Aggiungi un cliente'});
});

// open page edit cliente
router.get('/edit/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Customer.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, customer) {
    res.render('app/customer/scheda', { title: 'Modifica cliente', customer: customer});
  });
});

// delete cliente
router.get('/delete/:id', appUtil.ensureAuthenticated, function(req, res, next) {
  Customer.remove({ '_id' :  req.params.id}, function(err, customer) {
    res.redirect('/customer');
  });
});

// load detail page by code
router.get('/:code', appUtil.ensureAuthenticated, function(req, res, next) {
  Customer.findOne({ 'code' :  req.params.code, 'owner' : req.user._id}, function(err, customer) {
    if (err){
      console.log(err);
      return;
    }
    res.render('app/customer/dettaglio', { 'customer': customer});
  });
});

// add form data on db
router.post('/add', appUtil.ensureAuthenticated, function(req, res, next) {
  if(req.body.id){
    Customer.findById(req.body.id, function(err, pojo) {
      populateRequestAndSave(req, pojo);
      res.redirect('/customer/'+pojo.code);
    });
  }else{
    var customer = new Customer();
    populateRequestAndSave(req, customer);
    res.redirect('/customer/'+customer.code);
  }
});

function populateRequestAndSave(req, customer){
    customer.code               = req.body.code;
    customer.discount           = req.body.discount;
    customer.company_name       = req.body.company_name;
    customer.piva_cf            = req.body.piva_cf;
    customer.address            = req.body.address;
    customer.phone              = req.body.phone;
    customer.email              = req.body.email;
    customer.owner              = req.user._id;

    customer.save(function(err) {
        console.log('save ' + err);
        if (err)
            throw err;
        return;
    });
}

module.exports = router;
