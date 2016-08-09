(function () {
    angular
        .module("OmdbApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams,
                               OmdbService,
                               $rootScope,
                               $location,
                               MovieService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID(imdbID)
                .then(function (response) {
                    vm.data = response.data;
                });
        }
        init();

        function favorite(movie) {
            if (currentUser) {
                // the client does not know that a model has changed (user has liked the movie and
                // it's been recorded in the database but the client is unaware of it.
                // To change the like star highlight we cach the changed state.
                // Next time the will have the from the database anyway.

                // the better approach however would be to add this into the promise. That way we assure
                // that movie will be liked only if the promise comes back successfully
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .setUserLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();
