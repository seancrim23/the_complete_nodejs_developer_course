const users = [];

// add user, remove, get user, getUsersInRoom

const addUser = ({ id, username, room }) => {
    //clean data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //validate data
    if(!username || !room){
        return {
            error: 'Username and room are required!'
        };
    }

    //Check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.username === username;
    });

    //Validate username
    if(existingUser){
        return {
            error: 'Username is already in use!'
        };
    }

    const user = { id, username, room };
    users.push(user);
    return { user };
};

const removeUser = id => {
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return {
            error: `User id ${id} cannot be found for remove!`
        };
    }

    return users.splice(userIndex, 1)[0];
};

const getUser = id => {
    const user = users.find(user => user.id === id);

    if(!user){
        return {
            error: `User id ${id} cannot be found!`
        };
    }

    return user;
};

const getUsersInRoom = room => {
    const usersInRoom = users.filter(user => user.room === room);
    if(usersInRoom.length === 0){
        return {
            error: `No users in room ${room}!`
        }
    }
    return usersInRoom;
};

/*addUser({
    id: 11,
    username: 'john',
    room: 'pizza'
});

addUser({
    id: 13,
    username: 'john1',
    room: 'pizza'
});

addUser({
    id: 15,
    username: 'john2',
    room: 'pizza'
});

addUser({
    id: 144,
    username: 'john3',
    room: 'pizza'
});

console.log(removeUser(25));
console.log(users);
console.log(getUser(1244));
console.log(getUsersInRoom('hello'));*/

//maybe write a test suite for the above? ^^^

/**
 * goal: create two new functions for users
 * 
 * 1. create getuser
 *      -accept id and return user object (or undefined)
 * 2. create getUsersInRoom
 *      - accept room name and return array of users (or empty)
 * 3. test
 */

 module.exports = {
     addUser,
     removeUser,
     getUser,
     getUsersInRoom
 };