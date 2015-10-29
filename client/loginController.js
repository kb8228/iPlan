(function(){
  angular.module('iplanApp')
  .controller('LoginController', ['$http', 'auth', 'store', '$location', 'DataService', 'HttpService', '$window', LoginController]);

  function LoginController($http, auth, store, $location, DataService, HttpService, $window) {
    var self = this;
    self.user = DataService.currentUser;
    self.hasToken = false;
    self.getEvent = false;

    self.login = function () {
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        self.hasToken = true;
        // success callback
        HttpService.getUser(profile.identities[0].user_id)
        .then(function(response){
          if(!response.data){
            console.log(response);
            var user = {
              facebook_id: profile.identities[0].user_id,
              name: profile.name,
              email: profile.email
            }
            return HttpService.postUser(user);
          }
          return response.data;
        })
        .then(function(user){
          DataService.setCurrentUser(user);
        })
        .catch(function(err){
          if(err){
            console.log('error: ', err);
          }
        });

        $location.path('/');
        $window.location.reload();
        // $window.setTimeout(function(){
        //   $window.location.reload();
        // }, 1000)
      });

    };

    self.checkLogin = function(){
      var profile = store.get('profile');
      if(profile){
        self.hasToken = true;
        HttpService.getUser(profile.identities[0].user_id)
        .then(function(response){
          DataService.setCurrentUser(response.data);
        });
      }
    };

    self.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      self.hasToken = false;
      $location.path('/');
      $window.location.reload();
    };

    self.showEvent = function() {
      if(!self.getEvent) {
        self.getEvent = true;
      } else {
        self.getEvent = false;
      }
    }

    self.checkLogin();
  }
})();
