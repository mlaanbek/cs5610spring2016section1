(function () {
    angular
        .module("OmdbApp")
        .controller("SearchController", SearchController);

    function SearchController(OmdbService) {
        var vm = this;

        vm.search = search;

        function init() {

        }
        init();

        function search(movie) {
            OmdbService
                .searchMovieByTitle(movie.title)
                .then(function (response) {
                    vm.data = response.data;
                });
        }
    }
})();
