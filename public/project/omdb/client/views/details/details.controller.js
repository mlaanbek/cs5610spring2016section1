(function () {
    angular
        .module("OmdbApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, OmdbService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function (response) {
                    vm.data = response.data;
                });
        }
        init();

        function favorite(imdbDB) {
            console.log(imdbID);
        }
    }
})();
