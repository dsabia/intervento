// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var interventoSchema = mongoose.Schema({
    code                  : String,
    type_of_intervention  : String,
    date                  : Date,
    start_time            : String,
    end_time              : String,
    notes                 : String,
    owner                 : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for users and expose it to our app
module.exports = {
  model: mongoose.model('Intervention', interventoSchema),
  schema: interventoSchema
}
