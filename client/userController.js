(function(){
  angular.module('iplanApp')
  .controller('UserController', ['auth', UserController])
  .directive('userViewDir', userViewDir);

  function UserController(auth) {
    var self = this;
    self.auth = auth;
  }

  function userViewDir(){
    return {
      restrict: 'E',
      // scope: {},
      templateUrl: '/userView.html',
      replace: true,
      controller: 'UserController',
      controllerAs: 'userCtrl',
      bindToController: true
    }
  }
})();
