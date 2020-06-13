let image = document.getElementById('image');

sourceUrl = 'https://19b4bff274af.ngrok.io';
let socket = io(sourceUrl);

const startStream = () =>{
    if(!socket.connected){
        socket.connect();
    }
    socket.on('image', data =>{
        //console.log(data)
        let arrayBuffer = data;
        let bytes = new Uint8Array(arrayBuffer);
        image.src = 'data:image/jpg;base64,'+ (data);
    
    })
    image.style.visibility = 'visible';
}

const stopStream = () => {
    socket.disconnect();
    image.style.visibility = 'hidden';
}