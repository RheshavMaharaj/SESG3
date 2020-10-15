var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); 
var assert = require('assert');
var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String
var session = require('express-session');
const e = require('express');
const bcrypt = require('bcrypt');

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'eLibrary'; //MongoDB specified Library Cluster
let date_ob = new Date(); //Initialising Date objects for Fine Tracking
var block = false; //Tracking if user can borrow book or not




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

var signErrMsg = false;

//Database insert function via router. Allows data updates on page loads
router.post('/insert-user', function(req, res, next) {
  
  //bcrypt goes here
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    // Store hash in database
    var item = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      iden_number: req.body.iden_number,
      contact_number: req.body.contact_number,
      user_type: req.body.user_type,
      books:[ ],
      fines: [ ],
      faculty: req.body.faculty,
      email: req.body.email,
      password: hash
    }
 
    //Access the database
    MongoClient.connect(url, function(err, client){
      assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
  
      const db = client.db(dbName);
      var docCount;

      db.collection("User").countDocuments({ email: req.body.email }, limit=1)
      .then(function(numItems) {
        console.log(numItems); // Use this to debug
        docCount = numItems;

        //If statement to check if the email already exists
        if( docCount == 0 ){
          //Mongodb Insert function
          db.collection('User').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('Item inserted'); //logs on console on successful insertion
      
            var transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              auth: {
                user: 'ses1bg32020@gmail.com',
                pass: 'HelloWorld'
              }
            });
            
            var mailOptions = {
              from: 'ses1bg32020@gmail.com',
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
    
            req.session.user = item;
            res.redirect('/home');
      
          });
        }
        else{
          signErrMsg = true;
          res.redirect('/signup');
        }

      })
    
    });

  });

});

// Edit User: queries user by first name and updates existing user values.  
router.post('/edit-user', function(req, res, next) {
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { email: req.session.user.email };
    var newvalues = { $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        iden_number: req.body.iden_number,
        contact_number: req.body.contact_number,
        faculty: req.body.faculty,
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

  //Redesign for bcrypt

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
        bcrypt.compare(req.body.password, user.password, function(err, response) {
          if(response && user.email == req.body.email) {
            // Passwords match
            console.log("Matched");
            req.session.user = user;
            console.log("First Name: " + user.first_name + " " + "User Email: " + user.email);
            errMsg = false;
            signErrMsg = false;
            res.redirect('/home');
            
          } else {
            // Passwords don't match
            errMsg = true;
            res.redirect('/login');
            console.log("Does not match");

          } 
        });
      }
      client.close();
    });

  });

});

router.get('/get-errMsg', function(req,res) {
  res.json(errMsg);
});

router.get('/get-signerrmsg', function(req,res) {
  res.json(signErrMsg);
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
    block = false;
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
  MongoClient.connect(url, function(err, client) {
    
    if (err) throw err;
    const db = client.db(dbName);

    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    function(err, result) {
      
      if (err) throw err;
      localUser = result;
      req.session.user = localUser;
      console.log("Changed to user " + req.session.user.first_name);
      client.close();
      //console.log(localUser);
      res.json(localUser);

    });
  });
});

router.post('/borrow', function(req,res,next){
  
  var dd = String(date_ob.getDate()).padStart(2, '0');
  var mm = String(date_ob.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date_ob.getFullYear();

  var borrDate = yyyy + '-' + mm + '-' + dd;

  var resDate = new Date(borrDate);
  var update = resDate.setDate(resDate.getDate() + 14);
  var nextDate = new Date(update);

  var ddd = String(nextDate.getDate()).padStart(2, '0');
  var dmm = String(nextDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var dyyyy = nextDate.getFullYear();

  dDate = dyyyy + '-' + dmm + '-' + ddd;

  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { email: req.session.user.email };
    var newvalues = { $push: { books: req.body.refnumber , fines: { resource: req.body.refnumber, borrowdate: borrDate , limit: 14, duedate: dDate} } };

    db.collection('User').updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  }); 
  res.redirect('/home');

});

var borrStat = false;
router.get('/borrow-status', function(req, res, next){
  MongoClient.connect(url, function(err, client) {
    
    if (err) throw err;
    const db = client.db(dbName);

    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    function(err, result) {
      
      if (err) throw err;
      localUser = result;
      resultArray = localUser.books;

      if(resultArray.length >= 5){
        borrStat = true;
      }
      else {
        borrStat = false;
      }

      client.close();
      console.log(borrStat);
      res.json(borrStat);

    
    });
  });
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

router.get('/get-user-fines', async function(req,res,next) {
  
  var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  var localUser;

  var resources = [];

  var userFine = [];
  
  var dd = String(date_ob.getDate()).padStart(2, '0');
  var mm = String(date_ob.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date_ob.getFullYear();

  var currDate = yyyy + '-' + mm + '-' + dd;
  
  var current = new Date(currDate);

  //var nextDate = new Date( Date.now() + 14 * 24 * 60 * 60 * 1000);

  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb

    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    async function(err, result) {
      
      if (err) throw err;
      localUser = result;
      resultArray = localUser.fines;

      
      for(var i = 0; i<resultArray.length; i++){ //

        var resDate = new Date(resultArray[i].borrowdate);
        var update = resDate.setDate(resDate.getDate() + 14);
        var diffTime = current - resDate;
        var diffDays = diffTime / (1000 * 3600 * 24); 

        if(diffDays > resultArray[i].limit) {
          
          console.log("Document Date: " + resDate);
          resources.push(resultArray[i].resource);
          block = true;

        }
      }

      var cursor = await db.collection('Resources').find({ refnumber: { $in : resources } });

      cursor.forEach(function(doc, err) {

        assert.equal(null, err);
        userFine.push(doc); //storing to local array

      }, function(){

        client.close(); //closing database
        res.json(userFine);

      });
    
    });
      
  });
  
});


router.get('/get-resources', async function(req,res,next) {
  
  var dues = [];
  var bookArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  var localUser;
  var resources = [];
    

  MongoClient.connect(url, function(err, client){ //Connecting to Mongodb

    assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
    
    const db = client.db(dbName);
    
    db.collection('User').findOne({ 
      email: req.session.user.email
    },
    async function(err, result) {
      
      if (err) throw err;
      localUser = result;
      dues = localUser.fines;
      bookArray = localUser.books;

      var cursor = db.collection('Resources').find({ refnumber: { $in : bookArray } });

      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resources.push(doc); //storing to local array
      }, async function(){
        for(var i=0; i<dues.length; i++){
          for(var j=0; j<resources.length; j++){
            if(dues[i].resource === resources[j].refnumber){
              resources[j].dueDate = dues[i].duedate;
            }
          }
        }
        client.close(); //closing database
        res.json(resources);
      });

    });

  });

});

router.get('/get-fine-status', async function(req,res,next) {
  res.json(block);
});

router.post('/edit-password', function(req,res,next){
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    const db = client.db(dbName);
    var myquery = { email: req.session.user.email };
    let hash = bcrypt.hashSync(req.body.confirm_password, 10);
    var newvalues = { $set: {
        password: hash
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


/* End Database Related Functions */

module.exports = router;










//To Do
/*
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
*/