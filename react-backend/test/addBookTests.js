var assert = require('assert');
"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const resourceSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  author: { type: String, required: true},
  refnumber: { type: String, required: true}
});


//Create a new collection called 'Name'
const Resource = mongoose.model("Resource", resourceSchema);

describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Test Database', function() {
    //Save resource to database
    it('New resource saved to test database', function(done) {
      var testResource = Resource({
        title: "Lord of the Rings",
        content: "content",
        author: "J. R. R. Tolkien",
        refnumber: "1"
      });
 
      testResource.save(done);
    });

    it('Does not save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Resource({
        notTitle: 'Not Title',
        notContent: "Not Content",
        notAuthor: "Not Author",
        notRefNumber: "Not RefNumber"
      });

      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Invalid schema can not be added to the database!');
      });
    });

    it('Should retrieve data from database', function(done) {
      //Look up the 'testResource' object previously saved.
      Resource.find({
        title: "Lord of the Rings" }, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });

   //After all tests are finished drop database and close connection
   after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});