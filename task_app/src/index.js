const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

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