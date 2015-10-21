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

app.get('/api/events', function(req, res){
  // here we will eventually fetch events by user
});

app.get('/api/events/:id', function(req, res, next){
  var eventId = req.params.id;
  db.model('Event').fetchById({id: eventId})
  .then(function(data){
    res.json(data.toJSON());
  });
});

app.post('/api/events', function(req, res, next){
  db.model('Event').newEvent(req.body).save()
  .then(function(evt){
    res.json(evt);
  })
});

app.post('/api/places', function(req, res, next){
  db.model('Place').newPlace(req.body).save()
  .then(function(place){
    res.json(place);
  })
});

app.listen(process.env.PORT || 3000);
console.log('Listening...');