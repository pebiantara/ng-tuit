angular.module('ng-tuit', ['twitterApp.services']).directive('tuit', [function() {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			scope.oauthPublicKey = attrs.oauthPublicKey;
			scope.hashtagDefault = attrs.hashtagDefault;
		}
	}
}]);