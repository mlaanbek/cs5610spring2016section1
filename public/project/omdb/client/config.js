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
                templateUrl: "views/login/login.view.html"
            })
            .otherwise({
                redirectTo: "/homr"
            });
    }
})();