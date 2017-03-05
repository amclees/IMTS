var mongo = require("mongodb").MongoClient;
var crypto = require("crypto");
var invalidAuth = "";

module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(data) {
      response.send(JSON.stringify({
        "data": data
      }));
    }
    try {
      var username = request.body.username.trim().toLowerCase();
      var password = request.body.password.trim();
    } catch(err) {}
    if(username == "" || password == "") {
      send(invalidAuth);
      return;
    }
    var hash = crypto.createHash("sha256");
    hash.update(password);
    var passwordHash = hash.digest("hex");
    mongo.connect(dbUrl, function(error, db) {
      var users = db.collection("users");

      users.find({ "username": username, "passwordHash": passwordHash }).toArray(function(error, docs) {
        db.close();
        if(docs.length === 0) {
          send(invalidAuth);
          return;
        } else if(docs.length > 1) {
          console.log("Duplicate user in database");
          return;
        } else {
          hash = crypto.createHash("sha256");
          hash.update(username + password);
          send(hash.digest("hex"));
          return;
        }
      });
    });
  }
}
