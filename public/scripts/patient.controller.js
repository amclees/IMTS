app.controller("patientCtrl", function($scope, $rootScope, $routeParams) {
  $scope.patient = {};

  var makeGraph = function(patient) {
    var employmentData = { };
    new Chartist.Line('#chart1', {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: employmentData
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      }
    });
  }

  var urlName = $routeParams.name;
  console.log(urlName);
  $rootScope.patients.forEach(function(potentialPatient) {
    if(urlName == potentialPatient.username) {
      $scope.patient = potentialPatient;
    }
  });
  makeGraph($scope.patient);

});
