var db = require('../config/database');
var Promise = require('bluebird');

require('./event');
require('./user');

var EventUser = db.Model.extend({
  tableName: 'events_users',
  defaults: {
    voted: false
  },
  event: function(){
    return this.belongsTo('Event');
  },
  user: function(){
    return this.belongsTo('User');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch({withRelated: ['event', 'user']});
  },
  newEventsUsers: function(options){
    return new this(options);
  }
});

module.exports = db.model('EventUser', EventUser);
