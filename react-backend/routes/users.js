var express = require('express');
var router = express.Router();
var assert = require('assert');
var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String
var session = require('express-session');

const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(url);

const dbName = 'eLibrary';

/* GET home page. */
/*
router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

/* Database Related Functions */

//Database document retrieval. Retrieves all data from the specified collection 
router.get('/get-users', function(req, res, next){
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    var cursor = db.collection('User').find();
    
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

//Database insert function via router. Allows data updates on page loads
router.post('/insert-user', function(req, res, next) {
  var item = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact_number: req.body.contact_number,
    user_type: req.body.user_type,
    email: req.body.email,
    password: req.body.password
  }

  MongoClient.connect(url, function(err, client){
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only

    const db = client.db(dbName);

    //Mongodb Insert function
    db.collection('User').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted'); //logs on console on successful insertion
      client.close(); //closing database
    });

  });
  req.session.user = item;
  res.redirect('/home');
});

router.post('/handle-login', function(req,res,next) {
  var user;

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    db.collection("User").findOne({
      email: req.body.email
    }, 
    function(err, result) {
      if (err) throw err;
      user = result;
      if(!req.body.email || !req.body.password){
        res.redirect('/login');
      } 
      else {
        if(user.email == req.body.email && user.password == req.body.password){
          req.session.user = user;
          console.log(user.first_name + " " + user.email);
          res.redirect('/home');
        }
        else res.redirect('/login');
      }
      client.close();
    });

  });

});

router.get('/login-status', function(req, res) {
  var status = false;
  
  if(req.session.user){
    status = true;
  }
  if(status){
    console.log("User is Logged in");
  }
  else console.log("User is Logged out");
  
  res.json(status);
  
});

router.post('/logout', function(req, res){
  req.session.destroy(function(){
    console.log("user logged out.");
  });
  res.redirect('/login');
});

router.get('/get-session-user', function(req,res,next) {
  var userID = req.session.user.first_name;
  res.json(userID);
});

router.get('/get-user-type', function(req,res,next) {
  var userType = req.session.user.user_type;
  res.json(userType);
});

router.get('/get-user-info', function(req,res,next) {
  var user = req.session.user;
  res.json(user);
});

/* End Database Related Functions */

module.exports = router;
