angular.module('iplanApp')
.controller('EventViewController', ['HttpService', 'DataService', '$location', '$route', '$routeParams', EventViewController])
.directive('eventViewDir', eventViewDir);

function EventViewController(HttpService, DataService, $location, $route, $routeParams){ // inject http service, EventService factory
  var self = this;
  self.toggle = false;
  self.placeName;   // tied to input box in eventView.html
  self.currentEvent = DataService.currentEvent;

  self.setEvent = function(){
    var evtId = $location.$$path.replace('/events/', '');
    HttpService.getEvent(evtId)
    .then(function(response){
      DataService.setCurrentEvent(response.data);
      return response.data;
    })
    .catch(function(err){
      console.log('err in evtCtrl setEvent: ', err);
    });
  }

  self.postPlace = function(){ // tied to form in eventView.html
    var evtId = $location.$$path.replace('/events/', '');
    HttpService.postPlace({name: self.placeName, event_id: evtId})
    .then(function(response){
      console.log('postPlace success response: ', response.data);
      self.setEvent();
    })
    .catch(function(err){
      console.log('error in posting place: ', err);
    });
    self.placeName = '';
  };

  self.upVote = function(place) {
    if(!place.toggle) {
      place.toggle = true;
      place.votes++;
      HttpService.postPlace(place);
      return;
    } else if (place.toggle){
      place.toggle = false;
      place.votes--;
      HttpService.postPlace(place);
      return;
    }
  }
  self.setEvent();
};

function eventViewDir(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/eventView/eventView.html',
    replace: true,
    controller: 'EventViewController',
    controllerAs: 'evtCtrl',
    bindToController: true
  }
}
