(function () {
    angular
        .module("OmdbApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService) {
        var vm = this;

        vm.login = login;

        function init() {

        }
        init();


        /*
        UserService.findUserByCredentials returns a promise that allows to register a function
        in the .then part.
         */
        function login(user) {
            if (!user) {
                return;
            }

            UserService
                .findUserByCredentials({
                    username: user.username,
                    password: user.password
                })
                .then(function (response) {
                    // if a user was found
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                    }
                });
        }
    }
})();
