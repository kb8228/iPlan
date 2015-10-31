(function(){
  angular.module('iplanApp')
  .controller('LoginController', ['$http', 'auth', 'store', '$location', 'DataService', 'HttpService', '$window', LoginController]);

  function LoginController($http, auth, store, $location, DataService, HttpService, $window) {
    var self = this;
    self.currentUser = DataService.currentUser;
    self.hasToken = false;
    self.getEvent = false;

    self.login = function () {
      console.log('login called');
      auth.signin({}, function (profile, token) {
        console.log('profile at login: ', profile);
        store.set('profile', profile);
        store.set('token', token);
        self.hasToken = true;
        // success callback
        HttpService.getUser(profile.email)
        .then(function(response){
          if(!response.data){
            var user = {
              facebook_id: profile.identities[0].user_id,
              name: profile.name,
              email: profile.email
            }
            console.log('new user obj fr login: ', user);
            return HttpService.postUser(user);
          }
          return response.data;
        })
        .then(function(user){
          return DataService.setCurrentUser(user);
        })
        .then(function(user){
          if(user.eventsUsers.length){
            $location.path('/events/' + self.currentUser.eventsUsers[0].event_code);
          }
          else{
            $location.path('/');
          }
          $window.location.reload();
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
        HttpService.getUser(profile.email)
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
