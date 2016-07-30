(function () {
    angular
        .module("OmdbApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        console.log(imdbID);

        function init() {
            console.log("Details Controller");
        }
        init();
    }
})();
