var exports = {};

// not in use - confirmed
exports.setSelectedOption = function (options, value){
  var result = [];
  for (var i = 0; i < options.length; i++) {
    var optionValue = options[i];
    result.push({value : optionValue, selected : optionValue==value});
  }
  return result;
}

exports.translateCollection = function(res, collection){
  var returnCollection = [];
  for (var i = 0; i < collection.length; i++) {
    returnCollection.push(res.__(collection[i]));
  }
  return returnCollection;
}

exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = exports;
