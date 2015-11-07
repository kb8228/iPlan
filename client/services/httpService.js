(function(){
  angular.module('iplanApp')
  .factory('HttpService', ['$http', function($http){

    var postEvent = function(eventData){
      return $http.post('/api/events', eventData);
    };

    var putEvent = function(eventData){
      return $http.put('/api/events/' + eventData.code,
        eventData)
    };

    var getEvent = function(eventCode){
      return $http.get('/api/events/' + eventCode);
    };

    var postUser = function(userData){
      return $http.post('/api/users', userData);
    };

    var putUser = function(userData){
      return $http.put('/api/users/' + userData.email,
        userData);
    };

    var getUser = function(email){
      return $http.get('/api/users/' + email);
    };

    var callYelp = function(options){
      // return results.businesses
      return $http.post('/api/yelp', options);
    };

    var postPlace = function(options){
      return $http.post('/api/places', options);
    };

    var deletePlace = function(id){
      return $http.delete('/api/places/' + id);
    };

    var deleteEvent = function(id){
      return $http.delete('/api/events/' + id);
    };

    var deleteEventsUsers = function(id){
      return $http.delete('/api/eventsusers/' + id);
    };

    var sendMail = function(options){
      return $http.post('/sendmail', options);
    };

    var postEventUser = function(options){
      return $http.post('/api/eventsusers', options);
    };

    var getEvents = function(options){
      return $http.get('/api/eventsusers/users/' + options);
    };

    var getUsers = function(evtCode){
      return $http.get('/api/eventsusers/events/' + evtCode);
    };

    return {
      postEvent: postEvent,
      putEvent: putEvent,
      getEvent: getEvent,
      postUser: postUser,
      getUser: getUser,
      putUser: putUser,
      callYelp: callYelp,
      postPlace: postPlace,
      sendMail: sendMail,
      postEventUser: postEventUser,
      getUsers: getUsers,
      getEvents: getEvents,
      deletePlace: deletePlace,
      deleteEvent: deleteEvent,
      deleteEventsUsers: deleteEventsUsers
    };
  }]);
})();
