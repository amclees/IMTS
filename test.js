var express = require("express");
var app = express();

var mongo = require("mongodb").MongoClient;


var dbPort = 27017;
var dbHost = "localhost";
var dbName = "imts";
var dbUrl = "mongodb://" + dbHost + ":" + dbPort + "/" + dbName;

app.get("/", function (request, response) {
  //response.send("Hello World!");
  mongo.connect(dbUrl, function(error, db) {
    var stats = db.collection("stats");

    var handleViews = function(currentViews) {
      stats.update({ views: currentViews }, { $set: { views: currentViews + 1 } }, function(error, result) {
        db.close();
      });

      response.send(" Views: " + currentViews + 1);
    }

    stats.find({ views: { $exists: true } }).toArray(function(error, docs) {
      var views = -1;

      if(docs.length === 0) {
        stats.insert([{views: 0}], function(error, result) {
          handleViews(views);
        });
        views = 0;
      } else {
        views = docs[0].views;
        handleViews(views);
      }

    });


  });
})

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
})
