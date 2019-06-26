const socket = io();

/*document.getElementById('count__button').addEventListener('click', () => {
    console.log('Clicked!!!');
    socket.emit('increment');
});

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count);
});*/

//Elements
const $messageForm = document.getElementById('message__form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

const $locationButton = document.getElementById('location__button');

const $messages = document.getElementById('messages');

//Templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;

socket.on('message', messageObject => {
    //console.log(`Message from the server: ${message}`);
    const html = Mustache.render(messageTemplate, {
        message: messageObject.text,
        createdAt: moment(messageObject.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', locationObject => {
    //console.log(location_url);
    const html = Mustache.render(locationTemplate, {
        location_url: locationObject.url,
        createdAt: moment(locationObject.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', event => {
    event.preventDefault();
    //disable the form
    $messageFormButton.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', $messageFormInput.value, error => {
        
        //enable the button
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if(error){
            return console.log(error);
        }
        console.log('message delivered!')
    });
    
});

$locationButton.addEventListener('click', event => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!');
    }

    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(position => {  
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ack => {
            $locationButton.removeAttribute('disabled');
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

 /**
  * goal2: disable send location button while loc being sent
  * 
  * 1. set up selector at top of file
  * 2. disable button before getting current position
  * 3. enable button in callback
  * 4. test
  */

  /**
   * goal3: create separate event for location sharing
   * 
   * 1. have server emit locationMessage
   * 2. have client listen for that
   * 3. test
   */

   /**
    * goal4: add timestamps for location messages
    * 
    * 1. create generateLocationMessage and export
    *       - object with url and createdAt
    * 2. use generatedLocationMessage when server emits locatoinMessage
    * 3. update template to render time w url
    * 4. compile template w url and time
    * 5. test
    */
