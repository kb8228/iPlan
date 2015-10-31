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
      self.time;

      self.postEvent = function(){
          HttpService.postEvent({
            name: self.eventName,
            date: self.date,
            time: self.time,
            location: self.location
          })
          .then(function(response){
            HttpService.postEventUser({
              event_id: response.data.id,
              user_id: self.currentUser.id,
              user_role: 'host'
            });
            DataService.setCurrentEvent(response.data);
            $location.path('/events/' + response.data.code);
            $window.location.reload();
            console.log('success response: ', response.data);
          })
          .catch(function(err){
            console.log('error in posting event: ', err);
          });
          self.eventName = '';
      };   
    }

    function newEventDir(){
      return {
        restrict: 'E',
        // scope: {},
        templateUrl: '/newEvent/newEvent.html',
        replace: true,
        controller: 'NewEventController',
        controllerAs: 'newEvt',
        bindToController: true
      }
    }
})();