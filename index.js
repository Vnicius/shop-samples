const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const port = process.env.port || 3000;
const mysql = require("mysql");

const controllers = require('./controllers')

const API_ROOT = '/api/v1';

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

controllers(app, dbConnection);

app.use("/", express.static("public"));

app.listen(port, () => {
  console.log("Running...");
});
