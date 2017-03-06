app.controller("testCtrl", function($scope, $http, $location, $cookies) {
	$scope.formTaken = false;
	$http.post("/form-allowance", { "token": $cookies.get("token") })
	.success(function(data, status, headers, config) {
		$scope.formTaken = data.formTaken;
	})
	.error(function(data, status, headers, config) {
		$scope.formTaken = true;
	});

	$scope.submit = function() {
		var answers = { "workType": $scope.workType,
		 "isUnemployed": $scope.isUnemployed,
		 "monthsAtCurrentJob": $scope.monthsAtCurrentJob,
		 "monthsSincePreviousJob": $scope.monthsSincePreviousJob,
		 "workUnchanged": $scope.workUnchanged,
		 "careerReason": $scope.careerReason,
		 "workExperience": $scope.workExperience,
	   "supportMethod": $scope.supportMethod };
		var toSend = { "token": $cookies.get("token"), "answers": answers };
		$http.post("/test-submit", JSON.stringify(toSend)).success(function(data, status, headers, config) {
			console.log(data);
			$location.url("/dashboard");
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
	};

	$scope.logout = function() {
      $cookies.remove("username");
      $cookies.remove("token");
			$cookies.remove("isPhysician");
      $location.url("/login");
  }
});
