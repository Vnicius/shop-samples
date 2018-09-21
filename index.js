const express = require("express");
const app = express();
const port = process.env.port || 3000;
const mysql = require("mysql");

const API_ROOT = '/api/v1';

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});


// app.use(function(req, res, next) {
//   global.connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: " ",
//     database: "tecdb"
//   });
//   console.log("DB Connected!");
//   connection.connect();
//   next();
// });

app.use("/", express.static("public"));

app.get(`${API_ROOT}/categories`, (req, res, next) => {
  connection.query("SELECT * FROM tecdb.categories;", (err, rows, fields) => {
    if (err) throw err;
	res.json(rows);
	next();
  });
});

app.get(`${API_ROOT}/products`, (req, res, next) => {
  connection.query("SELECT * FROM tecdb.products;", (err, rows, fields) => {
	if (err) throw err;
	res.status(200)
	res.json(rows);
	next();
  });
});

app.get(`${API_ROOT}/products/:id`, (req, res, next) => {
  if (req.params.id) {
	  const { id } = req.params;
    connection.query(`SELECT * FROM tecdb.products WHERE pid = ${id};`, (err, rows, fields) => {
	  if (err) throw err;
	  res.status(200)
	  res.json(rows);
	  return next();
    });
  } else {
	  res.status(400);
	  next();
  }
});

app.listen(port, () => {
  console.log("Running...");
});
