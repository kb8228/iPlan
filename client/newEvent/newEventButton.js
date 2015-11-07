(function(){
  angular.module('iplanApp')
  .controller('NewEventButton', ['DataService', NewEventButton])
  .directive('newEventBtn', newEventBtn);

  function NewEventButton(DataService){
    var self = this;
    self.newEvent = DataService.newEvent;

    self.toggleEventForm = function(){
      return DataService.toggleEventForm();
    };

  }

  function newEventBtn(){
    return {
      restrict: 'E',
      // scope: {},
      templateUrl: '/newEvent/newEventButton.html',
      replace: true,
      controller: 'NewEventButton',
      controllerAs: 'newEvtBtn',
      bindToController: true
    }
  }

})();