// describe('Controller: LoginController', function () {
//   var $scope, $rootScope, $httpBackend, createController;

//   beforeEach(function() {
//       angular.module('auth0', []);
//       angular.module('angular-storage', []);
//       angular.module('angular-jwt', []);

//       module(function($provide) {

//           var jwtInterceptor,
//               store,
//               jwtHelper;

//           jwtInterceptor = jasmine.createSpy();
//           store = jasmine.createSpy();
//           jwtHelper = jasmine.createSpy();


//           $provide.value('jwtInterceptor', jwtInterceptor);
//           $provide.value('store', store);
//           $provide.value('jwtHelper', jwtHelper);

//           $provide.provider('auth', function() {
//               this.init = jasmine.createSpy();
//               this.on = jasmine.createSpy();

//               this.$get = function() {
//                   return {
//                       signin: jasmine.createSpy(),
//                       signout: jasmine.createSpy(),
//                       hookEvents: jasmine.createSpy()
//                   }
//               };
//           });
//       });
//   });

//   beforeEach(module('iplanApp'));

//   beforeEach(inject(function($injector) {

//     //Mock dependencies
//     $rootScope = $injector.get('$rootScope');
//     $httpBackend = $injector.get('$httpBackend');
//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');
//     var $auth = $injector.get('auth');

//     //Create mock controller
//     createController = function () {
//       return $controller('EventViewController', {
//         $scope: $scope,
//         //store's get function will not contain anything in a standalone controller
//         //therefore we create a mock that returns what we need for testing
//         store: {
//           get: function(){
//             return 1;
//            }
//         }
//       });
//     };
//   }));



//     it('should have logout function ', function () {
//       expect(typeof(scope.logout)).toEqual('function');
//     });

//     it('should have login function', function() {
//       expect(typeof(scope.login)).toEqual('function');
//     });

//     it('should define isAuthenticated to initially be false', function() {
//       expect(scope.isAuthenticated).toBeFalsy();
//     });

//     it('should call auth.signout on logout', function() {
//       scope.logout();
//       expect(auth.signout).toHaveBeenCalled();
//     });

//     it('should call auth.signin on login', function() {
//       scope.login();
//       expect(auth.signin).toHaveBeenCalled();
//     });

//     it('should define isAuthenticated to true on event auth0.loginSuccess', function() {
//        scope.isAuthenticated = false;
//        rootScope.$broadcast('auth0.loginSuccess',[]);
//        expect(scope.isAuthenticated).toBeTruthy();
//     });

//     it('should define isAuthenticated to true on event auth0.authenticated', function() {
//        scope.isAuthenticated = false;
//        rootScope.$broadcast('auth0.authenticated', []);
//        expect(scope.isAuthenticated).toBeTruthy();
//     });

//     it('should define isAuthenticated to false on event auth0.logout', function() {
//        scope.isAuthenticated = true;
//        rootScope.$broadcast('auth0.logout', []);
//        expect(scope.isAuthenticated).toBeFalsy();
//     });

//     it('should defined isAuthenticated to false on event auth0.loginFailure', function() {
//        scope.isAuthenticated = true;
//        rootScope.$broadcast('auth0.loginFailure', []);
//        expect(scope.isAuthenticated).toBeFalsy();
//     });

// });