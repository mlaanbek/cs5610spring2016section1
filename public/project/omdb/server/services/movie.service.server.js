module.exports = function (app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function findUserLikes(req, res) {
        var imdbID = req.params.imdbID;

        var movie = null;
        movieModel
            .findMovieByImdbID(imdbID)
            .then(
                function (doc) {
                    movie = doc;
                    return userModel.findUsersByIds(movie.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    movie.userLikes = users;
                    res.json(movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesMovie(req, res) {
        var movieOmdb = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie;

        movieModel
            .userLikesMovie(userId, movieOmdb)
            .then(
                function (movie) {

                    // notify the user what movie she likes
                    // this returns also a promise which will be evaluted in the next .then section
                    return userModel.userLikesMovie(userId, movie);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}
