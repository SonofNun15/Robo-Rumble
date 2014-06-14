angular.module('roboRumble').directive('phoneLogin', function() {
	return {
		restrict: 'E',
		templateUrl: '/partials/user/phoneLogin',
		controller: 'loginController',
	};
});