const express = require('express')
var bodyParser = require('body-parser')
const app = express()

// Lembrar que /cssFiles foi added em index.html (retirar caso nao funfe!) 
// app.use(express.static('css'))
// app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname}))


app.use(express.static(__dirname));
app.get('/style.css', (req,res) => res.sendFile(__dirname + "/" + "styles.css"));

app.get('/product',(req,res) => res.send('<h1>PRODUTOS</h1>'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))