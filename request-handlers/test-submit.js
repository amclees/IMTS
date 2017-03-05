var mongo = require("mongodb").MongoClient;

var failure = "Submission Failed";
module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(data) {
      response.send(data);
    }
    var body = request.body;
    var token = body.token;
    mongo.connect(dbUrl, function(error, db) {
      var users = db.collection("users");

      var addResponse = function(user) {
        var data = user.data;
        var date = new Date();
        data[date.toString()] = {
          // Questions and answers
        };
        users.update({ "token": token }, { $set: { "data": data } });
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
          addResponse(docs[0]);
          return;
        }
      });

    });
  }
}
