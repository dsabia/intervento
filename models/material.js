var mongoose = require('mongoose');

// define the schema for material model
var materialSchema = mongoose.Schema({
  codice    	     : String,
  nome_prodotto    : String,
  descrizione      : String,
  prezzo     	     : Number
});

// methods ======================

// create the model for material and expose it to the app
module.exports = mongoose.model('Material', materialSchema);
