// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var customerSchema = require('../models/customer').schema;
var technicianSchema = require('../models/technician').schema;
var interventoSchema = require('../models/intervento').schema;

// define the schema for our user model
var workSchema = mongoose.Schema({
    codice            : String,
    customer          : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    technician        : technicianSchema,
    interventi        : [interventoSchema],
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Work', workSchema);
