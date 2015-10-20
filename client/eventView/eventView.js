angular.module('iplanApp')
.controller('EventViewController', EventViewController)
.directive('EventViewDir', EventViewDir);

EventViewController.inject = ['HttpService', 'EventService'];

function EventViewController(HttpService, EventService){ // inject http service, EventService factory
  var self = this;
  self.placeName; // tied to input box in eventView.html
  // self.event = EventService.currentEvent;
  // self.places = self.event.places; 

  self.postPlace = function(){} // tied to form in eventView.html
}

function EventViewDir(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/client/eventView/eventView.html',
    replace: true,
    controller: EventViewController,
    controllerAs: evtCtrl,
    bindToController: true
  }
}