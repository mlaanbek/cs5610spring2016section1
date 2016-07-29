(function () {
    angular
        .module("OmdbApp")
        .controller("RegisterController", RegisterController);

    function RegisterController() {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            console.log(user);
        }
    }
})();
