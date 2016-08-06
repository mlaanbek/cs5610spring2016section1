module.exports = function (db, mongoose) {

    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var Movie = mongoose.model("Movie", MovieSchema);

    var movies = [];
    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie(userId, movie) {
        var deferred = q.defer();

        Movie.findOne({imdbID: movie.imdbID},
            function (err, doc) {
                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's movie
                if (doc) {
                    doc.likes.push(userId);
                    // save changes
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });

                // there's no error, the movie just does not exist
                } else {
                    // if there's no movie
                    // create a new instance
                    movie = new Movie({
                        imdbID: movie.imdbID,
                        title: movie.Title,
                        poster: movie.Poster,
                        likes: []
                    });

                    movie.likes.push(userId);
                    movie.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findMoviesByImdbIDs(imdbIDs) {
        var deferred = q.defer();

        /*
            Find all movies
            whose imdb IDs
            are in imdbIDs array

            .find always returns an array
         */
        Movie.find({
            // $in - all operators in mongoose use a $sign in front of then
            imdbID: {$in: imdbIDs}
        }, function (err, movies) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(movies);
            }
        });
        return deferred.promise;
    }

    function createMovie(movie) {

        // create instance of movie
        var movie = new Movie({
            imdbID: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            likes: []
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
