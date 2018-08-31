var http = require('http'),
    fs = require('fs');

const hostname = '127.0.0.1';
const port = 3005;

var resData;

const server = http.createServer((req, res) => {

    var url = req.url.match(new RegExp(/([^\?]+)\??.*/))[1];
    var id =
        console.log("REQUEST URL: " + req.url);

    function productRequest(error, data) {
        if (error) {
            res.writeHead(404, "Not Found");
        }

        resData = data;

        console.log("url proReq: " + url);

        switch (url) {
            case '/product/index.html':
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(resData);
                break;
            case '/product/css/styles.css':
                res.writeHead(200, { "Content-Type": "text/css" });
                res.write(resData);
                break;
            case '/product/js/scripts.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/css/styles.css':
                res.writeHead(200, { "Content-Type": "text/css" });
                res.write(resData);
                break;
            case '/data/products.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/cart.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/classes.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/formatMoney.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
        }
        res.end();
    }

    function callback(error, data) {

        if (error) {
            res.writeHead(404, "Not Found");
        }

        resData = data;


        console.log("url Callback: " + url);

        switch (url) {
            case '/index.html':
            case '/':
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(resData);
                break;
            case '/css/styles.css':
                res.writeHead(200, { "Content-Type": "text/css" });
                res.write(resData);
                break;
            case '/data/products.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/cart.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/classes.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/formatMoney.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
            case '/js/scripts.js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(resData);
                break;
        }
        res.end();
    }

    if (url === '/' || url === '/index.html') {
        fs.readFile('./index.html', callback);
    } else if (url === '/product/index.html') {
        fs.readFile('./product/index.html', productRequest);
    } else if (url.match(/(\/product\/)/)) {
        fs.readFile('.' + req.url, productRequest);
    }
    else {
        console.log("NEW REQ: " + req.url);
        fs.readFile('.' + req.url, callback);
    }

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});