var mongo = require("mongodb").MongoClient;

module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(auth) {
      response.send(JSON.stringify({
        "auth": auth
      }));
    };
    var token = request.body.token;
    mongo.connect(dbUrl, function(error, db) {
      var users = db.collection("users");

      users.find({ "token": token }).toArray(function(error, docs) {
        if(docs.length === 0) {
          send(false);
          return;
        } else if(docs.length > 1) {
          console.log("Duplicate user in database");
          send(false);
          return;
        } else {
          send(true);
          return;
        }
      });
    });
  };
};
