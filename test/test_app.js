var chai = require('chai');
var expect = chai.expect;

var app = require('../app.js');

describe('App', function() {
  it('App() should exist', function() {
    expect(app).to.not.be.null;
    expect(app).to.not.be.undefined;
  });
});
