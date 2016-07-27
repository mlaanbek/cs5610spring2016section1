// A service is an interface between the object world and http world. It receives the http request
// and passes it over to the server. A data model is responsible for manipulating data.

module.exports = function(app, model) {

    // an end-points that is listening for incoming patterns
    app.post("/api/project/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        model.findUserByCredentials(credentials);
        res.send(200);
    }
}
