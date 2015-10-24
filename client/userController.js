angular.module('iplanApp')
.controller('UserController', ['auth', UserController]);

function UserController(auth) {
  var self = this;
  self.auth = auth;
}