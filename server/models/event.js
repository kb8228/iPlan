var db = require('../config/database');
var Promise = require('bluebird');
var crypto   = require('crypto');

require('./place');
require('./user');

var createSha = function(text) {
  var shasum = crypto.createHash('sha1');
  shasum.update(text);
  return shasum.digest('hex').slice(0, 10);
};

var Event = db.Model.extend({
  tableName: 'events',
  hasTimestamps: true,
  places: function(){
    return this.hasMany('Place');
  },
  guests: function(){
    return this.hasMany('Guest');
  },
  user: function(){
    return this.belongsTo(User, 'users_id');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch({withRelated: ['places', 'guests']});
  },
  newEvent: function(options){
    // options.code = createSha(options.name + options.id);
    return new this(options);
  }
});

module.exports = db.model('Event', Event);
