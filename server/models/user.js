var db = require('../config/database');
var Promise = require('bluebird');

require('./eventUser');

var User = db.Model.extend({
  tableName: 'users',
  eventsUsers: function(){
    return this.hasMany('EventUser');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch({withRelated: ['EventsUsers']});
  },
  newUser: function(options){
    return new this(options);
  }
});

module.exports = db.model('User', User);
