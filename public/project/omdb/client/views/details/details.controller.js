(function () {
    angular
        .module("OmdbApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, OmdbService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function (response) {
                    vm.data = response.data;
                });
        }
        init();
    }
})();
