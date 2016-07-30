(function () {
    angular
        .module("OmdbApp")
        .factory("OmdbService", OmdbService);
    
    function OmdbService() {
        var api = {
            searchMovieByTitle: searchMovieByTitle
        };
        return api;
        
        function searchMovieByTitle(title) {
            console.log(title);
        }
    }
})();
