(function(){
  angular.module('iplanApp')
  .factory('DataService', function(){

    var currentEvent = {};
    var currentUser = {};

    var setCurrentEvent = function(eventData){
      for(var key in eventData){
        currentEvent[key] = eventData[key];
      }
      console.log("this is the current event ", currentEvent);
    };
    var getCurrentEvent = function(){
      return currentEvent;
    };
    var setCurrentUser = function(userData){
      currentUser = userData;
    };
    var getCurrentUser = function(userId){
      return currentUser;
    };

    return {
      currentEvent: currentEvent,
      setCurrentEvent: setCurrentEvent,
      getCurrentEvent: getCurrentEvent,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
  });
})();