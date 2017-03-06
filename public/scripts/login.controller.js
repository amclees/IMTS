app.controller("loginCtrl", function($scope, $http, $location, $cookies) {
  $scope.response = "No Response Yet";
  $scope.wrongLogin = false;

  $scope.submit = function() {
    if(!$scope.username || !$scope.password) return;
    var username = $scope.username.trim();
    var password = $scope.password.trim();
    if(username == "" || password == "") {
      return;
    }

    var loginInfo = { "username": username, "password": password };
    var loginParameter = JSON.stringify(loginInfo);
    $http.post("/login", loginParameter)
      .success(function(data, status, headers, config) {
        if(data.data === "") {
          $scope.wrongLogin = true;
          return;
        }
        $cookies.put("token", data.data);
        $cookies.put("username", username);
        $cookies.put("isPhysician", data.isPhysician);
        console.log($cookies.token);
        $location.path("/dashboard");
      })
      .error(function(data, status, headers, config) {
        console.log("Error during login request.");
      });
  }
});
