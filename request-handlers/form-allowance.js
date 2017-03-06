var mongo = require("mongodb").MongoClient;

var failure = { formTaken: true };
module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(data) {
      response.send(data);
    }
    var body = request.body;

    var token = body.token;
    mongo.connect(dbUrl, function(error, db) {
      var users = db.collection("users");

      var checkTiming = function(user) {
        var data = user.data;
        try {
          var latestTest = data[data.length - 1];
        } catch(ex) {
          console.log("0 Prior History");
          send({ formTaken: true });
          return; }
        var date = new Date();
        /*var testDate = Date.parse(Object.keys(data)[Object.keys(data).length - 1]);
        console.log(testDate);
        if(Math.abs(date.getTime() - testDate.getTime()) > 30000) {
          send({ formTaken: true });
          return;
        }*/
        response.send({ formTaken: false });
        db.close();
      }

      users.find({ "token": token }).toArray(function(error, docs) {
        if(docs.length === 0) {
          db.close();
          send(failure);
          return;
        } else if(docs.length > 1) {
          console.log("Duplicate user in database");
          db.close();
          send(failure);
          return;
        } else {
          checkTiming(docs[0]);
          return;
        }
      });

    });
  }
}
