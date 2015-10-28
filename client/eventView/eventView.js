(function(){
  angular.module('iplanApp')
  .controller('EventViewController', ['HttpService', 'DataService', '$http', '$location', '$route', '$routeParams', EventViewController])
  .directive('eventViewDir', eventViewDir);

  function EventViewController(HttpService, DataService, $http, $location, $route, $routeParams){ // inject http service, EventService factory
    var self = this;
    self.toggle = {};
    self.placeName;   // tied to input box in eventView.html
    self.choices = []; //
    self.currentEvent = DataService.currentEvent;
    console.log('currentEvent fr eventCtrl: ', self.currentEvent);

    self.setEvent = function(){
      var evtId = $location.path().replace('/events/', '');
      HttpService.getEvent(evtId)
      .then(function(response){
        console.log('setEvent success: ', response.data);
        DataService.setCurrentEvent(response.data);
        angular.forEach(response.data.places, function(val, key){
          self.toggle[val.id] = self.toggle[val.id] || false;
        });
        return response.data;
      })
      .catch(function(err){
        console.log('err in evtCtrl setEvent: ', err);
      });
    }

    self.searchYelp = function(){
      // var nameQuery = '?term=' + self.placeName.split(' ').join('+');
      // var locationQuery = '&location=' + self.currentEvent.location.split(' ').join('+');
      // var limit = '&limit=5';
      // HttpService.callYelp(nameQuery, locationQuery, limit)
      // .then(function(response){
      //   response.data.forEach(function(choice){
      //     self.choices.push(choice);
      //   });
      // })
      // .catch(function(err){console.log(err)});
    }

    //// REWORK TO PARSE YELP RESULTS
    // self.postPlace = function(){ // tied to form in eventView.html
    //   var evtId = $location.path().replace('/events/', '');
    //   HttpService.postPlace({name: self.placeName, event_id: evtId})
    //   .then(function(response){
    //     console.log('postPlace success response: ', response.data);
    //     self.setEvent();
    //   })
    //   .catch(function(err){
    //     console.log('error in posting place: ', err);
    //   });
    //   self.placeName = '';
    // };

    self.upVote = function(place) {
      if(!self.toggle[place.id]) {
        self.toggle[place.id] = true;
        place.votes++;
        HttpService.postPlace(place);
        return;
      } else if (self.toggle[place.id]){
        self.toggle[place.id] = false;
        place.votes--;
        HttpService.postPlace(place);
        return;
      }
      self.setEvent();
    }

    self.sendMail = function(){
      var newMail = {
        to: self.to,
        subject: 'You got an invite from iPlan',
        message: self.message
      };

      $http.post('/sendmail', newMail)
        .success(function(newMail, status, headers, config){
          console.log('this is new mail from eventview ', newMail);
          console.log('clicked');
        });
    self.message = ''
    self.to = ''
    };
    self.setEvent();
  };

  function eventViewDir(){
    return {
      restrict: 'E',
      // scope: {},
      templateUrl: '/eventView/eventView.html',
      replace: true,
      controller: 'EventViewController',
      controllerAs: 'evtCtrl',
      bindToController: true
    }
  }
})();
