angular.module('iplanApp')
.factory('DataService', function(){

  var _currentEvent;
  var _currentUser;

  var setCurrentEvent = function(eventData){
    _currentEvent = eventData;
  };
  var getCurrentEvent = function(){
    return _currentEvent;
  };
  var setCurrentUser = function(userData){
    return $http.post('/api/users', userData);
  };
  var getCurrentUser = function(userId){
    return $http.get('/api/users/' + userId);
  };

  return {
    postEvent: postEvent,
    getEvent: getEvent,
    postUser: postUser,
    getUser: getUser
  };

});