const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File must be a word document!'));
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});


/*app.use((req, res, next) => {
    if(req.method === 'GET'){
        res.send('GET requests are disabled!');
    } else {
        next();
    }
});*/

/*app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Please check back later!');
});*/

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/**
 * without middleware: new request -> run route handler
 * 
 * with middleware: new request -> do something -> run route handler
 * 
 */

/*const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    /*const task = await Task.findById('5d0b99a75ae029195c680116');
    await task.populate('owner').execPopulate();
    console.log(task.owner);*/

/*    const user = await User.findById('5d0b983660ed6732302c9c45');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();*/

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});



/*const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisissupercooltoken', { expiresIn: '7 seconds' });
    console.log(token);

    const data = jwt.verify(token, 'thisissupercooltoken');
    console.log(data);
};

myFunction();*/
/**
 * goal1: setup task create endpoint
 * 
 * 1. create separate file for task model
 * 2. create task creation endpoint (handle success and error)
 * 3. test
 */
/**
 * goal2: setup task reading endpoints
 * 
 * 1. create fetch all task endpoint
 * 2. create fetch task by id endpoint
 * 3. test
 */

 /**
  * goal3: refactor task routes to use async await
  * 
  * 1. refactor
  * 2. test
  */

  /**
   * goal4: allow for task updates
   * 
   * 1. setup route handler
   * 2. send error if unknown updates
   * 3. attempt to update task
   *    - handle task not found
   *    - handle validation errors
   *    - handle success
   * 4. test
   */

   /**
    * goal5: allow for removal of tasks
    * 
    * 1. setup the endpoint handler
    * 2. attempt to delete the task by id
    *   - handle success
    *   - handle task not found
    *   - handle error
    * 3. test your work
    */
   /**
    * goal5: create task router
    * 
    * 1. create new file creating exporting router
    * 2. move all task routes to new file
    * 3. load in and use router w express app
    * 4. test
    */

    /**
     * goal6: setup middleware for maintenance mode
     * 
     * 1. register a new middleware function
     * 2. send back a maintenance message with 503 status code
     * 3. try your requests from the server and confirm status
     */