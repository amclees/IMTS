app.controller("testCtrl", function($scope, $http, $location, $cookies) {};
	$scope.submit = function() {
		var slider = $scope.slider.value;
		var q1 = $scope.q1;
		var answers = { "work": $scope.work, "time": $scope.time, "leave": $scope.leave, "past": $scope.past, "nwhy": nwhy, "nwork": nwork, "support": support, "token": $cookies.get("token")};
		$http.post("/test-submit", JSON.stringify(answers)).success(function(data, status, headers, config) {
			console.log(data);
		}).error(function(data, status, headers, config) {
			console.log(data)
		});
	};
});