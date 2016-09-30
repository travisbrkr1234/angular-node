var express = require('express');
var app = express();
var fs = require("fs");

var jsonfile = require('jsonfile');
var file = 'tmp/data.json';
const port = 8082;

app.use('/', express.static(__dirname + '/views'));
app.listen(port, function() { console.log('listening on: ' + port); });


app.get('/file', function(req, res) {
  jsonfile.readFile(file, function(err, obj) {
    res.send(JSON.stringify(obj));
  });
});
