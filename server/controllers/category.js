const TABLE = 'tecdb.categories';

const category = (server, dbConnection) => {
  // CRUD - Create Read Update Delete
  // Create
  server.post('/api/v1/categories', (req, res, next) => {
    const { name } = req.body;
    dbConnection.query(`INSERT INTO ${TABLE} (name) VALUES ('${name}');`, (err, rows, fields) => {
      if (err) throw err;
      res.statusMessage = "Sucesso";
      res.status(201); // OK
      res.json({ ok: true });
      next(false);
    });
  }); 
  // Read
  server.get('/api/v1/categories', (req, res, next) => {
    dbConnection.query(`SELECT * FROM ${TABLE};`, (err, rows, fields) => {
      if (err) throw err;
      res.statusMessage = "Sucesso";
      res.status(200); // OK
      res.json(rows);
      next(false);
    });
  });

  // Update
  server.put('/api/v1/categories/:catid', (req, res, next) => {
    if (req.params.catid) {
      const { catid } = req.params;
      const { name } = req.body;
      dbConnection.query(`UPDATE ${TABLE} SET name = '${name}' WHERE catid = ${catid}`, (err, rows, fields) => {
        if (err) throw err;
        res.statusMessage = "Sucesso";
        res.status(204); // No Content
        res.send();
        next(false);
      });
    } else {
      res.statusMessage = 'Ausência do ID da categoria';
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: 'Ausência do ID da categoria' });
      next(false);
    }
  }); 

  // Delete
  server.delete('/api/v1/categories/:catid', (req, res, next) => {
    if (req.params.catid) {
      const { catid } = req.params;
      dbConnection.query(`DELETE FROM ${TABLE} WHERE catid = ${catid}`, (err, rows, fields) => {
        if (err) throw err;
        res.statusMessage = "Sucesso";
        res.status(204); // No Content
        res.send();
        next(false);
      });
    } else {
      res.statusMessage = 'Ausência do ID da categoria';
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: 'Ausência do ID da categoria' });
      next();
    }
  });
}

module.exports = category;
