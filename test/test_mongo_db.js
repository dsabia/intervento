var chai = require('chai');
var expect = chai.expect;

var Image = require("../models/image");

/**
 * @ignore
 */
describe('MongoDB Image', function() {
  it('find({}) shouldn\'t return null or undefined', function() {
    var listImages = Image.find({});
    expect(listImages).to.not.be.null;
    expect(listImages).to.not.be.undefined;
  });
});
