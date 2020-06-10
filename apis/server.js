const http = require('http');
const controller = require('../controllers/stream-controller.js');
let server;
const PORT = 3000;



exports.listen = () => {
        server.listen(PORT, function(error){
            if(error){
                console.error(`error on listening port ${PORT} : ${error}`);
            }
            else{
                console.log(`server listening to port ${PORT}`);
            }
        })
}

exports.createServer = (app) => {
        console.log('intializing server');
        server = http.createServer(app);
        controller.init(server);
        return this;
}

exports.startStream = () => controller.startScreenshotLoop(800);

