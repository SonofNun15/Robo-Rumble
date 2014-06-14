angular.module('roboRumble').config(['$tooltipProvider', function($tooltipProvider) {
	$tooltipProvider.setTriggers({
		'mouseenter': 'mouseleave',
		'click': 'click',
		'focus': 'blur',
		'show': 'hide',
	});
}]);

angular.module('roboRumble').directive('popoverShow', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(attrs.popoverShow, function(newValue, oldValue) {
				if (newValue != oldValue) {
					if (newValue) {
						$timeout(function() {
							element.trigger('show');
						}, 0, false);
					} else {
						$timeout(function() {
							element.trigger('hide');
						}, 0, false);
					}
				}
			});
		},
	};
}]);