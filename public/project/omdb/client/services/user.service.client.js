(function () {
    angular
        .module("OmdbApp")
        .factory("UserService", UserService);

    // normally you would use $https but free version of openShift doesn't enable this
    // We use $rootScope to remember the user who has logged in (however, it's a temporary solution)
    function UserService($http, $rootScope) {
        var api =  {
            findUserByCredentials: findUserByCredentials,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        return api;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log($rootScope.currentUser);
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/login", credentials);
        }
    }
})();
