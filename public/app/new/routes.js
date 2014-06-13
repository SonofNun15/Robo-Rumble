angular.module('roboRumble').config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', { templateUrl: '/partials/gameDescriptions' })
				.when('/flag/', { templateUrl: '/partials/new/flag' })
				.when('/death/', { templateUrl: '/partials/new/death' })
				.when('/hill/', { templateUrl: '/partials/new/hill' })
				.when('/rugby/', { templateUrl: '/partials/new/rugby' })
				.when('/race/', { templateUrl: '/partials/new/race' })
				.otherwise({
					redirectTo: '/'
				});
}]);