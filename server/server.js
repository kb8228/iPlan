var express = require('express');
var db = require('./config/database');
var yelp = require('./config/yelpSearch');
var http = require('http');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var session = require('express-session');
var nodemailer = require('nodemailer');
var _ = require('underscore')
var hogan = require('hogan');
var fs = require('fs');
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
require('./models/eventUser');
require('./collections/events');
require('./collections/places');
require('./collections/eventsUsers');

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

app.post('/api/events', function(req, res, next){
  db.model('Event').newEvent(req.body).save()
  .then(function(evt){
    res.json(evt);
  });
});

app.delete('/api/events/:id', function(req, res, next){
  var eventId = req.params.id;
  db.model('Event').deleteEvent(eventId)
  .then(function(response){
    res.sendStatus(200);
  });
});

app.delete('/api/places/:id', function(req, res, next){
  var placeId = req.params.id;
  db.model('Place').deletePlace(placeId)
  .then(function(response){
    res.sendStatus(200);
  });
});

// app.delete('/api/eventsusers/:id', function(req, res, next){
//   var eventId = req.params.id;
//   db.model('EventUser').fetchById({event_id: eventId})
//   .then(function(evt){
//     evt.destroy();
//     res.json({string: "cheese"});
//   });
// });

app.put('/api/events/:code', function(req, res, next){
  var code = req.params.code;
  var saveTime = req.body;
  db.model('Event').fetchById({code: code})
  .then(function(data){
    data.save(saveTime)
  })
})

app.get('/api/events/:code', function(req, res, next){
  var code = req.params.code;
  db.model('Event').fetchById({code: code})
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

app.put('/api/users/:email', function(req, res, next){
  var email = req.params.email;
  var userData = req.body;
  db.model('User').fetchById({email: email})
  .then(function(data){
    data.save(userData);
  });
});

app.post('/api/eventsusers', function(req, res, next){
  db.model('EventUser').newEventUser(req.body).save()
  .then(function(evtUser){
    res.json(evtUser);
  });
});

app.get('/api/eventsusers/users/:userEmail', function(req, res, next){
  var email = req.params.userEmail;
  db.collection('EventsUsers').fetchByUser(email)
  .then(function(eventsUsers){
    res.json(eventsUsers);
  });
});

app.get('/api/eventsusers/events/:event_code', function(req, res, next){
  var eventCode = req.params.event_code;
  db.collection('EventsUsers').fetchByEvent(eventCode)
  .then(function(eventsUsers){
    res.json(eventsUsers);
  });
});

app.get('/api/users/:email', function(req, res, next){
  var userEmail = req.params.email;
  db.model('User').fetchById({email: userEmail})
  .then(function(user){
    res.json(user);
  });
});

app.post('/sendmail', function(req, res, next){
  var data = req.body;
  var template = fs.readFileSync(__dirname + '/email.hjs', 'utf-8');
  var compiledTemplate = hogan.compile(template);

  transporter.sendMail({
    from: 'noreply@iplan.com',
    to: data.to,
    subject: data.subject,
    html: compiledTemplate.render({name: data.name})
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
