var db = require('../config/database');
var Promise = require('bluebird');

require('./event');

var Place = db.Model.extend({
  tableName: 'places',
  defaults: {
    votes: 0
  },
  event: function(){
    return this.belongsTo(Event, 'event_id');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch();
  },
  newPlace: function(options){
    return new this(options);
  }
});

module.exports = db.model('Place', Place);
