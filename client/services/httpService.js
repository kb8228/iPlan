(function(){
  angular.module('iplanApp')
  .factory('HttpService', ['$http', function($http){

    var postEvent = function(eventData){
      console.log('this is the httpservice postevent', eventData);
      return $http.post('/api/events', eventData);
    };
    var getEvent = function(eventId){
      return $http.get('/api/events/' + eventId);
    };
    var postUser = function(userData){
      return $http.post('/api/users', userData);
    };
    var getUser = function(userId){
      return $http.get('/api/users/' + userId);
    };

    var callYelp = function(options){
      // return results.businesses
      return $http.post('/api/yelp', options);
    };

    var postPlace = function(placeData){
      return $http.post('/api/places', placeData);
    };

    var sendMail = function(options){
      return $http.post('/sendmail', options);
    };

    var postGuest = function(data){
      return $http.post('/api/guests', data);
    };

    var getGuest = function(guestId){
      return $http.get('/api/guests/' + guestId);
    };

    var getCode = function(code){
      return $http.get('/api/code/' + code);
    };

    return {
      postEvent: postEvent,
      getEvent: getEvent,
      postUser: postUser,
      getUser: getUser,
      callYelp: callYelp,
      postPlace: postPlace,
      sendMail: sendMail,
      postGuest: postGuest,
      getGuest: getGuest,
      getCode; getCode
    };
  }]);
})();
