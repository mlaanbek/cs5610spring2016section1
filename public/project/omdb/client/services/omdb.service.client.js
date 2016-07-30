(function () {
    angular
        .module("OmdbApp")
        .factory("OmdbService", OmdbService);
    
    function OmdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle
        };
        return api;
        
        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s=" + title);
        }
    }
})();
