const dgram = require('dgram');
const server = dgram.createSocket('udp4', function(msg, rInfo){
    //console.log("received stream size: ", rInfo.size);

});

//server.bind(8000);
var spawn = require('child_process').spawn;
// ffmpeg -f gdigrab -i desktop  -f mpegts udp://localhost:3000          WRITE STREAM
// ffmpeg -f gdigrab -i desktop -framerate 60  -probesize 42M -r 10 -vcodec libx264 -preset ultrafast -tune zerolatency -crf 18 -b:v 500k -bufsize 300k -f mpegts udp://localhost:3000
// ffmpeg -i udp://localhost:3000 -r 1 out%03d.jpg          READ STREAM
// ffmpeg -re -y -i udp://127.0.0.1:8000 -f mjpeg -s 500x500 -pix_fmt rgb24 pipe:1
//ffmpeg -re -i udp://127.0.0.1:8000?fifo_size=1000000 -vcodec libx264 -vb 500000 -g 60 -vprofile main -acodec aac -ab 128000 -ar 48000 -ac 2 -vbsf h264_mp4toannexb -b 1000k -minrate 1000k -maxrate 1000k -strict experimental -f stream_segment -segment_format mpegts -segment_time 5 -segment_atclocktime 1 -reset_timestamps 1 -strftime 1 d:/%H%M%S.mp4
// ffmpeg -i "202748.mp4" "frames/out-%03d.jpg"
exports.streamer = (socket) => {	
    console.log('STREAMER');
    var ffmpeg = require('child_process').spawn("ffmpeg", ["-i", "udp://127.0.0.1:8000", "-f", "mjpeg", "-s","1366x768","-pix_fmt","rgb24","pipe:1"]);
    ffmpeg.on('error', function (err) {
      console.log(err);
    });

    ffmpeg.stderr.on('data', function(data) {
        //console.log('grep stderr: ' + data);
    });

    ffmpeg.stdout.on('data', function (data) {
          var frame = new Buffer(data).toString('base64');
          //console.log('Frame: ', frame);
          socket.emit('image',frame);
    });

};

exports.getServer = () => {return server;}

