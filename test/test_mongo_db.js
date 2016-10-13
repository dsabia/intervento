var chai = require('chai');
var expect = chai.expect;

var Image = require("../models/image");

/**
 * @ignore
 */
 describe('Image', function() {
  it('findAll() should not return null or undefined', function() {
    var listImages = Image.find({});
    //console.log(listImages.length);
    expect(listImages).to.not.be.null;
    expect(listImages).to.not.be.undefined;
//    expect(cartSummary.getSubtotal()).to.equal(0);
  });
});
