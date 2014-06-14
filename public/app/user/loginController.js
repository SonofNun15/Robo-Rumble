angular.module('roboRumble').controller('loginController', ['$scope', '$compile', 'loginService', function($scope, $compile, loginService) {
	$scope.loggedIn = false;
	$scope.loggingIn = false;
	$scope.processing = false;
	$scope.user = null;
	
	$scope.login = function(usingLoginPopup) {
		if (!$scope.loggingIn && usingLoginPopup) {
			$scope.loggingIn = true;
		} else if (!utils.isNullOrEmpty($scope.username) && !utils.isNullOrEmpty($scope.password)) {
			$scope.loggingIn = false;
			$scope.processing = true;
			loginService.login($scope.username, $scope.password).then(function() { // Handle login success
				$scope.loggedIn = true;
				$scope.user = loginService.loggedInUser;
			}).then(function() { // After login completes
				$scope.processing = false;
			});
		} else {
			$scope.loggingIn = false;
		}
	};
	
	$scope.logout = function() {
		$scope.processing = true;
		loginService.logout().then(function() {
			$scope.loggedIn = false;
			$scope.user = null;
		}).then(function() { // Pass or fail, run after completion
			$scope.processing = false;
		});
	};
}]);