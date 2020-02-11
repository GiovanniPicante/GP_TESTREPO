app.controller("examDatesCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams){
    $http({
        "methode" : "GET",
        "url" : "/api/getExams"
    }).then(response => {
        $scope.examDates = response.data;
    });
}]);