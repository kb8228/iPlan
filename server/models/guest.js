var db = require('../config/database');
var Promise = require('bluebird');

require('./event');

var Guest = db.Model.extend({
  tableName: 'guests',
  event: function(){
    return this.belongsTo('Event');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch();
  },
  newGuest: function(options){
    return new this(options);
  }
});

module.exports = db.model('Guest', Guest);
