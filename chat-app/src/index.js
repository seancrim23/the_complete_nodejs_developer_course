const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('new websocket connection!');

    socket.emit("message", generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }

        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

/**
 * goal: create an express web server
 * 
 * 1. init npm and install express
 * 2. setup new express server
 *      - serve public directory
 *      - listen on port 3000
 * 3. create index.html and render "chat app" on screen
 * 4. test
 */
/**
 * goal: setup scripts in package.json
 * 
 * 1. create "start" script to start app using node
 * 2. install nodemon as a dev dependency
 * 3. create "dev" script to start app using nodemon
 * 4. test
 */
/**
 * goal3: send welcome message to new users
 * 
 * 1. have server emit "message" when new client connects
 *      -send 'Welcome!' as event data
 * 2. have client listen for "message" event and print to console
 * 3. test
 */

 /**
  * goal4: allow clients to send messages
  * 
  * 1. create form w input and button
  * 2. setup event listener for form submissions
  *     - emit sendMessage w input string as event data
  * 3. have server listen for sendMessage
  *         -send to all clients
  * 4. test
  */

  /**
   * goal5: share coords with others
   * 
   * 1. have client emit "sendLocation" w object as data
   *    - object should contain lat and long props
   * 2. server should listen for "sendLocation"
   *    - when fired, send message to all connected clients, "location: long, lat"
   * 3. test
   */