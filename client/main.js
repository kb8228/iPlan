(function(){
  angular.module('iplanApp')
  .controller('MainController', ['HttpService', 'DataService', '$location', '$window', 'store', 'ngAnimate', MainController]);

    function MainController(HttpService, DataService, $location, $window, store){
      var self = this;
      // self.currentEvent = DataService.currentEvent;
      self.userId;

      var profile = store.get('profile');

      if(profile){
        HttpService.getUser(profile.identities[0].user_id)
        .then(function(response){
          self.userId = response.data.id;
          console.log(self.userId);
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
