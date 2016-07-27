// top level server side file that initializes everything else
// it's a node module which loads another module

module.exports = function(app) {
    var service = require("./services/user.service.server.js")(app);
}
