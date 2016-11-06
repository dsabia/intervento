// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var technicianRateSchema = mongoose.Schema({
    diritto_chiamata  : Number,
    tariffa_fissa     : Number,
    tariffa_km        : Number,
    tariffa_oraria    : Number,
    frazioni_ora      : Number,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('TechnicianRate', technicianRateSchema);
