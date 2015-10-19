var db = require('../config');
var Promise = require('bluebird');

require('../models/event');

var Events = db.Collection.extend({
  model: db.model('Event');
}, {
  fetchByUser: function(userId){
    return db.collection('Events')
    .forge()
    .query(function(qb){
      qb.where('user_id', '=', userId);
    })
    .fetch();
  }
});

module.exports = db.collection('Events', Events);