var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); 
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

router.post('/send-email', function(req, res, next) {
  
});

//Database insert function via router. Allows data updates on page loads
router.post('/insert-user', function(req, res, next) {

  var item = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    iden_number: req.body.iden_number,
    contact_number: req.body.contact_number,
    user_type: req.body.user_type,
    books:[ 12345 ],
    faculty: req.body.faculty,
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

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: /*Enter Email here for version control*/null,
          pass: /*Enter Password here for version control*/ null
        }
      });
      
      var mailOptions = {
        from: /*copy email here for version control*/'',
        to: req.body.email,
        subject: 'Thank you For Signing Up to Our eLibrary Suite',
        html: '<h1>Welcome User</h1><p>You have been registered to the eLibrary Suite. You now have access to all the features the app offers. Enjoy!</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 

      client.close(); //closing database

    });

  });

  req.session.user = item;
  res.redirect('/home');

});


router.post('/edit-user', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { first_name: req.session.user.first_name };
    var newvalues = { $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        iden_number: req.body.iden_number,
        contact_number: req.body.contact_number,
        faculty: req.body.faculty,
        email: req.body.email,
      }
    }
    db.collection('User').updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  }); 
  res.redirect('/user');
});

var errMsg = false;

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
          errMsg = false;
          res.redirect('/home');
        }
        else {
          errMsg = true;
          res.redirect('/login');
        }
      }
      client.close();
    });

  });

});

router.get('/get-errMsg', function(req,res) {
  res.json(errMsg);
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

router.post('/borrow', function(req,res,next){
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { email: req.session.user.email };
    var newvalues = { $push: { books: req.body.refnumber } };
    db.collection('User').updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  }); 
  res.redirect('/home');
});

router.post('/return-book', function(req,res,next){
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { email: req.session.user.email };
    
    //console.log('Ref Number of Document being Removed: ' + req.body.refnumber);

    var newvalues = { $pull: { books: req.body.refnumber  } };
    
    db.collection('User').updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  }); 
  res.redirect('/home');
});

//To Do
router.get('/get-user-resources', function(req, res, next){
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  var localUser;

  var resources = [];
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    function(err, result) {
      if (err) throw err;
      localUser = result;
      resultArray = localUser.books;
      //console.log(resultArray);

      var cursor = db.collection('Resources').find({ refnumber: { $in : resultArray } });

      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resources.push(doc); //storing to local array
      }, function(){
        client.close(); //closing database
        res.json(resources);
        //console.log(resources);
      });

    });

  });

});


//
router.get('/get-user-fines', function(req,res,next) {
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  var localUser;
  
  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
    
    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    function(err, result) {
      if (err) throw err;
      localUser = result;
      resultArray = localUser.fines;

      res.json(resultArray);
      //console.log(resultArray);
      client.close();
    });

  });
})



/* End Database Related Functions */

module.exports = router;
