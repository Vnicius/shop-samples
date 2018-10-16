const TABLE = 'tecdb.users';

const user = (server, dbConnection) => {

    // Create
    server.post('/api/v1/users', (req, res, next) => {
        const {
            login, password
        } = req.body;
        dbConnection.query(`INSERT INTO ${TABLE} (login, password) VALUES ('${login}', '${password}');`, (err, rows, fields) => {
            if (err) throw err;
            res.statusMessage = "Sucesso";
            res.status(201); // OK
            res.json({ ok: true });
            next();
        });
    });

    // Read By Login
    server.get('/api/v1/users/:login', (req, res, next) => {
        if (req.params.login) {
          const { login } = req.params;
          dbConnection.query(`SELECT * FROM ${TABLE} WHERE login = ${login};`, (err, rows, fields) => {
            if (err) throw err;
            res.status(200);
            res.json(rows);
            next();
          });
        } else {
          res.statusMessage = 'Login não encontrado';
          res.status(400); // BAD REQUEST
          res.json({ ok: false, message: 'Login não encontrado' });
          next();
        }
    });


    // Delete
    server.delete('/api/v1/users/:uid', (req, res, next) => {
        if (req.params.uid) {
            const { uid } = req.params;
            dbConnection.query(`DELETE FROM ${TABLE} WHERE uid = ${uid}`, (err, rows, fields) => {
            if (err) throw err;
            res.statusMessage = "Sucesso";
            res.status(204); // No Content
            res.send();
            next();
            });
        } else {
            res.statusMessage = 'Ausência do ID do usuário';
            res.status(400); // BAD REQUEST
            res.json({ ok: false, message: 'Ausência do ID do usuário' });
            next();
        }
    });

}

module.exports = user;