var mongoose = require('mongoose');

// define the schema for material model
var materialSchema = mongoose.Schema({
  code    	       : String,
  product_name     : String,
  description      : String,
  price     	     : Number,
  owner            : mongoose.Schema.Types.ObjectId
});

// methods ======================

// create the model for material and expose it to the app
module.exports = mongoose.model('Material', materialSchema);
