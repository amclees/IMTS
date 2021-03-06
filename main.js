var express = require("express");
var mongo = require("mongodb").MongoClient;

var loginHandler = require("./request-handlers/login.js");
var authHandler = require("./request-handlers/auth.js");
var testSubmit = require("./request-handlers/test-submit.js");
var formAllowance = require("./request-handlers/form-allowance.js");
var getPatients = require("./request-handlers/get-patients.js");
var bodyParser = require('body-parser');
var app = express();

var dbPort = 27017;
var dbHost = "localhost";
var dbName = "imts";
var dbUrl = "mongodb://" + dbHost + ":" + dbPort + "/" + dbName;

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/login", loginHandler(dbUrl));
app.post("/auth", authHandler(dbUrl));
app.post("/test-submit", testSubmit(dbUrl));
app.post("/form-allowance", formAllowance(dbUrl));
app.post("/get-patients", getPatients(dbUrl));

var port = 3000;
app.listen(port, function () {
  console.log("Started IMTS listening on port " + port);
});
