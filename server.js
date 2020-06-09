const http = require('http')
const controller = require('./controller.js')
let server;
const PORT = 3000;



const listenServer = function(){
        server.listen(PORT, function(error){
            if(error){
                console.error(`error on listening port ${PORT} : ${error}`)
            }
            else{
                console.log(`server listening to port ${PORT}`)
            }
        })
}

const createServer = function (app){
        console.log('intializing server')
        server = http.createServer(app)
        controller.init(server)
        return this;
}

const startStream = function(){
    controller.startStream(800)
}

module.exports = {
    listen : listenServer,
    createServer :  createServer,
    startStream : startStream
} ;