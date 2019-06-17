//CRUD create read update delete
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    /*db.collection('tasks').insertOne({
        description: 'stare',
        completed: false
    }, (error, result) => {
        if (error) {
            return console.log('uh oh error time');
        }

        console.log(result.ops);
    });*/

    db.collection('tasks').deleteOne({ description: 'jump'} ).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

    //ObjectId("5d07ba745cca141468f1b3ad")
});

/**
 * goal1: insert 3 tasks to a new tasks collection
 * 
 * 1. use insertmany to insert documents
 *  - description (string), completed (bool)
 * 2. setup callback to handle error or print ops
 * 3. run script
 * 4. refresh db in robot 3t and view data
 */

 /**
  * goal2: use find and findone with tasks
  * 
  * 1. use findOne to fetch last task by ID (print doc to console)
  * 2. use find to fetch all tasks not completed (print)
  * 3. test
  */
 /**
  * goal3: use updateMany to complete all tasks
  * 
  * 1. check docs for updateMany
  * 2. setup call w query and updates
  * 3. use promise methods to handle
  * 4. test
  */

  /**
   * goal4: use deleteone to remove  a task
   * 
   * 1. grab description for task to delete
   * 2. setup call w query
   * 3. use promise
   * 4. test
   */