const TABLE = "tecdb.users";
const bcrypt = require("bcrypt");
const cookies = require('cookies')

const user = (server, dbConnection) => {
  // Create
  server.post("/api/v1/users", (req, res, next) => {
    const { login, password } = req.body;

    console.log(req.body);

    let pass = bcrypt.hashSync(password, 10);

    dbConnection.query(
      `INSERT INTO ${TABLE} (login, password) VALUES ("${login}", "${pass}");`,
      (err, rows, fields) => {
        if (err) {
          res.statusMessage = "Dados errados";
          res.status(400); // BAD REQUEST
          res.json({ ok: false, message: "Dados errados" });
          next();
        } else {
          res.statusMessage = "Sucesso";
          res.status(201); // OK
          res.json({ ok: true });
          next();
        }
      }
    );
  });

  // Read By Login
  server.get("/api/v1/users/login", (req, res, next) => {
    if (req.query.login) {
      const { login, password } = req.query;
      dbConnection.query(
        `SELECT * FROM ${TABLE} WHERE login = "${login}";`,
        
        (err, rows, fields) => {
           
          if (err) throw err;
          if (rows.length !== 0) {

            let data = rows[0];
            bcrypt.compareSync(password, data.password, (err, equals) => {
                
                if (equals) {
                  res.status(200);
                  res.json({login: data.login, uid: data.uid});
                  next();
                } else {
                  res.statusMessage = "Usuário ou Senha Incorretos";
                  res.status(400); // BAD REQUEST
                  res.json({ ok: false, message: "Usuario ou Senha Incorretos" });
                  next();
                }
              });
          }

        }
    
      );
    } else {
      res.statusMessage = "Usuario ou Senha Incorretos";
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: "Usuario ou Senha Incorretos" });
      next();
    }
  });

  // Delete
  server.delete("/api/v1/users/:uid", (req, res, next) => {
    if (req.params.uid) {
      const { uid } = req.params;
      dbConnection.query(
        `DELETE FROM ${TABLE} WHERE uid = ${uid}`,
        (err, rows, fields) => {
          if (err) throw err;
          res.statusMessage = "Sucesso";
          res.status(204); // No Content
          res.send();
          next();
        }
      );
    } else {
      res.statusMessage = "Ausência do ID do usuário";
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: "Ausência do ID do usuário" });
      next();
    }
  });
};

module.exports = user;
