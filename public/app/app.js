angular.module('roboRumble', ['ngRoute', 'ui.bootstrap']);

angular.module('roboRumble').controller('mainMenuController', ['$scope', function($scope) {
	$scope.testVariable = "Main Menu Options!";
}]);