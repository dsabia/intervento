// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var customerSchema = mongoose.Schema({
    codice            : String,
    sconto            : String,
    ragione_sociale   : String,
    piva_cf           : String,
    indirizzo         : String,
    telefono          : String,
    email             : String,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Customer', customerSchema);
