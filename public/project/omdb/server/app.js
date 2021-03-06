// top level server side file that initializes everything else
// it's a node module which loads another module

module.exports = function(app, db, mongoose) {

    // load the model and pass it to the service
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var movieModel = require("./models/movie.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, movieModel, userModel);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
}
