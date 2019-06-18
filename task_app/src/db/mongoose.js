const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

/**
 * goal: create model for tasks
 * 
 * 1. define model
 * 2. create new instance of model
 * 3. save to db
 * 4. test
 */

 /**
  * goal2: add password field to user
  * 
  * 1. setup field as required string
  * 2. ensure length greater than 6
  * 3. trim password
  * 4. ensure password doesnt contain password
  * 5. test
  */
 /**
  * goal3: add validation and sanitization to task
  * 
  * 1. trim description and make it required
  * 2. make completed optional and default to false
  * 3. test
  */