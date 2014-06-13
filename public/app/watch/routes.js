angular.module('roboRumble').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', { templateUrl: '/partials/watch/main' })
		.when('/current/', { templateUrl: '/partials/watch/current' })
		.when('/archive/', { templateUrl: '/partials/watch/archive' })
		.otherwise({
			redirectTo: '/'
		});
}]);