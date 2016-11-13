// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var customerSchema = mongoose.Schema({
    code              : String,
    discount          : String,
    company_name      : String,
    piva_cf           : String,
    address           : String,
    phone             : String,
    email             : String,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = {
  model: mongoose.model('Customer', customerSchema),
  schema: customerSchema
}
