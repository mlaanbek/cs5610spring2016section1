// A service is an interface between the object world and http world. It receives the http request
// and passes it over to the server. A data model is responsible for manipulating data.

module.exports = function(app, model) {

    // an end-points that is listening for incoming patterns
    app.post("/api/project/login", login);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);

    function register(req, res) {
        var user = req.body;
        user = model.createUser(user);
        // let's log the user automatically in
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
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

    function logout(req, res) {
        // this actually too much, since at the moment we're destroying the session for everybody
        // not just for the current user
        req.session.destroy();
        res.send(200);
    }
}
