(function(){
  angular.module('iplanApp')
    .controller('NewEventController', ['HttpService', 'DataService', '$window', '$location', '$route', '$routeParams', NewEventController])
    .directive('newEventDir', newEventDir);

    function NewEventController(HttpService, DataService, $window, $location, $route, $routeParams){
      var self = this;
      self.eventName;
      self.currentUser = DataService.currentUser;
      self.postEvent = function(){
        // if(store.get('profile')){
          HttpService.postEvent({name: self.eventName, user_id: self.currentUser.id})
          .then(function(response){
            DataService.setCurrentEvent(response.data);
            $location.path('/events/' + response.data.id);
            console.log('success response: ', response.data);
          })
          .catch(function(err){
            console.log('error in posting event: ', err);
          });
          self.eventName = '';
        // }
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