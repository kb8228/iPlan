angular.module('iplanApp', ['ngRoute', 'auth0', 'angular-storage', 'angular-jwt'])
.config(function(authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider){
  authProvider.init({
    domain: 'iplan.auth0.com',
    clientID: 'DIJQASF4ghKIEPsKoDVOLLDwg6gRYbhv'
  });

  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');

  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
  })
  .when('/events/:event_id', {
    templateUrl: './eventView/eventView.html',
    controller: 'EventViewController'
  })
  .when('auth/facebook', {
    templateUrl: 'index.html',
    redirect: false
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope, auth, store, jwtHelper, $location){
  auth.hookEvents();

  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});

angular.module('iplanApp')
.controller('MainController', ['HttpService', 'DataService', '$location', '$window', MainController]);

function MainController(HttpService, DataService, $location, $window){
  var self = this; // bound to input box
  self.currentEvent = DataService.currentEvent;

  self.postEvent = function(){
    HttpService.postEvent({name: self.eventName})
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
  };

  self.getEvent = function(){
    console.log('fetching curr evt fr DataService: ', self.currentEvent);
    return self.currentEvent;
  }
}
