var db = require('../config/database');
var Promise = require('bluebird');
var crypto   = require('crypto');

require('./place');
require('./eventUser');

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
  eventsUsers: function(){
    return this.hasMany('EventUser');
  }
}, {
  fetchById: function(options){
    return new this(options).fetch({withRelated: ['places', 'eventsUsers']});
  },
  newEvent: function(options){
    options.code = createSha(options.name + options.id);
    return new this(options);
  },
  deleteEvent: function(id){
    return new this({id: id}).fetch({
      withRelated:['places', 'eventsUsers']
    })
    .then(function (item) {
      return item.related('eventsUsers').invokeThen('destroy')
      .then(function () {
        return item.related('places').invokeThen('destroy')
        .then(function(){
          return item.destroy();
        })
      });
    });
  }

});

module.exports = db.model('Event', Event);
