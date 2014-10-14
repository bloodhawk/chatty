var http = require('http');
var port = 8500;
var msgData = '';
var messages = [];
var onRequest = function (req, res) {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Connection': 'close', //close the connection after request sent
            'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(messages));
    }

    if(req.method == 'OPTIONS') {
        res.writeHead(200, {
            "Content-Type": 'application/json',
            "Connection": 'close',
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Methods": 'OPTIONS, GET, POST',
            "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
        });
        res.end();
    }

    if (req.method == 'POST') {
        msgData = ''
        req.on('data', function (data) {
            msgData += data.toString();
        });
        req.on('end', function () {
            var parsed = JSON.parse(msgData);
            messages.push(parsed);
            res.writeHead(200, {
                    "Content-Type": 'application/json',
                    "Connection": 'close',
                    "Access-Control-Allow-Origin": '*',
                    "Access-Control-Allow-Methods": 'OPTIONS, GET, POST',
                    "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
            });
            var response = JSON.stringify(messages)
            res.end(response);
        });
    }
};
http.createServer(onRequest).listen(port, function () {
    console.log("Listening on port: " + port);
});