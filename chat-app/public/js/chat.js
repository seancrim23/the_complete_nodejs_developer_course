const socket = io();

/*document.getElementById('count__button').addEventListener('click', () => {
    console.log('Clicked!!!');
    socket.emit('increment');
});

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count);
});*/

socket.on('message', (welcome) => {
    console.log(`Message from the server: ${welcome}`);
});

document.getElementById('message__form').addEventListener('submit', event => {
    event.preventDefault();
    socket.emit('sendMessage', document.getElementById('message__text').value, error => {
        if(error){
            return console.log(error);
        }
        console.log('message delivered!')
    });
    document.getElementById('message__text').value = '';
});

document.getElementById('location__button').addEventListener('click', event => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition(position => {  
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ack => {
            console.log('location shared!');
        });
    });
});

/**
 * goal: setup acknowledgement
 * 
 * 1. setup client ack function
 * 2. setup server to send back ack
 * 3. have client print "location shared!" when acknowledged
 * 4. test
 */

