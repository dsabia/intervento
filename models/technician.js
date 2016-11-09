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
    email             : String,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = {
  model : mongoose.model('Technician', technicianSchema),
  schema: technicianSchema
}
