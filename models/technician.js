// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var technicianSchema = mongoose.Schema({
    name              : String,
    surname           : String,
    account_code      : String,
    address           : String,
    phone             : String,
    email             : String
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Technician', technicianSchema);
