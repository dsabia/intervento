var chai = require('chai');
var expect = chai.expect;

var Image = require("../models/image");

/**
 * @ignore
 */
 describe('Image', function() {
  it('findAll() should return something or nothing', function() {
    var listImages = Image.find({});
    console.log(listImages.length);
    expect(listImages).to.not.be.null;
//    expect(cartSummary.getSubtotal()).to.equal(0);
  });
});
