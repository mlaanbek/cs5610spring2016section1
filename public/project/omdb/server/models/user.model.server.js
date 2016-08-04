// load the mock data into a local variable
var mock = require("./user.mock.json");

// load q promise library
var q = require("q");

module.exports = function (db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema. This model provides us with the API
    // to interact with the database
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById
    };
    return api;

    function findUserById(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                return mock[u];
            }
        }
        return null;
    }

    function createUser(user) {
        /*
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
        */

        // use q to defer the response. It's an object that includes a promise.
        var deferred = q.defer();

        // insert new user with mongoose user model's create().
        // The user object will be validated against the schema.

        // It's an asynchronous call, Node.js sends the command to the database and continues
        // (it won't wait for the response). The communication is thus implemented through events.
        // Node.js will be notified with a callback which can be either an error (err) or actual
        // instance object that made it to the database (doc).

        // MongoDB will create a unique ID (a primary key) plus it will add several other things.
        UserModel.create(user, function (err, doc) {
            console.log(doc);

            if (err) {
                // reject the promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        // return a promise immediately. And when the response comes, we will be notified through that promise.
        // A promise allows us to register functions - a success function and a failure function.
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock) {
            if (mock[u].username === credentials.username &&
                mock[u].password === credentials.password) {
                return mock[u];
            }
        }

        return null;
    }
}
