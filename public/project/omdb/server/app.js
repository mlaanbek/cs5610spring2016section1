// top level server side file that initializes everything else
// it's a node module which loads another module

module.exports = function(app) {

    // load the model and pass it to the service
    var model = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, model);
}
