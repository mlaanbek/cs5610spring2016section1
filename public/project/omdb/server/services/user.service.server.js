// A service is an interface between the object world and http world. It receives the http request
// and passes it over to the server. A data model is responsible for manipulating data.

module.exports = function(app, movieModel, userModel) {

    // an end-points that is listening for incoming patterns
    app.post("/api/project/omdb/login", login);
    app.get("/api/project/omdb/loggedin", loggedin);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.get("/api/project/omdb/profile/:userId", profile);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel.findUserById(userId)
            .then(
                // first retrieve the user
                function (doc) {
                    user = doc;
                    // fetch movies this user likes
                    return movieModel.findMoviesByImdbIDs(doc.likes);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function (movies) {
                    /*
                        List of movies this user likes
                        movies are not stored in database
                        only added for UI rendering
                     */
                    user.likesMovies = movies;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res) {
        var user = req.body;

        /*
        user = userModel.createUser(user);
        // let's log the user automatically in
        req.session.currentUser = user;
        res.json(user);
        */

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    // update req.session object. This object can remember between different requests
                    // Now that we have an user, we store it as a key-value pair in a session object. Thus a session object is basically a hash table
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
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
