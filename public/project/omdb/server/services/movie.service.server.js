module.exports = function (app, movieModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function userLikesMovie(req, res) {
        var userId = req.params.userId;
        var imdbId = req.params.imdbID;

        var movie = movieModel.findMovieByImdbID(imdbId);
        if (movie) {
            // if a movie does not have any likes
            if (!movie.likes) {
                movie.likes = [];
            }
            movie.likes.push(userId);
        }


        console.log([userId, imdbId, movie]);
        res.send(200);
    }
}
