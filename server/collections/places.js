var db = require('../config/database');
var Promise = require('bluebird');

require('../models/place');

var Places = db.Collection.extend({
  model: db.model('Place');
}, {
  fetchByEvent: function(eventId){
    return db.collection('Places')
    .forge()
    .query(function(qb){
      qb.where('event_id', '=', eventId);
    })
    .fetch();
  }
});

module.exports = db.collection('Places', Places);
