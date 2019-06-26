const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
app.use(express.static('/public'));

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('public', path.join(__dirname, 'public'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  //.get('/home', (req, res) => res.render('pages/home'))
  .get('/home', (req, res) => res.render('home'))
  .get('/w', (req, res) => res.write("this works"), console.log("this works"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
