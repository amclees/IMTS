app.controller("dashboardCtrl", function($scope, $http, $cookies, $location) {
  console.log($cookies.token);

  $scope.username = $cookies.get("username");
  $scope.logout = function() {
      $cookies.remove("username");
      $cookies.remove("token");
      $location.url("/login");
  }
});
