(function(){
  angular.module('iplanApp')
  .factory('HttpService', ['$http', function($http){

    var postEvent = function(eventData){
      console.log('this is the httpservice postevent', eventData);
      return $http.post('/api/events', eventData);
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

    return {
      postEvent: postEvent,
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
