module.exports = function(app) {

    // an end-points that is listening for incoming patterns
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        console.log(credentials);
        res.send(200);
    }
}
