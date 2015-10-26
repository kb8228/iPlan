angular.module('iplanApp')
.controller('MainController', ['HttpService', 'DataService', '$location', '$window', 'store', MainController]);

function MainController(HttpService, DataService, $location, $window, store){
  var self = this; // bound to input box
  self.currentEvent = DataService.currentEvent;
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

  self.postEvent = function(){
    if(store.get('profile')){
      HttpService.postEvent({name: self.eventName, user_id: self.userId})
      .then(function(response){
        DataService.setCurrentEvent(response.data);
        $location.path('/events/' + response.data.id);
        $window.location.reload();
        console.log('success response: ', response.data);
      })
      .catch(function(err){
        console.log('error in posting event: ', err);
      });
      self.eventName = '';
    }
  };

  self.getEvent = function(){
    console.log('fetching curr evt fr DataService: ', self.currentEvent);
    return self.currentEvent;
  }
}
