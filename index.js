// require the http module of node.js
var http = require('http');
// require the dispatcher module
var httpdispatcher = require('httpdispatcher');
var dispatcher = new httpdispatcher();
// define the port of access for your server
const PORT = 8080;

// We need a function which handles requests and send response
function handleRequest(request, response){
    try {
        // log the request on console
        console.log(request.url);
        // Dispatch
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

// Create a server
var myFirstServer = http.createServer(handleRequest);

// add some routes

//A sample GET request
dispatcher.onGet("/", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hey, this is the homepage of your server</h1>');
});

dispatcher.onGet("/Eileen", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('I will protect you from evilJoe');
});

dispatcher.onGet("/evilJoe", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>All your bases are mine.</h1>');
});

dispatcher.onError(function(req, res) {
    res.writeHead(404);
    res.end("Error, the URL doesn't exist");
});

// Start the server !
myFirstServer.listen(PORT, function(){
    // Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
