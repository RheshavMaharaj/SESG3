var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'eLibrary';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Database Related Functions */

//Database document retrieval. Retrieves all data from the specified collection 
router.get('/get-requests', function(req, res, next){
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    var cursor = db.collection('Requests').find();
    
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

router.get('/get-category-fiction', function(req, res, next){
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    var cursor = db.collection('Resources').find({ category: "Fiction" });
    
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

var searchResults = []; //Used to store all the data into a local array to then be mapped in Home.js

router.get('/search-results', function(req,res,next){
  
  var error = [{"_id": "01", 
                "title":"Your Search Results returned Nothing"
              }];
  if(searchResults != 0){
    res.json(searchResults);
    searchResults = [];
  }
  else res.json(error);

});

router.post('/search', function(req,res,next) {
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    var cursor = db.collection('Resources').find({ title: req.body.search });
    
    //Looping through the documents in the database to store into local array
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      searchResults.push(doc); //storing to local array
    }, function(){
      client.close(); //closing database
      //res.json(resultArray);
      res.redirect('/home');
    });

  });

});



//Database insert function via router. Allows data updates on page loads
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.description,
    author: req.body.author,
    refnumber: req.body.refnumber,
    category: req.body.category
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
  res.redirect('/home');
});

var remErr = false;

router.post('/remove', function(req, res, next) {
  
  MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);

    if(db.collection('User').countDocuments({ books: req.body.refnumber }, limit=1) == 0){

      if (err) throw err;
      
      var myquery = { refnumber: req.body.refnumber };
      db.collection('Resources').deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        client.close();
      });
      res.redirect('/home');
    }
    else {
      console.log('User has borrowed this book. Unable to delete.');
      remErr = true;
      res.redirect('/home');
    }

  }); 

});

router.get('/get-rem-err', function(req,res) {
  res.json(remErr);
  remErr = false;
});

router.post('/edit', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { title: req.body.search };
    var newvalues = { $set: {title: req.body.title, content: req.body.content , author: req.body.author, refnumber: req.body.refnumber} };
    db.collection('Resources').updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  }); 
  res.redirect('/home');
});

router.post('/book-request', function(req, res, next) {
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
    db.collection('Requests').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted'); //logs on console on successful insertion
      client.close(); //closing database
    });

  });
  res.redirect('/home');
});


/* End Database Related Functions */

module.exports = router;


