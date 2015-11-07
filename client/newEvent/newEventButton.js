(function(){
  angular.module('iplanApp')
  .controller('NewEventButton', ['DataService', NewEventButton])
  .directive('newEventBtn', newEventBtn);

  function NewEventButton(DataService){
    var self = this;
    self.newEvent = DataService.newEvent;

    self.toggleEventForm = function(){
      DataService.toggleEventForm();
    };

  }

  function newEventBtn(){
    return {
      restrict: 'E',
      scope: true,
      templateUrl: '/newEvent/newEventButton.html',
      replace: true,
      controller: 'NewEventButton',
      controllerAs: 'newEvtBtn',
      bindToController: true
    }
  }

})();