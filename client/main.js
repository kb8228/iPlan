angular.module('iplanApp', ['ngRoute'])
.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
  })
  .when('/events/:user_id', {
    templateUrl: 'event.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run();

angular.module('iplanApp')
.controller('MainController', MainController);

MainController.inject = ['$http'];

function MainController($http){
  var self = this;

  self.eventName; // bound to input box

  self.postEvent = function(evtName) {
    $http({
      method: 'POST',
      url: '/api/events',
      data: {
        name: self.eventName
      }
    })
    .then(function(response){
      window.location.pathname = '/events/' + response.data.id
      console.log('success response: ', response.data);
    })
    .catch(function(err){
      console.log('error in posting event: ', err);
    });
    self.eventName = '';
  };
}