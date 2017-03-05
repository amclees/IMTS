app.controller("testCtrl", function($scope, $http, $location) {
	$scope.slider = {
	  	value: 50,
	 	options: {
	    	floor: 0,
	    	ceil: 100
  		}
	};
	$scope.submit = function() {
		var slider = $scope.slider.value;
		var q1 = $scope.q1;
		var answers = { "slider": slider, "q1": q1 };
		$http.post("/test-submit", JSON.stringify(answers)).success(function(data, status, headers, config) {
			console.log(data);
		}).error(function(data, status, headers, config) {
			console.log(data)
		});
	};
});