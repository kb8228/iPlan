angular.module('iplanApp')
.controller('EventViewController', EventViewController)
.directive('eventViewDir', eventViewDir);

EventViewController.inject = ['HttpService'];

function EventViewController(HttpService){ // inject http service, EventService factory
  var self = this;
  self.placeName;   // tied to input box in eventView.html
  // self.event = EventService.currentEvent;
  // self.places = self.event.places;
  self.places = [];

  self.postPlace = function(){ // tied to form in eventView.html
    HttpService.postPlace({name: self.placeName})
    .then(function(response){
      console.log('postPlace success response: ', response.data);
      self.places.push(response.data);
    })
    .catch(function(err){
      console.log('error in posting place: ', err);
    });
    self.placeName = '';
  };
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
