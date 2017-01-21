app.controller('TwitterController', function($scope, $q, twitterService) {
    $scope.tweets = []; //array of tweets
    $scope.searchTerm = "#ratuvienny400show";
    twitterService.initialize();

    $scope.refreshHashTag = function(maxID) {
        if ($scope.searchTerm === '')
            return;

        twitterService.getHashTagSearch($scope.searchTerm, maxID).then(function(data) {
            $scope.tweets = $scope.tweets.concat(data.statuses);
            $scope.rateLimitError = false;
        }, function() {
            $scope.rateLimitError = true;
        });
    }

    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                $('#connectButton').fadeOut(function() {
                    $('#searchButton, #signOut').fadeIn();
                    $scope.refreshHashTag();
                    $scope.connectedTwitter = true;
                });
            } else {

            }
        });
    }

    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#searchButton, #signOut').fadeOut(function() {
            $('#connectButton').fadeIn();
            $scope.$apply(function() {
                $scope.connectedTwitter = false
            })
        });
    }

    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#searchButton, #signOut').show();
        $scope.connectedTwitter = true;
        $scope.refreshHashTag();
    }
});