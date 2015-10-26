var db = require('../config/database');
var Promise = require('bluebird');

require('./place');
require('./user');

var Event = db.Model.extend({
  tableName: 'events',
  places: function(){
    return this.hasMany('Place');
  },
  user: function(){
    return this.belongsTo(User, 'users_id');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch({withRelated: ['places']});
  },
  newEvent: function(options){
    return new this(options);
  }
});

module.exports = db.model('Event', Event);