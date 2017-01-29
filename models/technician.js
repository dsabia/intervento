// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var technicianSchema = mongoose.Schema({
    account_code      : String,
    name              : String,
    surname           : String,
    address           : String,
    phone             : String,
    email             : String,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================
technicianSchema.methods.label = function() {
    return name + ' ' + surname;
};

// create the model for users and expose it to our app
module.exports = {
  model : mongoose.model('Technician', technicianSchema),
  schema: technicianSchema
}
