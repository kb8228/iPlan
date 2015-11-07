(function(){
  angular.module('iplanApp')
  .controller('MainController', ['HttpService', 'DataService', '$location', '$window', 'store', 'ngAnimate', MainController]);

  function MainController(HttpService, DataService, $location, $window, store){
    var self = this;
    self.user;

    var profile = store.get('profile');

    if(profile){
      HttpService.getUser(profile.email)
      .then(function(response){
        self.user = response.data;
      })
      .catch(function(err){
        console.log('error in main controller ', err);
      });
    } else {
      console.log('Please Login!');
    }
  }
})();
