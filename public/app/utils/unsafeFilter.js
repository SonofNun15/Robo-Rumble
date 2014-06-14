angular.module('roboRumble').filter('unsafe', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);