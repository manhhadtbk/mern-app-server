var express = require('express')
var bodyParser = require('body-parser') // nhan request tu user
var morgan = require('morgan') // log ra cac request den
var mongoose = require('mongoose')

var config = require('./config')

var setupController = require('./api/controllers/setupController')
var todoController = require('./api/controllers/todoController')

var app = express()

var port = process.env.PORT || 4000

app.use('/assets', express.static(__dirname + '/public'))
// cung cấp tài nguyên tĩnh cho user
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.set('view engine', 'ejs')

// db info
// console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString())

setupController(app)
todoController(app)

app.get('/', function (req, res) {
   res.render('index')

})

// app.get('/api/todos', function (req, res) {
//    res.render('index')
// })


app.listen(port, function () {
   console.log('App listening on port: ' + port);
})  