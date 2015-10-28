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

    var callYelp = function(term, location, limit){
      // return results.businesses
    }

    var postPlace = function(placeData){
      return $http.post('/api/places', placeData);
    };

    return {
      postEvent: postEvent,
      getEvent: getEvent,
      postUser: postUser,
      getUser: getUser,
      callYelp: callYelp,
      postPlace: postPlace
    };
  }]);
})();
