var authFunction = function($location, $cookies, $http) {
  $http.post("/auth", { token: $cookies.get("token") })
  .success(function(data, status, headers, config) {
    if(!data.auth) {
      $location.url("/login");
      return;
    }
  })
  .error(function(data, status, headers, config) {
    console.log("Error during login request.");
    $location.url("/login");
    return;
  });
}

app.
  config(["$locationProvider", "$routeProvider",
    function config($locationProvider, $routeProvider) {
      $routeProvider.
        when("/", {
          templateUrl: "/templates/homepage.template.html"
        })
        .when("/patient/:name", {
          templateUrl: "/templates/patient.template.html",
          controller: "patientCtrl"
        })
        .when("/login", {
          templateUrl: "/templates/login.template.html",
          controller: "loginCtrl",
          resolve: {
            authed: function($location, $cookies, $http) {
              $http.post("/auth", { token: $cookies.get("token") })
                .success(function(data, status, headers, config) {
                  if(data.auth) {
                    $location.url("/dashboard");
                    return;
                  }
                })
                .error(function(data, status, headers, config) {
                  console.log("Error during auth request.");
                  $location.url("/login");
                  return;
                });
            }
          }
        }).
        when("/dashboard", {
          templateUrl: "/templates/dashboard.template.html",
          controller: "dashboardCtrl",
          resolve: {
            authed: authFunction,
            physician: function($location, $cookies) {
              try {
                var isPhysician = ($cookies.get("isPhysician") == "true");
              } catch(err) { console.log("Error parsing isPhysician to int"); }
              if(!isPhysician) {
                $location.url("/test");
              }
            }
          }
        }).
        when("/test", {
          templateUrl: "/templates/test.template.html",
          controller: "testCtrl",
          resolve: {
            authed: authFunction
          }
        }).
        otherwise({
          templateUrl: "/templates/404.template.html"
        });
    }
]);
