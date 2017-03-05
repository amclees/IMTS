app.controller("dashboardCtrl", function($scope, $http, $cookies) {
  console.log($cookies.token);

  $scope.username = $cookies.get("username");
});
