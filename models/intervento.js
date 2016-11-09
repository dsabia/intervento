// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var interventoSchema = mongoose.Schema({
    codice            : String,
    tipo_intervento   : String,
    data              : Date,
    ora_inizio        : String,
    ora_fine          : String,
    note              : String,
    owner             : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = {
  model: mongoose.model('Intervento', interventoSchema),
  schema: interventoSchema
}
