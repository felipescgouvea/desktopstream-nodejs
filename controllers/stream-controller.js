
const screenshot = require('screenshot-desktop');
const udpServer = require('../apis/udp-server');
const sharp = require('sharp');
var emptyIO = require('socket.io');
var ss = require('socket.io-stream');
var stream = ss.createStream();
let io = null;
let counter = 0;

exports.init = (server) => {
    //console.log(server);
    io = emptyIO(server);

    io.on('connection', socket => {
        console.log("Socket connection: ", socket.id);
        udpServer.streamer(io);
    })
}

exports.startScreenshotLoop = () => {
    setInterval(() =>{
        //var t0 = performance.now();
        screenshot({format: 'jpg'}).then((inputBuffer) => {
            sharp(inputBuffer)
                .resize({width: 1280})
                .toBuffer()
                .then( data => {
                    ss(io).emit('image', data.toString('base64'));
                    console.log('emit number: ', ++counter);
                })
                //var t1 = performance.now();
                //console.log("Call to screenshot took " + (t1 - t0) + " milliseconds.")
          }).catch((err) => {
            console('could not take ss :', err);
          })

    }, 1000)
}
