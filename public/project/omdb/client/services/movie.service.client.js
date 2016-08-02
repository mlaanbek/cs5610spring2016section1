(function () {
    angular
        .module("OmdbApp")
        .factory("MovieService", MovieService);

    function MovieService() {
        var api = {
            setUserLikesMovie: setUserLikesMovie
        };
        return api;

        function setUserLikesMovie(userId, imdbId) {
            console.log([userId, imdbId]);
        }
    }
})();
