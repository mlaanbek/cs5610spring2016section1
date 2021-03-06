module.exports = function(mongoose) {

    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // use mongoose to declare a user schema for validating the data that
    // we want to insert to the database
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        roles: [String],
        // imdb ids movies this user likes
        likes: [String],
        //movies this user likes
        likesMovies: [MovieSchema]


        // the second argument allows to do additional settings to the schema
        // in this case "what do we want to call the collection".
        // It's optional, if not provided Mongoose will provide it's own name
    }, {collection: 'project.omdb.user'});
    return UserSchema;
};
