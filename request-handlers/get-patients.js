var mongo = require("mongodb").MongoClient;

var failure = "Submission Failed (Invalid)";
module.exports = function(dbUrl) {
  return function(request, response) {
    var send = function(data) {
      response.send(data);
    }
    var body = request.body;

    try {
      body.monthsAtCurrentJob = Number(body.monthsAtCurrentJob);
      body.monthsSincePreviousJob = Number(body.monthsSincePreviousJob);
      body.isUnemployed = Boolean(body.isUnemployed);
      body.workUnchanged = Boolean(body.workUnchanged);
    } catch(err) {
      send(failure);
      return;
    }

    var token = body.token;
    mongo.connect(dbUrl, function(error, db) {
      var users = db.collection("users");

      var grabPatients = function(user) {
        if(!user.isPhysician) {
          send(failure);
        } else {
          var patientNames = user.patients;

          users.find({ "username": { $in: patientNames } }).toArray(function(error, docs) {
            response.send(JSON.stringify(docs));
          });
        }
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
          grabPatients(docs[0]);
          return;
        }
      });

    });
  }
}
