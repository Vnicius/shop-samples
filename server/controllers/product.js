const TABLE = 'tecdb.products';

const product = (server, dbConnection) => {

  // CRUD - Create Read Update Delete
  // Create
  server.post('/api/v1/products', (req, res, next) => {
    const {
      catid, name, price, description, url,
    } = req.body;
    dbConnection.query(`INSERT INTO ${TABLE} (catid, name, price, description, url) VALUES ('${catid}', '${name}', '${price}', '${description}',' ${url}');`, (err, rows, fields) => {
        if (err) throw err;
        res.statusMessage = "Sucesso";
        res.status(201); // OK
        res.json({ ok: true });
        next();
    });
  }); 

  // Read
  server.get('/api/v1/products', (req, res, next) => {
    dbConnection.query(`SELECT * FROM ${TABLE};`, (err, rows, fields) => {
      if (err) throw err;
      res.statusMessage = "Sucesso";
      res.status(200); // OK
      res.json(rows);
      next();
    });
  });

  // Read By ID
  server.get(`/api/v1/products/:pid`, (req, res, next) => {
    if (req.params.pid) {
      const { pid } = req.params;
      dbConnection.query(`SELECT * FROM ${TABLE} WHERE pid = ${pid};`, (err, rows, fields) => {
        if (err) throw err;
        res.status(200);
        res.json(rows);
        next();
      });
    } else {
      res.statusMessage = 'Ausência do ID do produto';
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: 'Ausência do ID do produto' });
      next();
    }
  });

  // Update
  server.put('/api/v1/products/:pid', (req, res, next) => {
    if (req.params.pid) {
      const { pid } = req.params;
      const {
        catid, name, price, description, url,
      } = req.body;
      dbConnection.query(`UPDATE ${TABLE} SET 
        catid = '${catid}',
        name = '${name}',
        price = '${price}',
        description = '${description}',
        url =' ${url}' 
        WHERE pid = ${pid}`, (err, rows, fields) => {
        if (err) throw err;
        res.statusMessage = "Sucesso";
        res.status(204); // No Content
        res.send();
        next();
      });
    } else {
      res.statusMessage = 'Ausência do ID do produto';
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: 'Ausência do ID do produto' });
      next();
    }
  }); 

  // Delete
  server.delete('/api/v1/products/:pid', (req, res, next) => {
    if (req.params.pid) {
      const { pid } = req.params;
      dbConnection.query(`DELETE FROM ${TABLE} WHERE pid = ${pid}`, (err, rows, fields) => {
        if (err) throw err;
        res.statusMessage = "Sucesso";
        res.status(204); // No Content
        res.send();
        next();
      });
    } else {
      res.statusMessage = 'Ausência do ID do produto';
      res.status(400); // BAD REQUEST
      res.json({ ok: false, message: 'Ausência do ID do produto' });
      next();
    }
  });
}

module.exports = product;
