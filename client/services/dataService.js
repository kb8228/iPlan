angular.module('iplanApp')
.factory('DataService', function(){

  var _currentEvent;
  var _currentUser;

  var setCurrentEvent = function(eventData){
    _currentEvent = eventData;
    console.log("this is the current event ", _currentEvent);
  };
  var getCurrentEvent = function(){
    return _currentEvent;
  };
  var setCurrentUser = function(userData){
    _currentUser = userData;
  };
  var getCurrentUser = function(userId){
    return _currentUser;
  };

  return {
    setCurrentEvent: setCurrentEvent,
    getCurrentEvent: getCurrentEvent,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser
  };

});