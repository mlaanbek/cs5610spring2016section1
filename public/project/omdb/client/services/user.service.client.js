(function () {
    angular
        .module("OmdbApp")
        .factory("UserService", UserService);

    // normally you would use $https but free version of openShift doesn't enable this
    function UserService($http) {
        var api =  {
            findUserByCredentials: findUserByCredentials
        };

        return api;

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/user", credentials);
        }
    }
})();
