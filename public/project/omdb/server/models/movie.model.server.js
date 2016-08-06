module.exports = function (db, mongoose) {

    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var Movie = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie
    };
    return api;

    function findMoviesByImdbIDs(imdbIDs) {
        var movies = [];
        for (var id in imdbIDs) {
            var movie = findMovieByImdbID(imdbIDs[id]);
            if (movie) {
                movies.push(movie);
            }
        }
        return movies;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = new Movie({
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title
        });

        // save movie to database
        // .create - insert function
        // .save - insert if a new object, update if existing one
        Movie.save(function (err, doc) {
            console.log(doc);
        });

    }

    function findMovieByImdbID(imdbID) {
        var deferred = q.defer();
        
        Movie.findById(imdbID, function (err, doc) {
           if (err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }
}
