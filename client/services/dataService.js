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

    var setUsers = function(users){
      users.forEach(function(user, index){
        users[index] = user;
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
      getCurrentEvent: getCurrentEvent,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
      setUsers: setUsers
    };
  });
})();