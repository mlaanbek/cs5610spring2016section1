(function () {
    angular
        .module("OmdbApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            setUserLikesMovie: setUserLikesMovie
        };
        return api;

        function setUserLikesMovie(userId, imdbId) {
            return $http.post("/api/project/user/" + userId + "/movie/" + imdbId);
        }
    }
})();
