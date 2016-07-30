(function () {
    angular
        .module("OmdbApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
                    }
                })
        }
    }
})();
