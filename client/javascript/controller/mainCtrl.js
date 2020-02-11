app.controller("mainCtrl", ["$rootScope", "$http", function($rootScope, $http){
    $rootScope.texts = {
        "MO" : "Montag",
        "DI" : "Dienstag",
        "MI" : "Mittwoch",
        "DO" : "Donnerstag",
        "FR" : "Freitag",
        "SA" : "Samstag"
    };

}]);