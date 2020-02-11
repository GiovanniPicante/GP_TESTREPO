app.controller("timeTableCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
    let selectedDay = $routeParams.day;

    $http({
        "methode" : "GET",
        "url" : "/api/getDay?day=" + selectedDay
    }).then(response => {
        $scope.selectedDay = selectedDay;
        $scope.timeTable = response.data;
    });
}]);