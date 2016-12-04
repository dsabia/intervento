process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect();
var Material = require('../models/material');
chai.use(chaiHttp);

describe('Material API', function() {
  this.timeout(30000);

  before(function(done){
    var material = new Material({
      code: "2",
      product_name : "Product Name",
      description  : "product desctiption",
      price     	 : "2.33"
    });
    material.save(function(err) {
      done();
    });
  });

  after(function(done){
    Material.remove({ 'code' :  2 }, function(err){
      done();
    });
  });

  it('/get : should list all materials', function(done) {
    chai.request(server)
      .get('/material/getAll')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.to.not.be.undefined;
        //expect(res.body.lenght).to.be.equal(1);
        done();
      });
  });

  it('/get/code : should return one material', function(done) {
    chai.request(server)
      .get('/material/'+2)
      .end(function(err, res){
        res.should.to.not.be.undefined;
        //expect(res.body.code).to.be.equal("2");
        done();
      });
  });
});
