
const screenshot = require('screenshot-desktop')
var emptyIO = require('socket.io');
let io = null;

module.exports = {
    init : handleTCP,
    startStream : takeScreenshotEverySelectedTime

}

function handleTCP (server){
    //console.log(server);
    io = emptyIO(server)

    io.on('connection', socket => {
        console.log("Socket connection: ", socket.id)

        socket.on('sendMessage', data =>{
            console.log(data);
        })
    })
}

function takeScreenshotEverySelectedTime(timeDelay){
    setInterval(() =>{
        screenshot({format: 'png'}).then((img) => {
            io.emit('image', img)
          }).catch((err) => {
            console('could not take ss :', err)
          })

    }, timeDelay)
}