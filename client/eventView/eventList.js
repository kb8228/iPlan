(function(){
  angular.module('iplanApp')
  .controller('EventListController', ['HttpService', 'DataService', '$location', '$q', EventListController])
  .directive('eventList', eventList);

  function EventListController(HttpService, DataService, $location, $q){
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

    function init(){
      var promises = [self.setEvents()];

      return $q.all(promises).then(function() {
        console.log('events set in eventList: ', self.events);
      });
    }

    init();
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