var app = angular.module('app', ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", ($routeProvider, $locationProvider) => {
    $locationProvider.hashPrefix("");

    $routeProvider
    .when("/examDates/", {
        controller : "examDatesCtrl",
        templateUrl : "/src/templates/examDates.html"
    })
    .when("/timeTable/:day", {
        controller : "timeTableCtrl",
        templateUrl : "/src/templates/timeTable.html"
    })
    .when("/timeTable", {
        redirectTo: "/timeTable/DI"
    })
    .otherwise({
        redirectTo: "/timeTable/DI"
    });
}]);