describe('Routing', function() {
  var $route;
  beforeEach(module('iplanApp'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }))

  it('should have an index and a template', function() {
    expect($route.routes['/'].templateUrl).toEqual('index.html');
  })

  it('should route to the event page', function() {
    expect($route.routes['/events/:code'].templateUrl).toEqual('index.html');
  })

  it('should redirect to the index when input an unknown path', function () {
    expect($route.routes[null].redirectTo).toEqual('/')
  })
})