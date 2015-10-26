(function(){  
  angular.module('iplanApp')
  .controller('LoginController', ['$http', 'auth', 'store', '$location', 'DataService', 'HttpService', '$window', LoginController]);

  function LoginController($http, auth, store, $location, DataService, HttpService, $window) {
    var self = this;
    self.hasToken = false;

    self.login = function () {
      auth.signin({}, function (profile, token) {
        // success callback
        HttpService.getUser(profile.identities[0].user_id)
        .then(function(response){
          if(!response.data){
            console.log(response);
            HttpService.postUser({
              facebook_id: profile.identities[0].user_id,
              name: profile.name,
              email: profile.email
            })
            store.set('profile', profile);
            store.set('token', token);
          } else {
            store.set('profile', profile);
            store.set('token', token);
          }
        }).catch(function(err){
          if(err){
            console.log('error: ', err);
          }
        });

        $location.path('/');
        $window.setTimeout(function(){
          $window.location.reload();
        }, 1000)
      });

    };

    self.checkLogin = function(){
      if(store.get('profile')){
        self.hasToken = true;
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

    self.checkLogin();
  }
})();
