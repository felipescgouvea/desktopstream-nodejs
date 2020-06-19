

sourceUrl = 'http://localhost:8080';
let socket = io(sourceUrl);

const startStream = () =>{
    if(!socket.connected){
        socket.connect();
    }
    socket.on('image', function(data) {
        try {
            //console.log(data);
            console.log('Frame Arrived');
            var canvas = document.getElementById('videoCanvas');
            var context = canvas.getContext('2d');
            var imageObject = new Image();
            imageObject.src = 'data:image/jpeg;base64,' + data;
            imageObject.onload = function(){
            context.height = imageObject.height;
            context.width = imageObject.width;
            console.log(imageObject.width);
            console.log(imageObject.height);
            context.drawImage(imageObject,0,0,context.width,context.height);
        }
        
        } catch(e){
            console.log(e); 
        }
    });
}

const stopStream = () => {
    socket.disconnect();
    image.style.visibility = 'hidden';
}