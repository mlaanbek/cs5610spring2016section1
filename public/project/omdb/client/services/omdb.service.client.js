(function () {
    angular
        .module("OmdbApp")
        .factory("OmdbService", OmdbService);
    
    function OmdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findMovieByImdbID(imdbID) {
            //return $http.get("http://www.omdbapi.com/?i=" + imdbID);

            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?i=" + imdbID + "&callback=JSON_CALLBACK");
        }
        
        function searchMovieByTitle(title) {
            //return $http.get("http://www.omdbapi.com/?s=" + title);

            // use JSONP since API does not support CORS
            return $http.jsonp("http://www.omdbapi.com/?s=" + title + "&callback=JSON_CALLBACK");

        }
    }
})();
