(function () {
    angular
        .module("OmdbApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;

        function init() {
            var currentUser = UserService.getCurrentUser();
            if (currentUser == null) {
                $location.url("/home");
            }
        }
        return init();
    }
})();
