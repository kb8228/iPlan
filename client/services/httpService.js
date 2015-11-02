(function(){
  angular.module('iplanApp')
  .factory('HttpService', ['$http', function($http){

    var postEvent = function(eventData){
      console.log('this is the httpservice postevent', eventData);
      return $http.post('/api/events', eventData);
    };

    var putEvent = function(eventData){
      console.log('inside putevent', eventData)
      return $http.put('/api/events/' + eventData.code,
        {cutoff: eventData.cutoff})
    };

    var getEvent = function(eventCode){
      return $http.get('/api/events/' + eventCode);
    };

    var postUser = function(userData){
      return $http.post('/api/users', userData);
    };

    var getUser = function(email){
      return $http.get('/api/users/' + email);
    };

    var callYelp = function(options){
      // return results.businesses
      return $http.post('/api/yelp', options);
    };

    var postPlace = function(options){
      return $http.post('/api/places', options);
    };

    var sendMail = function(options){
      return $http.post('/sendmail', options);
    };

    var postEventUser = function(options){
      return $http.post('/api/eventsusers', options);
    };

    var getEventUsers = function(options){
      return $http.get('/api/eventsusers/users/' + options);
    }
    return {
      postEvent: postEvent,
      putEvent: putEvent,
      getEvent: getEvent,
      postUser: postUser,
      getUser: getUser,
      callYelp: callYelp,
      postPlace: postPlace,
      sendMail: sendMail,
      postEventUser: postEventUser
    };
  }]);
})();
