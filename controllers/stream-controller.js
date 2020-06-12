
const screenshot = require('screenshot-desktop');
const sharp = require('sharp');
var emptyIO = require('socket.io');
let io = null;



exports.init = (server) => {
    //console.log(server);
    io = emptyIO(server);

    io.on('connection', socket => {
        //console.log("Socket connection: ", socket.id);

        socket.on('sendMessage', data =>{
            console.log(data);
        })
    })
}

exports.startScreenshotLoop = (timeDelay) => {



    setInterval(() =>{
        //var t0 = performance.now();
        screenshot({format: 'jpg'}).then((inputBuffer) => {
            sharp(inputBuffer)
                .resize({width: 1280})
                .toBuffer()
                .then( data => {
                    io.emit('image', data.toString('base64'));
                })
                //var t1 = performance.now();
                //console.log("Call to screenshot took " + (t1 - t0) + " milliseconds.")
          }).catch((err) => {
            console('could not take ss :', err);
          })

    }, timeDelay)
}
