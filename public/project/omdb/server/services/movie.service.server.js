module.exports = function (app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function userLikesMovie(req, res) {
        var movieOmdb = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;

        movieModel
            .userLikesMovie(userId, movieOmdb)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
