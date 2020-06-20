const http = require('http');
const streamController = require('../controllers/stream-controller.js');
let server;
const PORT = 8080;

exports.createServer = (app) => {
        console.log('intializing server');
        server = http.createServer(app);
        return this;
}

exports.listen = () => {
    server.listen(PORT, function(error){
        if(error){
            console.error(`error on listening port ${PORT} : ${error}`);
        }
        else{
            console.log(`server listening to port ${PORT}`);
        }
    });
}

exports.startStream = () => streamController.startStream(server);