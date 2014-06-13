angular.module('roboRumble', ['ngRoute']);

angular.module('roboRumble').controller('mainMenuController', ['$scope', function($scope) {
	$scope.testVariable = "Main Menu Options!";
}]);