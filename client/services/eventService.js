// here we need to access current event, be able to set current event and to add a place to current event list
angular.module('iplanApp')
.factory('eventService', ['$http', function($http){

  var getCurrentEvent = function(){

  }
  var setCurrentEvent = function(){
    
  }

  return {
    getCurrentEvent: getCurrentEvent,
    setCurrentEvent: setCurrentEvent
  }

}]);