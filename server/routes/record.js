const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const Task = require("../models/taskModel");
 
// This will help us connect to the database
const dbo = require("../db/conn");
const { Router } = require("express");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

 
// This section will help you get a list of all the records.
recordRoutes.route("/tasks").get( async function (req, res) {
 try {
  let db_connect = await dbo.getDb("task-app");
  db_connect
   .collection("tasks")
   .find({})
   .toArray(function (err, result) {
    // result.forEach(element => {
    //   if(element.tasks) {
    //     element.tasks.forEach(el => {
    //         console.log(el);
    //     });
    // }
    // });
    
     return res.json(result);
   }); 
  } catch (err) {
    if (err) throw err;
  }
});
 
// This section will help you get a single record by id
recordRoutes.route("/tasks/:id").get(function (req, res) {
 let db_connect = dbo.getDb("task-app");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("tasks")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     //console.log(result)
     return res.json(result);
   });
});



// This section will help you create a new record.
recordRoutes.route("/tasks/add").post( function (req, response) {
 let db_connect = dbo.getDb("task-app");
 let myobj = {
   text: req.body.text,
   day: req.body.day,
   reminder: req.body.reminder,
 };

 db_connect.collection("tasks").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  console.log(req);
 let db_connect = dbo.getDb("task-app");
 let myquery = { _id: ObjectId(req.params.id) };
 console.log(myquery)
 let newvalues = {
   $set: {
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
   },
 };

 db_connect
   .collection("tasks")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/tasks/:id").delete(function(req, response) {
 let db_connect = dbo.getDb("task-app");
 let myobj = {
  text: req.body.text,
  day: req.body.day,
  reminder: req.body.reminder,
};

 let myquery = { _id: ObjectId(req.params.id) };
 console.log(myquery);
 db_connect.collection("tasks").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;