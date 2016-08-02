module.exports = function (app) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);

    function userLikesMovie(req, res) {
        var userId = req.params.userId;
        var imdbId = req.params.imdbID;
        console.log([userId, imdbID]);
        res.send(200);
    }
}
