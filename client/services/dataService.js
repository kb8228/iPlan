(function(){
  angular.module('iplanApp')
  .factory('DataService', function(){

    var currentEvent = {};
    var currentUser = {};
    var events = {};

    var setCurrentEvent = function(eventData){
      for(var key in eventData){
        currentEvent[key] = eventData[key];
      }
      console.log("this is the current event ", currentEvent);
      return currentEvent;
    };

    var getCurrentEvent = function(){
      return currentEvent;
    };

    var setCurrentUser = function(userData){
      for(var key in userData){
        currentUser[key] = userData[key];
      }
      return currentUser;
    };

    var getCurrentUser = function(){
      return currentUser;
    };

    var setEvents = function(evts){
      evts.forEach(function(evt, index){
        events[index] = evt;
      });
      console.log('setEvents fr DataService: ', events);
      return events;
    };

    return {
      currentEvent: currentEvent,
      currentUser: currentUser,
      events: events,
      setEvents: setEvents,
      setCurrentEvent: setCurrentEvent,
      getCurrentEvent: getCurrentEvent,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
  });
})();