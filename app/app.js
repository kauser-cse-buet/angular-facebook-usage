'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'facebook'
]).
config(['$routeProvider', 'FacebookProvider', function($routeProvider, FacebookProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
  FacebookProvider.init('<token>');
}]);
