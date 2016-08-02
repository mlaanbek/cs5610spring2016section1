(function () {
    angular
        .module("OmdbApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;

        function init() {
            UserService
                .getProfile();
        }
        return init();
    }
})();
