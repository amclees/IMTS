angular.
  module("imts").
  config(["$locationProvider", "$routeProvider",
    function config($locationProvider, $routeProvider) {
      $routeProvider.
        when("/", {
          templateUrl: "/templates/homepage.template.html"
        }).
        when("/login", {
          templateUrl: "/templates/login.template.html",
          controller: "loginCtrl"
        }).
        when("/dashboard", {
          templateUrl: "/templates/dashboard.template.html",
          controller: "dashboardCtrl",
          resolve: {
            authed: function($location, $cookies, $http) {
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
          }
        }).
        otherwise({
          templateUrl: "/templates/404.template.html"
        });
    }
]);