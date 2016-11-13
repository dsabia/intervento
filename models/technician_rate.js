// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var technicianRateSchema = mongoose.Schema({
    consultancy_fee   : Number,
    fixed_rate        : Number,
    km_rate           : Number,
    hour_rate         : Number,
    fraction_of_hour  : Number,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('TechnicianRate', technicianRateSchema);
