var spawn = require('child_process').spawn;
// WRITE STREAM FFMPEG COMMAND
// ffmpeg -f gdigrab -i desktop -framerate 60  -f mpegts udp://localhost:3000         

// READ STREAM FFMPEG COMMAND
// ffmpeg -re -y -i udp://127.0.0.1:8000 -f mjpeg -s 500x500 -pix_fmt rgb24 pipe:1

const defaultConfigs = {
  readFromIp : "udp://127.0.0.1:8000",
  outputResolution: "1366x768"
};

// Read udp chunk and pipe to output as jpeg with given format
exports.startStream = (socket) => {	
    console.log('Start stream');

    var ffmpeg = require('child_process').spawn("ffmpeg", ["-i", defaultConfigs.readFromIp, "-f", "mjpeg", "-s", defaultConfigs.outputResolution,"-pix_fmt","rgb24","pipe:1"]);
    ffmpeg.on('error', function (err) {
        console.log(err);
    });

    ffmpeg.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });

    ffmpeg.stdout.on('data', function (data) {
          var frame = new Buffer(data).toString('base64');
          socket.emit('image',frame);
    });

};


