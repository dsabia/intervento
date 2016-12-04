process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect();

var Material = require('../models/material');

chai.use(chaiHttp);

describe('Material API', function() {

  beforeEach(function(done){
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
  afterEach(function(done){
    Material.remove({ 'code' :  2 }, function(err){
      done();
    });
  });

  it('getAll: should list all materials', function(done) {
    chai.request(server)
      .get('/material/getAll')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.to.not.be.undefined;
        expect(res.list).to.not.be.undefined;
        expect(res.pojo).to.be.undefined;
        done();
      });
  });

  it('get: should list all materials', function(done) {
    chai.request(server)
      .get('/material/get/'+2)
      .end(function(err, res){
        res.should.have.status(200);
        expect(res).to.not.be.undefined;
        expect(res.pojo).to.not.be.undefined;
        expect(res.list).to.be.undefined;
        done();
      });
  });
});
