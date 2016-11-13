var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    name           : String,
    description    : String,
    data           : Buffer,
    contentType    : String,
    owner          : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Image', imageSchema);
