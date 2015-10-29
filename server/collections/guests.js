var db = require('../config/database');
var Promise = require('bluebird');

require('../models/guest');

var Guests = db.Collection.extend({
  model: db.model('Guest')
}, {
  fetchByEvent: function(evtId){
    return db.collection('Guests')
    .forge()
    .query(function(qb){
      qb.where('event_id', '=', evtId);
    })
    .fetch();
  }
});

module.exports = db.collection('Guests', Guests);
