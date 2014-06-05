angular.module('roboRumble', ['ngRoute']);

angular.module('roboRumble').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', { templateUrl: '/partials/main', controller: 'mainMenuController' });
}]);

angular.module('roboRumble').controller('mainMenuController', ['$scope', function($scope) {
	$scope.testVariable = "Main Menu Options!";
}]);