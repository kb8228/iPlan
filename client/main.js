(function(){
  angular.module('iplanApp')
  .controller('MainController', ['HttpService', 'DataService', '$location', '$window', 'store', 'ngAnimate', MainController]);

    function MainController(HttpService, DataService, $location, $window, store){
      var self = this;
      // self.currentEvent = DataService.currentEvent;
      self.user;
      
      var profile = store.get('profile');

      if(profile){
        HttpService.getUser(profile.email)
        .then(function(response){
          self.user = response.data;
          console.log('user fr main: ', self.user);
        })
        .catch(function(err){
          console.log('error in main controller ', err);
        });
      } else {
        console.log('Please Login!');
      }

    // self.getEvent = function(){
    //   console.log('fetching curr evt fr DataService: ', self.currentEvent);
    //   return self.currentEvent;
    // }
  }
})();
