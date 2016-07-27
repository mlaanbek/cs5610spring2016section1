(function () {
    angular
        .module("OmdbApp")
        .factory("UserService", UserService);

    function UserService() {
        var api =  {
            findUserByCredentials: findUserByCredentials
        };

        return api;

        function findUserByCredentials(credentials) {
            console.log(credentials);
        }
    }
})();
