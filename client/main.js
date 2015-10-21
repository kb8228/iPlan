angular.module('iplanApp', ['ngRoute'])
.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
  })
  .when('/events/:event_id', {
    templateUrl: './eventView/eventView.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run();

angular.module('iplanApp')
.controller('MainController', ['HttpService', 'DataService', '$location', MainController]);

function MainController(HttpService, DataService, $location){
  var self = this;
  self.eventName; // bound to input box

  self.postEvent = function() {
    HttpService.postEvent({name: self.eventName}) 
    .then(function(response){
      DataService.setCurrentEvent(response.data);
      $location.path('/events/' + response.data.id);
      console.log('success response: ', response.data);
    })
    .catch(function(err){
      console.log('error in posting event: ', err);
    });
    self.eventName = '';
  };
}