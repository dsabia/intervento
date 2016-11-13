// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var interventoSchema = require('../models/intervention').schema;

// define the schema for our user model
var workSchema = mongoose.Schema({
    code              : String,
    customer          : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    technician        : {type: mongoose.Schema.Types.ObjectId, ref: 'Technician'},
    interventions     : [interventoSchema],
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Work', workSchema);
