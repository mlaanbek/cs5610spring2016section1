(function () {
    angular
        .module("OmdbApp")
        .controller("NavigationController", NavigationController);

    function NavigationController($location) {

        // Reference to the current instance of the controller. We'll use it instead of using $scope.
        // The aim is to make it more clear what to what controller a variable binds to.
        // vm - view model
        var vm = this;

        // It's a good practice to encapsulate anything that's has to execute when the controller
        // is first initialized. Just to make it explicit.
        function init() {
            vm.$location = $location;
        }
        init();
    }
})();
