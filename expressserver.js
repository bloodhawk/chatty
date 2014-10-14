var Express = require('express');
var bodyParser = require('body-parser');
var app = Express();
var port = 8500;
var messages = [];


//add configuration to node app here
//do app.use to push middleware in on every request.
//body parser grabs the body and handles the incoming parsing
//of the body so we dont need pull data in chunks and wait until 
//res.end (see server.js)
//second function adds custom header on each restult we send 
app.use(bodyParser());
app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
});

app.options('/', function(req, res){
	res.send();
});

app.get('/', function(req, res) {
    res.status(200).send(messages);
});


app.post('/messages', function(req, res) {
	req.body.timeStamp = new Date().toISOString();
	messages.push(req.body); //body parser providing body to push to messages array
	res.send(messages);
});


/* instantiate server */ 

app.listen(port, function(){
	console.log("Listening on " + port);
});
