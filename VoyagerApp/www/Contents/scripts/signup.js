scotchApp.controller('signupCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$compile', '$window','$location',
  function ($scope, $rootScope, $http, $routeParams, $compile, $window, $location) {
      $scope.names = ["Male", "Female", "Other"];
      $scope.insert = function (user) {           

          var data = '<p>firstName: ' + user.firstName + '<br>password: ' + user.password + '<br>Email: ' + user.mailid + '<br>gender: ' + user.gender + '</p>';
          document.getElementById("divDetails").innerHTML = data;
          $location.path('/Login');
      };

      // $scope.insert(user);
  }]);