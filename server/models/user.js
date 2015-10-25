var db = require('../config/database');
var Promise = require('bluebird');

require('./event');

var User = db.Model.extend({
  tableName: 'users',
  events: function(){
    return this.hasMany('Event');
  }
}, {
  fetchById: function(options){
    //with related events
    return new this(options).fetch();
  },
  newUser: function(options){
    return new this(options);
  }
});

module.exports = db.model('User', User);
