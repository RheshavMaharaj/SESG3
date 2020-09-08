var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url);

const dbName = 'eLibrary';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Database Related Functions */

router.get('/get-data', function(req, res, next){
  
  var resultArray = [];
  
  MongoClient.connect(url, function(err, client){
    
    assert.equal(null, err);
    
    const db = client.db(dbName);
    
    var cursor = db.collection('Resources').find();
    
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      client.close();
      res.json(resultArray);
    });

  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.description,
    author: req.body.author,
    refnumber: req.body.refnumber
  }

  MongoClient.connect(url, function(err, client){
    assert.equal(null, err);

    const db = client.db(dbName);

    db.collection('Resources').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted');
      client.close();
    });
  });
  res.redirect('/');
});

/* End Database Related Functions */

module.exports = router;


