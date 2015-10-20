angular.module('iplanApp')
.service('HttpService', ['$http', function($http){
  this.postEvent = function(eventData){
    return $http.post('/api/events', eventData);
  };
  this.getEvent = function(eventId){
    return $http.get('/api/events/' + eventId);
  };
  this.postUser = function(userData){
    return $http.post('/api/users', userData);
  };
  this.getUser = function(userId){
    return $http.get('/api/users/' + userId);
  };
  this.postPlace = function(placeData){
    return $http.post('/api/places', placeData);
  };
}]);