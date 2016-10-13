var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    nome_immagine  : String,
    descrizione    : String,
    data           : Buffer,
    contentType    : String
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imageSchema);
