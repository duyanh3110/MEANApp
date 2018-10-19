var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const router = express.Router();
const mongoose = require("mongoose");
const User = require('./model/user');
const jwt = require('jsonwebtoken');
var store = require("store");

var CONTACTS_COLLECTION = "contacts";
var USERS_COLLECTION = "users";
var BLOGS_COLLECTION = "blogs";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/blogs", function (req, res) {
  db.collection(BLOGS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get blog.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/blogs", function (req, res) {
  var newBlog = req.body;
  newBlog.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(BLOGS_COLLECTION).insertOne(newBlog, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new blog.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.post("/api/register", function(req, res) {
  var newUser = req.body;

  if (!req.body.email) {
    handleError(res, "Invalid user input", "Must provide a email.", 400);
  }
  else if (!req.body.password) {
    handleError(res, "Invalid user input", "Must provide a password.", 400);
       } else {
         db.collection(USERS_COLLECTION).insertOne(newUser, function(
           err,
           registerUser
         ) {
           if (err) {
             handleError(
               res,
               err.message,
               "Failed to create new contact."
             );
           } else {
             let payload = {subject: registerUser._id}
             let token = jwt.sign(payload, 'secertKey')
             res.status(201).json({token});
           }
         });
       }
});


app.post("/api/login", function (req, res) {
  var userData = req.body;

  if (!req.body.email) {
    handleError(res, "Invalid user input", "Must provide a email.", 400);
  }
  else if (!req.body.password) {
    handleError(res, "Invalid user input", "Must provide a password.", 400);
  } else {
    db.collection(USERS_COLLECTION).findOne({ email: userData.email }, function(
      err,
      user
    ) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        if (!user){
          res.status(401).send('invalid email');
        }
        else if(user.password !== userData.password ){
          res.status(401).send("invalid password");
        }else{
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(201).json({token});
        }

      }
    });
  }
});


/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/blogs/:id", function (req, res) {
  db.collection(BLOGS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get text");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/blogs/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BLOGS_COLLECTION).updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update text");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/blogs/:id", function (req, res) {
  db.collection(BLOGS_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete blog");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
