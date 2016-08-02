module.exports = function (app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function userLikesMovie(req, res) {
        var userId = req.params.userId;
        var imdbId = req.params.imdbID;

        var movie = movieModel.findMovieByImdbID(imdbId);
        if (!movie) {
            movie = movieModel.createMovie(imdbId);
        }

        // if a movie does not have any likes
        if (!movie.likes) {
            movie.likes = [];
        }

        movie.likes.push(userId);

        var user = userModel.findUserById(userId);
        if (!user.likes) {
            user.likes = [];
        }
        user.likes.push(imdbId);
        console.log(user);
        console.log(movie);
        res.send(200);
    }
}
