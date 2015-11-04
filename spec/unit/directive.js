describe('EventViewController', function() {

  var createController, scope, $location, $httpBackend;

  beforeEach(module('iplanApp'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    $location = $injector.get('$location');

    $httpBackend = $injector.get('$httpBackend');


    $httpBackend.when('GET', '/api/eventsusers/users/undefined')
      .respond();

    $httpBackend.when('GET', '/');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('EventViewController', {
        $scope: $scope,
        $location: $location,

      });
    };

  }));

  afterEach(function() {
    // This verifies that there are no unexpected requests
    // which means if you use it you have to set up expectations
    // for every request that will be made in each test
    $httpBackend.verifyNoOutstandingExpectation();

    // This verifies that there are no requests that haven't been flushed
    // before moving on to the next test. Ideally, you should flush
    // requests before any assertions are made based on the response.
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Initialization', function() {

    it('initializes all scope variables', function() {
      var controller = createController();
      $httpBackend.flush();
      expect(scope.events).to.exist;
    });

    it('should have a showPlace function', function() {
      var controller = createController();
      $httpBackend.flush();
      expect(scope.showPlace).to.be.a('function');
    });

    // it('should have a startNow function', function() {
    //   var controller = createController();
    //   $httpBackend.flush();
    //   expect(scope.startNow).to.be.a('function');
    // });

    // it('should have a changeState function', function() {
    //   var controller = createController();
    //   $httpBackend.flush();
    //   expect(scope.changeState).to.be.a('function');
    // });

    // it('should have a getArtists function', function() {
    //   var controller = createController();
    //   $httpBackend.flush();
    //   expect(scope.getArtists).to.be.a('function');
    // });

    // it('should have a search function', function() {
    //   var controller = createController();
    //   $httpBackend.flush();
    //   expect(scope.search).to.be.a('function');
    // });

    // it('should initialize variables to correct values', function() {
    //   var controller = createController();
    //   $httpBackend.flush();
    //   expect(scope.currentShow).to.be.a('boolean').and.equal(false);
    //   expect(scope.searchableArtists).to.be.a('array');
    //   expect(scope.searchableArtists.length).to.equal(3);
    // });

    // Sanity check
    // it('fails on purpose sometimes', function() {
    //   expect(scope.notARealThing).to.exist;
    // });
  });

  // describe('startNow & cancelShow', function() {
  //   // havent been able to get the post request in the callback of
  //   // geolocation.getLocation() to fire, not sure why yet
  //   // TODO: maybe need to inject geolocation and $location?

  //   it('startNow should set currentShow to true and define a cancelShow function', function() {
  //     var controller = createController();
  //     expect(scope.currentShow).to.equal(false);

  //     // $httpBackend.expectPOST('/shows/startNow').respond({});
  //     scope.startNow();
  //     $httpBackend.flush();
  //     expect(scope.currentShow).to.equal(true);
  //     expect(scope.cancelShow).to.exist;
  //     expect(scope.cancelShow).to.be.a('function');
  //   });

  //   it('cancelShow should set currentShow to false', function() {
  //     var controller = createController();
  //     scope.startNow();
  //     $httpBackend.flush();
  //     expect(scope.currentShow).to.equal(true);
  //     scope.cancelShow();
  //     expect(scope.currentShow).to.equal(false);
  //   });
  // });

  // // // Doesnt work yet, getting the following error
  // // // Error: Path '^.artists' not valid for state ''
  // // // TODO: Maybe should be injecting $state into controller?
  // // describe('changeState', function() {
  // //   it('should initialize loaded and isPaid to false and change states', function () {
  // //     var controller = createController();
  // //     $httpBackend.expectGET('views/artist.html');
  // //     scope.changeState('artists');
  // //     $httpBackend.flush();
  // //     expect(scope.loaded).to.exist;
  // //     expect(scope.isPaid).to.exist;
  // //     expect(scope.loaded).to.equal(false);
  // //     expect(scope.isPaid).to.equal(false);
  // //   });
  // // });

  // describe('getArtists', function() {
  //   it('should send a post to /artists', function() {
  //     var controller = createController();
  //     $httpBackend.flush();
  //     $httpBackend.expectGET('/artists').respond([{}]);
  //     scope.getArtists();
  //     $httpBackend.flush();
  //   });

  //   it('should put artists in searchableArtists', function() {
  //     var controller = createController();
  //     $httpBackend.flush();
  //     $httpBackend.expectGET('/artists').respond([{id: 4, name: 'kangaroos'}]);
  //     expect(scope.searchableArtists.length).to.equal(3);
  //     scope.getArtists();
  //     $httpBackend.flush();
  //     expect(scope.searchableArtists.length).to.equal(4);
  //   });
  // });

  // describe('search', function() {
  //   it('it should find a match', function() {
  //     var controller = createController();
  //     $httpBackend.flush();
  //     expect(scope.artist).to.not.exist;
  //     $httpBackend.expectGET('views/artist.html').respond({});
  //     scope.search('dogs');
  //     $httpBackend.flush();
  //     expect(scope.artist).to.exist;
  //     expect(scope.artist.name).to.equal('dogs');
  //   });
  // });

});