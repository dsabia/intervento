var exports = {};

exports.setSelectedOption = function (options, value){
  var result = [];
  for (var i = 0; i < options.length; i++) {
    var o_value = options[i];
    result.push({value : o_value, selected : o_value==value});
  }
  return result;
}

module.exports = exports;
