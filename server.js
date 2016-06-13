var express = require('express');
var app = express();

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

app.listen(port, ipaddress);