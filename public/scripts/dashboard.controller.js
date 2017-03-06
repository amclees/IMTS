app.controller("dashboardCtrl", function($scope, $http, $cookies, $location, $rootScope) {
  console.log($cookies.token);

  $scope.username = $cookies.get("username");
  $scope.logout = function() {
      $cookies.remove("username");
      $cookies.remove("token");
      $cookies.remove("isPhysician");
      $location.url("/login");
  };

  $scope.patients = [];
  $http.post("/get-patients", { "token": $cookies.get("token") } ).success(function(data, status, headers, config) {
    $scope.patients = data;
    $rootScope.patients = data;
    console.log(data);
  });
});
