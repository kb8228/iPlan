angular.module('iplanApp')
.controller('LoginController', ['$http', 'auth', 'store', '$location', 'DataService', 'HttpService', LoginController]);

function LoginController($http, auth, store, $location, DataService, HttpService) {
  var self = this;
  self.login = function () {
    auth.signin({}, function (profile, token) {
      // success callback
      DataService.setCurrentUser(profile);
      HttpService.postUser({
        facebook_id: profile.identities[0].user_id,
        name: profile.name,
        email: profile.email
      })
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