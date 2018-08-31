var http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3002;

var htmlFile;
var cssFile;
var productJS;
var cartJS;
var classesJS;
var formatJS;
var scriptsJS;

fs.readFile('./index.html', function(err, data) {
  if (err){
      throw err;
  }
  htmlFile = data;
});

fs.readFile('./css/styles.css', function(err, data) {
  if (err){
      throw err;
  }
  cssFile = data;
});

fs.readFile('./data/products.js', function(err, data) {
  if (err){
      throw err;
  }
  productJS = data;
});

fs.readFile('./js/cart.js', function(err, data) {
  if (err){
      throw err;
  }
  cartJS = data;
});

fs.readFile('./js/classes.js', function(err, data) {
  if (err){
      throw err;
  }
  classesJS = data;
});

fs.readFile('./js/formatMoney.js', function(err, data) {
    if (err){
        throw err;
    }
    formatJS = data;
});

fs.readFile('./js/scripts.js', function(err, data) {
  if (err){
      throw err;
  }
  scriptsJS = data;
});

const server = http.createServer((req, res) => {
     
    console.log("URL: " + req.url);
    switch(req.url){    
        case '/': 
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(htmlFile);
            break;
        case '/css/styles.css':
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(cssFile);
            break;
        case '/data/products.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(productJS);
            break;      
        case '/js/cart.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(cartJS);
            break;    
        case '/js/classes.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(classesJS);
            break;    
        case '/js/formatMoney.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(formatJS);
            break;    
        case '/js/scripts.js':
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(scriptsJS);
            break;
        default:
            res.writeHead(404, "Not Found");
}
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});