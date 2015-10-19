var express = require('express');
var db = require('./config');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');

require('./models/event');
require('./models/place');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.listen(process.env.PORT || 3000);
console.log('Listening...');