angular.module('roboRumble').factory('loginService', ['$q', function($q) {
	var service = {
		login: function(user, password) {
			var deferred = $q.defer();

			service.isLoggedIn = true;
			service.loggedInUser = user;
			deferred.resolve();
			
			return deferred.promise;
		},
		
		logout: function() {
			var deferred = $q.defer();
			service.isLoggedIn = false;
			service.loggedInUser = null;
			deferred.resolve();
			
			return deferred.promise;
		},
		
		isLoggedIn: false,
		loggedInUser: null,
	};
	
	return service;
}]);