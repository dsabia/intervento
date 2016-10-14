var chai = require('chai');
//var expect = chai.expect;
var assert = chai.assert;
var configDB = require('../config/database.js');
var file_path = './resources/aliensmokepipe.jpg';
var MongoClient = require('mongodb').MongoClient
, fs = require('fs')
, GridStore = MongoClient.GridStore;


describe('GridStore', function() {
  it('executeMongoDbExample() should save the file in mangoose and retrive it', function() {
    MongoClient.connect(configDB.url, function(err, db) {
      // Set up gridStore
      var gridStore = new GridStore(db, "test_stream_write_2", "w");
      gridStore.writeFile(file_path, function(err, result) {
        // Open a readable gridStore
        gridStore = new GridStore(db, "test_stream_write_2", "r");
        // Create a file write stream
        var fileStream = fs.createWriteStream("./test_stream_write_2.tmp");
        fileStream.on("close", function(err) {
          // Read the temp file and compare
          var compareData = fs.readFileSync("./test_stream_write_2.tmp");
          var originalData = fs.readFileSync(file_path);
          test.deepEqual(originalData, compareData);
          test.done();
        })
        // Pipe out the data
        gridStore.pipe(fileStream);
      });
    });

  });
});
