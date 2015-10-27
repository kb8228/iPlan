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
      for(var key in userData){
        currentUser[key] = userData[key];
      }
      console.log('DataService setCurrentUser: ', currentUser);
    };
    var getCurrentUser = function(userId){
      return currentUser;
    };

    return {
      currentEvent: currentEvent,
      currentUser: currentUser,
      setCurrentEvent: setCurrentEvent,
      getCurrentEvent: getCurrentEvent,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
  });
})();