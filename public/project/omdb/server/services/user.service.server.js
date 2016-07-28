// A service is an interface between the object world and http world. It receives the http request
// and passes it over to the server. A data model is responsible for manipulating data.

module.exports = function(app, model) {

    // an end-points that is listening for incoming patterns
    app.post("/api/project/login", findUserByCredentials);
    app.get("/api/project/loggedin", loggedin);

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);

        // update req.session object. This object can remember between different requests
        // Now that we have an user, we store it as a key-value pair in a session object. Thus a session object is basically a hash table
        req.session.currentUser = user;
        //res.send(200);

        res.json(user);
    }

    function loggedin(req, res) {
        // the value can be either null or a user object
        res.json(req.session.currentUser);
    }
}
