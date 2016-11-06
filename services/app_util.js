var exports = {};

exports.setSelectedOption = function (options, value){
  var result = [];
  for (var i = 0; i < options.length; i++) {
    var optionValue = options[i];
    result.push({value : optionValue, selected : optionValue==value});
  }
  return result;
}


exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

module.exports = exports;
