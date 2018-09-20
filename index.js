const express = require("express");
const app = express();
const port = process.env.port || 3000;
const db = require('./database');

db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

// db.query("INSERT INTO tecdb.categories (name) VALUES ('Livros');", function(err, rows, fields) {
//   if (err) throw err;
// });

// db.query("SELECT * FROM tecdb.categories;", (err, rows, fields) => {
//   if (err) throw err;
//   rows.forEach(element => {
//     console.log(element)
//   });
// });

app.use("/", express.static("public"));

app.listen(port, () => {
  console.log("Running...");
});
