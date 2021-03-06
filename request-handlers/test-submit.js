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

      var addResponse = function(user) {
        var data = user.data;
        var date = new Date();
        data[date.toString()] = {
           "workType": body.answers.workType,
           "isUnemployed": body.answers.isUnemployed,
      		 "monthsAtCurrentJob": body.answers.monthsAtCurrentJob,
      		 "monthsSincePreviousJob": body.answers.monthsSincePreviousJob,
      		 "workUnchanged": body.answers.workUnchanged,
      		 "careerReason": body.answers.careerReason,
      		 "workExperience": body.answers.workExperience,
      	   "supportMethod": body.answers.supportMethod
        };
        users.update({ "token": token }, { $set: { "data": data } });
        response.send(JSON.stringify(data));
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
