'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'Facebook', function($scope, Facebook) {
    $scope.loginStatus = 'disconnected';
    $scope.facebookIsReady = false;
    $scope.user = null;
    $scope.login = function () {
      Facebook.login(function(response) {
        $scope.loginStatus = response.status;
      }, {scope: 'user_posts,publish_actions'});
    };
    
    $scope.removeAuth = function () {
        Facebook.api({
          method: 'Auth.revokeAuthorization'
        }, function(response) {
          Facebook.getLoginStatus(function(response) {
            $scope.loginStatus = response.status;
          });
        });
    };
    $scope.api = function () {
        Facebook.api('/me', function(response) {
          $scope.user = response;
        });
    };
    $scope.$watch(function() {
        return Facebook.isReady();
      }, function(newVal) {
        if (newVal) {
          $scope.facebookIsReady = true;
        }
      }
    );
    
    $scope.showUser = function showUser(){
      
      Facebook.api("/me/feed", function(response){
        $scope.feed = response.data.filter(filterByDate);
        if($scope.feed){         
          console.log('feed', $scope.feed);
        }
      });
    };
    
    $scope.postMessage = function postMessage(){
      $scope.feed.forEach(function(element) {
        console.log("message", element.message);
        console.log("name", element.from.name);
        Facebook.api("/" + element.id + "/comments", "POST", {
          "message": "Thanks"
        }, function postMessageResponse(response) {
          if(response && !response.error){
            console.log("response", response);
          }
        });
        
      }, this);
    };
    
    
    var startDateTime = "2015-05-01T0:00:00+6";
    var endDateTime = "2015-05-02T24:00:00+6";
    
    var filterByDate = function filterByDate(element, index, array){
       if(element.status_type == "wall_post" && element.created_time <= startDateTime && element.created_time <= endDateTime && !element.comments){
         return element;
       }
    };
    
    
}]);