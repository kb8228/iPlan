describe('EventViewController', function() {

  var createController, scope, $location, $httpBackend, $controller, ctrl;

  beforeEach(module('iplanApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $rootScope.$digest();
    scope = $rootScope.$new();
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.expectGET('/api/eventsusers/users/undefined')
      .respond({hello: 'world'});

    $httpBackend.expectGET('/')
      .respond({hello: 'world'});

    $httpBackend.whenGET('/api/eventsusers/users/undefined')
    $httpBackend.whenGET('/')

    ctrl = $controller('EventViewController', { 
      $scope: scope,
      $location: $location
    });

    // createController = function() {
    //   return $controller('EventViewController', {
    //     $scope: scope,
    //     $location: $location,
    //   });
    // };
  }));

  afterEach(function() {
    // $httpBackend.verifyNoOutstandingExpectation();
    // $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Initialization', function() {
    it('should have access to the scope', function() {
      expect(scope).toBeDefined();
    });

    it('initializes all scope variables', function() {
      expect(scope.events).to.exist;
    });

    it('should have a showPlace function', function() {
      // var controller = createController();
      console.log(scope.controller, ' scope')
      expect(typeof ctrl.showPlace).toBe('function');
    });

    it('should search yelp', function() {
      
    })

  });
});