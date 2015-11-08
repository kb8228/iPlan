(function(){
  angular.module('iplanApp')
  .controller('LoginController', ['$http', 'auth', 'store', '$location', '$route', 'DataService', 'HttpService', '$window', LoginController]);

  function LoginController($http, auth, store, $location, $route, DataService, HttpService, $window) {
    var self = this;
    self.currentUser = DataService.currentUser;
    self.hasToken = false;

    self.login = function () {
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        self.hasToken = true;
        HttpService.getUser(profile.email)
        .then(function(response){
          if(!response.data){
            var user = {
              facebook_id: profile.identities[0].user_id,
              name: profile.name,
              email: profile.email,
              picture: profile.picture
            }
            return HttpService.postUser(user);
          }
          if(!response.data.facebook_id){
            var user = {
              facebook_id: profile.identities[0].user_id,
              name: profile.name,
              email: profile.email,
              picture: profile.picture
            }
            return HttpService.putUser(user);
          }
          return response.data;
        })
        .then(function(user){
          return DataService.setCurrentUser(user);
        })
        .then(function(user){
          $window.location.href = $window.location.href;
        })
        .catch(function(err){
          if(err){
            console.log('error: ', err);
          }
        });
      });

    };

    self.checkLogin = function(){
      var profile = store.get('profile');
      if(profile){
        self.hasToken = true;
        if(!self.currentUser.id){
          HttpService.getUser(profile.email)
          .then(function(response){
            DataService.setCurrentUser(response.data);
          })
          .then(function(user){
            console.log('eventsUsers fr checkLogin: ', self.currentUser.eventsUsers);
          });
        }
      }
    };

    self.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      self.hasToken = false;
      DataService.clearData();
      $location.path('/');
      $location.replace();
      $window.location.reload();
    };

    self.checkLogin();
  }
})();
