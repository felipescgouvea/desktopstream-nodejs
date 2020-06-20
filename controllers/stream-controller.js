const reader = require('./udp-stream-reader');
var emptyIO = require('socket.io');
let io = null;
let counter = 0;

exports.startStream = (server) => {
    io = emptyIO(server);
    io.on('connection', socket => {
        console.log("Socket connection: ", socket.id);
        reader.startStream(io);
    });
}
// @deprecated
//const screenshot = require('screenshot-desktop');
//const sharp = require('sharp');
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
