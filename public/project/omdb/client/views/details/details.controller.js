(function () {
    angular
        .module("OmdbApp")
        .controller("DetailsController", DetailsController);

    function DetailsController() {
        var vm = this;

        function init() {
            console.log("Details Controller");
        }
        init();
    }
})();
