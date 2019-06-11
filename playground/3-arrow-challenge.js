/**
 * 1. define getTasksToDo method
 * 2. use filter to return just incomplete tasks (arrow function)
 * 3. test work by running script
 */

 const tasks = {
    tasks:
    [{
        task: 'Grocery Shopping',
        completed: true
    },
    {
        task: "Clean yard",
        completed: false
    },
    {
        task: "Film course",
        completed: false
    },
    {
        task: "Eat taco",
        completed: true
    },
    {
        task: 'Hug dog',
        completed: false
    }],
    getTasksToDo(){
        return this.tasks.filter(task => {
            return !task.completed;
        })
    }
 };

 console.log(tasks.getTasksToDo());