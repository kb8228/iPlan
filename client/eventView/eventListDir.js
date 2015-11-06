angular.module('iplanApp')
  .directive('eventViewDir', eventViewDir);

  function eventViewDir(){
    return {
      restrict: 'E',
      templateUrl: '/eventView/eventList.html',
      replace: true,

    }
  }