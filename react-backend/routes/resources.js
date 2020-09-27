var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url);

const dbName = 'eLibrary';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Database Related Functions */

//Database document retrieval. Retrieves all data from the specified collection 
router.get('/get-data', function(req, res, next){
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    var cursor = db.collection('Resources').find();
    
    //Looping through the documents in the database to store into local array
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc); //storing to local array
    }, function(){
      client.close(); //closing database
      res.json(resultArray);
    });

  });

});

router.post('/search-results', function(req,res,next) {
  
  var result = [];
  
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    var cursor = db.collection("Resources").find({ title: req.body.title });

    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      result.push(doc); //storing to local array
    }, function(){
      client.close(); //closing database
      res.json(result);
    });

  });

});

//Database insert function via router. Allows data updates on page loads
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.description,
    author: req.body.author,
    refnumber: req.body.refnumber
  }

  MongoClient.connect(url, function(err, client){
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only

    const db = client.db(dbName);

    //Mongodb Insert function
    db.collection('Resources').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted'); //logs on console on successful insertion
      client.close(); //closing database
    });

  });
  res.redirect('/');
});

/* End Database Related Functions */

module.exports = router;


