var mongo = require("mongodb").MongoClient;

module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(data) {
      response.send("");
    }
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
      db.close();
    });
  }
}
