var exports = {};

// not in use
exports.setSelectedOption = function (options, value){
  var result = [];
  for (var i = 0; i < options.length; i++) {
    var optionValue = options[i];
    result.push({value : optionValue, selected : optionValue==value});
  }
  return result;
}

exports.applyI18N = function(i18n, key){
  return i18n.__(key);
}

exports.applyI18NforCollection = function(i18n, collection){
  var returnCollection = [];
  for (var i = 0; i < collection.length; i++) {
    returnCollection.push(i18n.__(collection[i]));
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
