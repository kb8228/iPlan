(function(){
  angular.module('iplanApp')
  .factory('DataService', function(){

    var currentEvent = {};
    var currentUser = {};
    var events = [];
    var users = [];

    var setCurrentEvent = function(eventData){
      for(var key in eventData){
        currentEvent[key] = eventData[key];
      }
      console.log("this is the current event ", currentEvent);
      return currentEvent;
    };

    var clearCurrentEvent = function(){
      for(var key in currentEvent){
        delete currentEvent[key];
      }
    }

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
      console.log('setEvents from DataService: ', events);
      return events;
    };

    var setUsers = function(evtUsers){
      users.forEach(function(user, index){
        delete users[index];
      });

      evtUsers.forEach(function(evtUser, index){
        users[index] = evtUser.user;
      });
      console.log('setUsers from DataService: ', users);
      return users;
    };

    return {
      currentEvent: currentEvent,
      currentUser: currentUser,
      events: events,
      users: users,
      setEvents: setEvents,
      setCurrentEvent: setCurrentEvent,
      clearCurrentEvent: clearCurrentEvent,
      getCurrentEvent: getCurrentEvent,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      setUsers: setUsers
    };
  });
})();