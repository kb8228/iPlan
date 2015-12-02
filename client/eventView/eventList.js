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
      .catch(function(err){
        console.error(err);
      })
      .then(function(evts){
        if(evts.data.length){
          DataService.setEvents(evts.data);
        }
      });
    }

    self.setCurrentEvent = function(evtCode){
      HttpService.getEvent(evtCode)
      .catch(function(err){
        console.error(err);
      })
      .then(function(evt){
        DataService.newEvent.status = false;
        DataService.setCurrentEvent(evt.data);
      })
      .then(function(){
        $location.path('/events/' + evtCode);
      });  

      HttpService.getUsers(evtCode)
      .catch(function(err){
        console.error(err);
      })
      .then(function(users){
        DataService.setUsers(users.data);
      });
    }

    self.clearCurrentEvent = function(){
      DataService.clearCurrentEvent();
      DataService.newEvent.status = false;
      $location.path('/');
    }

    var init = function(){
      var promises = [self.setEvents()];
      return $q.all(promises)
      .catch(function(err){
        console.error(err);
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
