angular.module('twitterApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;
    return {
        initialize: function(oauthKey) {
            OAuth.initialize(oauthKey, {
                cache: true
            })
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getHashTagSearch: function(search, maxID) {
            var deferred = $q.defer();
            var url = "/1.1/search/tweets.json?q=" + encodeURIComponent(search);
            if (maxID) {
              url += '&max_id=' + maxID;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
});