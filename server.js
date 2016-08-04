var express = require('express');
var app = express();
var bodyParser = require('body-parser');            // to parse json from the body
var cookieParser = require('cookie-parser');        // can parse cookies from the header
var session = require('express-session');           // node.js module that provides high-level api to keep objects per session that initiated by cookies
// install and require the mongoose library
var mongoose = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5610projectomdb';

/*
*   If remote server is used, use this connection
**/
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
 secret: requires a string, for example "this is my secret".
 But to we don't want to post it publicly. So instead create and use an environment variable (stored in a computer)
  process.env.VARIABLE_NAME
  */
//app.use(session({secret: process.env.PASSPORT_SECRET}));
app.use(session({secret: "this is my secret"}));
app.use(cookieParser());
// configure where to fetch the static content: 'current directory'/public
app.use(express.static(__dirname + '/public'));

// if OPENSHIFT_NODEJS_IP variable is undefined, use 127.0.0.1
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/api/users', function(req, res) {
    var users = [
        {"username": "alice", "firstname": "Alice", "lastname": "Wonderland"},
        {"username": "bob", "firstname": "Bob", "lastname": "Hope"},
        {"username": "marek", "firstname": "Marek", "lastname": "Laanbek"}
    ];
    res.json(users);
});

// get the app.js and pass it with an instance of app
require("./public/experiments/server/express/omdb/get/server/app.js")(app);
require("./public/experiments/server/express/omdb/post/server/app.js")(app);

require("./public/project/omdb/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);