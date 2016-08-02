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
            getCurrentUser: getCurrentUser,
            createUser: createUser,
            logout: logout,
            getProfile: getProfile
        };
        return api;

        function getProfile() {
            return $http.get("/api/project/omdb/profile/" + $rootScope.currentUser._id);
        }

        function createUser(user) {
            return $http.post("/api/project/omdb/register", user);
        }

        function logout() {
            return $http.post("/api/project/omdb/logout");
        }

        function getCurrentUser() {
            return $http.get("/api/project/omdb/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/omdb/login", credentials);
        }
    }
})();
