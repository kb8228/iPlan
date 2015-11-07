(function(){
  angular.module('iplanApp')
  .controller('EventListController', ['HttpService', 'DataService', '$location', '$timeout', '$route', '$routeParams', '$window', '$filter', '$interval', EventListController])
  .directive('eventList', eventList);

  function EventListController(HttpService, DataService, $location, $timeout){
    var self = this;
    self.currentUser = DataService.currentUser;
    self.events = DataService.events;
    self.currentEvent = DataService.currentEvent;

    self.setEvents = function(){
      HttpService.getEvents(self.currentUser.email)
      .then(function(evt){
        if(evt.data.length){
          DataService.setEvents(evt.data);
        }
      });
    }

    self.setCurrentEvent = function(evtCode){
      HttpService.getEvent(evtCode)
      .then(function(evt){
        DataService.setCurrentEvent(evt.data);
        HttpService.getUsers(evtCode)
        .then(function(evtUsers){
          DataService.setUsers(evtUsers.data);
        })
        .then(function(){
          $location.path('/events/' + evtCode);
        });
      });  
    }

    self.clearCurrentEvent = function(){
      $location.path('/');
      DataService.clearCurrentEvent();
    }

    self.setEvents();
  }

  function eventList(){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/eventView/eventList.html',
      replace: true,
      controller: 'EventListController',
      controllerAs: 'evtList',
      bindToController: true
    }
  }

})();