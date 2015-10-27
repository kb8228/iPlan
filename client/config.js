(function(){
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
    .when('/events/:id', {
      // templateUrl: './eventView/eventView.html'
      templateUrl: 'index.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  })
  .run(function($rootScope, DataService, auth, store, jwtHelper, $location){
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
})();
