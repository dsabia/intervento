var chai = require('chai');
//var expect = chai.expect;
var assert = chai.assert;

var mongo = require('mongodb');
var configDB = require('../config/database.js');
var mongoose = require('mongoose');
var db = mongoose.connect(configDB.test_url);
db.safe = {w: 1};

var fs = require('fs');

var GridStore = mongo.GridStore;
var ObjectID = mongo.ObjectID;

describe('GridStore', function() {
  it('saveFileInMangoose() should save the file in mangoose and retrive it', function() {
    var file_path = '/resources/aliensmokepipe.jpg';
    var path = __dirname + file_path;
    var userPath = 'user/id';

    var fileId = new ObjectID();
    // Open a new file
    var gridStore = new GridStore(db, fileId, 'w');

    // Read the filesize of file on disk (provide your own)
    var fileSize = fs.statSync(path).size;
    // Read the buffered data for comparision reasons
    var data = fs.readFileSync(path);

    // Write the file to gridFS
    gridStore.writeFile(userPath+file_path, function(err, doc) {

      // Read back all the written content and verify the correctness
      GridStore.read(db, fileId, function(err, fileData) {
        assert.equal(data.toString('base64'), fileData.toString('base64'))
        assert.equal(fileSize, fileData.length);

        //db.close();
      });
    });
  });

  it('saveAndRead() should read the file saved previously', function() {
    var file_path = '/resources/aliensmokepipe.jpg';
    var path = __dirname + file_path;
    var userPath = 'user/id';

    var mongo_file_name = userPath+file_path;
    var fileId = new ObjectID();
    // Our file ID
//    console.log(db);

    // Open a new file
    var gridStore = new GridStore(db, fileId, 'w');
//    console.log(gridStore);
    // Read the filesize of file on disk (provide your own)
    var fileSize = fs.statSync(path).size;
    // Read the buffered data for comparision reasons
    var data = fs.readFileSync(path);

    gridStore.writeFile(path, mongo_file_name, 'w', function(err, doc) {
      console.log('write ' - err);
      //db.close();
    });

    gridStore.seek(0);

    // Read back all the written content and verify the correctness
    gridStore.read(db, mongo_file_name, 'r', function(err, fileData) {
      console.log('read ' - err);
      assert.equal(data.toString('base64'), fileData.toString('base64'))
      console.log(fileData);
      //assert.equal(fileSize, fileData.length);

      //db.close();
    });

  });
});