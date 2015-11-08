(function(){
  angular.module('iplanApp')
    .controller('NewEventController', ['HttpService', 'DataService', '$window', '$location', '$route', '$routeParams', NewEventController])
    .directive('newEventDir', newEventDir);

    function NewEventController(HttpService, DataService, $window, $location, $route, $routeParams){
      var self = this;
      self.eventName; // tied to input box
      self.date; // tied to input box
      self.location; // tied to input box
      self.currentUser = DataService.currentUser;
      self.newEvent = DataService.newEvent;
      self.time;

      self.postEvent = function(){
          DataService.toggleEventForm();

          HttpService.postEvent({
            name: self.eventName,
            date: self.date,
            time: self.time,
            location: self.location
          })
          .then(function(response){
            DataService.setCurrentEvent(response.data);
            return response;
          })
          .then(function(response){
            HttpService.postEventUser({
              event_id: response.data.id,
              event_code: response.data.code,
              user_id: self.currentUser.id,
              email: self.currentUser.email,
              user_role: 'host'
            })
            .then(function(response){
              HttpService.getEvents(response.data.email)
              .then(function(evts){
                return DataService.setEvents(evts.data);
              })
              .catch(function(err){
                console.log(err);
              });
              $location.path('/events/' + response.data.event_code);
            });
          })
          .catch(function(err){
            console.log('error in posting event: ', err);
          });
          self.eventName = '';
          self.location = '';
          self.date = '';
          self.time = '';
      };
    }

    function newEventDir(){
      return {
        restrict: 'E',
        scope: true,
        templateUrl: '/newEvent/newEvent.html',
        replace: true,
        controller: 'NewEventController',
        controllerAs: 'newEvt',
        bindToController: true
      }
    }
})();
