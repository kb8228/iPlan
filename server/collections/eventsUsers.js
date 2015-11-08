var db = require('../config/database');
var Promise = require('bluebird');

require('../models/eventUser');

var EventsUsers = db.Collection.extend({
  model: db.model('EventUser')
}, {
  fetchByUser: function(userEmail){
    return db.collection('EventsUsers')
    .forge()
    .query(function(qb){
      qb.where('email', '=', userEmail);
    })
    .fetch({withRelated: 'event'});
  },
  fetchByEvent: function(eventCode){
    return db.collection('EventsUsers')
    .forge()
    .query(function(qb){
      qb.where('event_code', '=', eventCode);
    })
    .fetch({withRelated: 'user'});
  }
});

module.exports = db.collection('EventsUsers', EventsUsers);
