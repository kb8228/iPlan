var db = require('../config/database');
var Promise = require('bluebird');

require('../models/eventUser');

var EventsUsers = db.Collection.extend({
  model: db.model('EventUser')
}, {
  fetchByUser: function(userId){
    return db.collection('EventsUsers')
    .forge()
    .query(function(qb){
      qb.where('user_id', '=', userId);
    })
    .fetch();
  },
  fetchByEvent: function(eventId){
    return db.collection('EventsUsers')
    .forge()
    .query(function(qb){
      qb.where('event_id', '=', eventId);
    })
    .fetch();
  }
});

module.exports = db.collection('EventsUsers', EventsUsers);
