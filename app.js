var express = require('express')
var app = express()
var fs = require("fs")

var bodyParser = require('body-parser')
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))
var jsonfile = require('jsonfile')
var file = 'tmp/data.json'
const port = 8082

//mysqlStuff
const mysql      = require('mysql')
const mysqlconfig = require('./mysqlconfig')
const pool = mysql.createPool({
  host     : mysqlconfig.host,
  user     : mysqlconfig.user,
  password : mysqlconfig.password,
  database : mysqlconfig.database
})

app.use('/', express.static(__dirname + '/views'))
app.listen(port, function() { console.log('listening on: ' + port) })

app.get('/file', function(req, res) {
  jsonfile.readFile(file, function(err, obj) {
    res.send(JSON.stringify(obj))
  })
})

app.get('/getRecipes', function(req, res) {
  var user_id = req.query.id
  console.log('resource requested')

  pool.getConnection(function(err, connection) {
    connection.query( 'SELECT * FROM recipe WHERE user_id = ' + connection.escape(user_id), function(err, rows) {
      connection.release()
      res.send(rows)
    })
  })
})

app.post('/addRecipe', function(req, res) {
  var ip = req.headers['x-forwarded-for'] ||req.connection.remoteAddress
  console.log(ip);
  console.log('request method: ' + req.method)
  console.log(req.body)

  pool.getConnection(function(err, connection) {
    var values = req.body.name
    var query = connection.query('INSERT INTO recipe(name, ingredients) VALUES(?, "na")', values , function(err, result) {
      console.log('worked woot!')
    })
    console.log(query.sql)
  })

  res.send('200 OK')
})
