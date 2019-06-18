require('../src/db/mongoose');
const Task = require('../src/models/task');

//ObjectId("5d08fff17744dc0464216138")

/*Task.findByIdAndRemove('5d08fff17744dc0464216138').then(task => {
    console.log(task);

    return Task.countDocuments({ completed: false });
}).then(count => {
    console.log(`Incomplete tasks: ${count}`);
}).catch(error => {
    console.log("error!", error);
});*/

//ObjectId("5d0944302a7f98313898a8bc")

const deleteTaskAndCount = async (id) => {

    try{
        const task = await Task.findByIdAndRemove(id);
        const count = await Task.countDocuments({ completed: false });
        console.log(`Incomplete Tasks: ${count}.`); 
    }catch(error){
        console.log('Error', error);
    }
};

deleteTaskAndCount('5d0944302a7f98313898a8bc');

/**
 * goal: use async/await
 * 
 * 1. create deletetaskandcount as an async function
 *  -accept id of task to remove
 * 2. use await to delete task and count up incomplete tasks
 * 3. return count
 * 4. call function and attach then/catch to results
 * 5. test
 */