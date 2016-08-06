module.exports = function (mongoose) {
    // use mongoose to declare a movie schema
    var MovieSchema = mongoose.Schema({
        imdbID: String,
        title: String,
        poster: String,
        likes: [String],
        // list of users that like this movie
        userLikes: [
            {username: String}
        ]
        // store movie collection in this collection
    }, {collection: 'project.omdb.movie'});

    return MovieSchema;
};
