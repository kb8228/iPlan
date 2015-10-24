angular.module('iplanApp')
.controller('LoginController', ['$http', 'auth', 'store', '$location', LoginController]);

function LoginController($http, auth, store, $location) {
  var self = this;
  self.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
      // Error callback
    });
  };

  self.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };
}