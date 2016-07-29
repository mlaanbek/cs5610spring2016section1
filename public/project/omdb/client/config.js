(function () {
    angular
        .module("OmdbApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"   // we want to scope the variables
            })
            .when("/register", {
                templateUrl: "views/register/register.view.html"
            })
            .when("/profile", {
                templateUrl: "views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",

                /*
                We want the checkLoggedIn be outside the controller, so
                we can use it where-ever we want.
                Resolve is a dependency - "this thing has to happen before I let you in this route (/profile).
                Check first that the "things" in the resolve are TRUE.
                 */
                resolve: {
                    // we want to make sure that this promise is resolved (fulfilled)
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/homr"
            });
    }

    /*
        Angular's promise API is available through a variable $q service.
        $q allows to create and manage promises.
     */
    function checkLoggedIn(UserService, $q, $location) {
        /*
            A promise that contains another promise (that is returned by getCurrentUser())
            Create an instance of defer object that contains a promise and then we can
            manage that promise either by resolving the promise (resolve()) or rejecting the
            promise (reject()).
         */
        var deferred = $q.defer();


        // This is an asyncronous call but we not going to wait for that but immeditaley return a promise.
        UserService
            .getCurrentUser()       // returns a promise

            // callback that is invoked when the response comes back
            // We only describe the success function but we can also add an error function (after ",")
            .then(function (response) {
                var currentUser = response.data;
                if (currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        /*
            Return the promise in that (deferred) object
          */
        return deferred.promise;
    }
})();