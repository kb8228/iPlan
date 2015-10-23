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
    return new this(options).fetch({withRelated: ['events']});
  }
});

module.exports = db.model('User', User);
