(function () {
    angular
        .module("OmdbApp")
        .controller("LoginController", LoginController);

    function LoginController() {
        var vm = this;

        vm.login = login;

        function init() {

        }
        init();

        function login(user) {
            console.log(user);
        }
    }
})();
