app.controller("sideMenuCtrl", ["$scope", "$http", function($scope, $http){
    $http({
        "methode" : "GET",
        "url" : "/api/availableDays"
    }).then(response => {
        $scope.availableDays = response.data;
    });


    $scope.menuOpen = false;

    $scope.openMenu = function(){
        $scope.menuOpen = true;
    }

    $scope.closeMenu = function(){
        $scope.menuOpen = false;
    }

    $scope.$on('$routeChangeStart', function() {
        $scope.menuOpen = false;
    });
}]);