(function () {
    angular
        .module("OmdbApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user);
        }
    }
})();
