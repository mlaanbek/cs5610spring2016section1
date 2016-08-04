// load the mock data into a local variable
var mock = require("./user.mock.json");

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

        // insert new user with mongoose user model's create().
        // The user object will be validated against the schema.

        // It's an asynchronous call, Node.js sends the command to the database and continues
        // (it won't wait for the response). The communication is thus implemented through events.
        // Node.js will be notified with a callback which can be either an error (err) or actual
        // instance object that made it to the database (doc).

        // MongoDB will create a unique ID (a primary key) plus it will add several other things.
        UserModel.create(user, function (err, doc) {
           console.log(doc);
        });
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
