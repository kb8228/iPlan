var express = require('express');
var db = require('./config/database');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();

require('./models/event');
require('./models/place');
require('./models/user');
require('./collections/events');
require('./collections/places');

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

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
  })
});

app.post('/api/places', function(req, res, next){
  db.model('Place').newPlace(req.body).save()
  .then(function(place){
    res.json(place);
  })
});

app.post('/api/users', function(req, res, next){
  db.model('User').newUser(req.body).save()
  .then(function(user){
    res.json(user);
  })
})

app.listen(process.env.PORT || 3000);
console.log('Listening...');
