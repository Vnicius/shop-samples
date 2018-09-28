const category = require('./category');
const product = require('./product');

function controllers(server, dbConnection) {
  server.get('/api', (req, res, next) => {
    res.send({
      name: 'Admin Panel Rest Server',
      version: 1,
      company: 'Zokla'
    });
    return next();
  })

  // Chamada dos controllers
  category(server, dbConnection);
  product(server, dbConnection);
}

module.exports = controllers;
