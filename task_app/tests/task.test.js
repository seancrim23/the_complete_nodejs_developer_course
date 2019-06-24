const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
const { userOneId, userOne, setupDatabase, taskOne, userTwo, userTwoId } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'this is a test'
        }).expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test('Successfully return all pre loaded tasks for user one', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    //console.log(response.body);
    expect(response.body.length).toBe(2);    
});

test('Should fail when user two tries to delete task belonging to user one', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

/**
 * goal1: test get /tasks
 * 
 * 1. request all tasks for user one
 * 2. validate status code
 * 3. validate length of array 
 */

 /**
  * goal2: test delete task security
  * 
  * 1. attempt to have second user delete first task
  *     - set up necessary db.js export
  * 2. assert failed status code
  * 3. assert task is still in db
  * 4. test
  */