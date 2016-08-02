(function () {
    angular
        .module("OmdbApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            setUserLikesMovie: setUserLikesMovie
        };
        return api;

        function setUserLikesMovie(userId, movie) {
            return $http.post("/api/project/user/" + userId + "/movie/" + movie.imdbID, movie);
        }
    }
})();
