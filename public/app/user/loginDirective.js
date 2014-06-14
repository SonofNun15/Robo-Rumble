angular.module('roboRumble').directive('login', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/user/login',
		controller: 'loginController',
	};
});