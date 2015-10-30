var express = require('express');
var db = require('./config/database');
var yelp = require('./config/yelpSearch');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('SMTP', {
  auth: {
    user: 'testingiplan@gmail.com',
    pass: 'this is a test'
  }
});
var app = express();

require('./models/event');
require('./models/place');
require('./models/user');
require('./models/guest');
require('./collections/events');
require('./collections/places');
require('./collections/guests');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

// required for passport
app.use(session({
  secret: 'anysecretisok',
  resave: false,
  saveUninitialized: true
})); // session secret

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
  });
});

app.post('/api/places', function(req, res, next){
  db.model('Place').newPlace(req.body).save()
  .then(function(place){
    res.json(place);
  });
});

app.post('/api/users', function(req, res, next){
  db.model('User').newUser(req.body).save()
  .then(function(user){
    res.json(user);
  });
});

app.get('/api/users/:facebook_id', function(req, res, next){
  var userId = req.params.facebook_id;
  db.model('User').fetchById({facebook_id: userId})
  .then(function(user){
    res.json(user);
  });
});

app.get('/api/events/user/:userId', function(req, res, next){
  var userId = req.params.userId;
  db.collection('Events').fetchByUser(userId)
  .then(function(events){
    res.json(events);
  });
});

app.get('/api/code/:code', function(req, res, next){
  var code = req.params.code;
  db.model('Event').fetchById({code: code})
  .then(function(event){
    res.json(event);
  });
});

app.post('/api/guests', function(req, res, next){
  db.model('Guest').newGuest(req.body).save()
  .then(function(guest){
    res.json(guest);
  });
});

app.get('/api/guests/:id', function(req, res, next){
  var guestId = req.params.id;
  db.model('Guest').fetchById({id: guestId})
  .then(function(guest){
    res.json(guest);
  });
});

app.get('/api/guests/', function(req, res, next){
  var eventId = req.params.event_id;
  db.collection('Guests').fetchByEvent(eventId)
  .then(function(guests){
    res.json(guests);
  });
});

app.post('/sendmail', function(req, res, next){
  var data = req.body;
  console.log(req);
  transporter.sendMail({
    from: 'testingiplan@gmail.com',
    to: data.to,
    subject: 'You got an invite from iPlan!',
    text: data.message
  }, function(err){
    console.log(err);
  });
  res.json(data);
});

app.post('/api/yelp', function(req, res, next){
  yelp.search(req.body, function(error, data) {
    if(error){
      console.log('error in fetching yelp data: ', error);
    }
    res.json(data.businesses);
  });
});

app.listen(process.env.PORT || 3000);
console.log('Listening...');
