angular.module('roboRumble').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', { templateUrl: '/partials/continue/main' })
				.otherwise({
					redirectTo: '/'
				});
}]);