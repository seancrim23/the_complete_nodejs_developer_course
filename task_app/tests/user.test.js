const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Ronald Mcdonald',
        email: 'ronald@mcdonald.com',
        password: 'MyPass777!!!'
    }).expect(201);

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Ronald Mcdonald',
            email: 'ronald@mcdonald.com',
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('MyPass777!!!');
});

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    //validate that the second generated token matches user token
    const user = await User.findById(response.body.user._id);
    expect(response.body.token)
        .toBe(user.tokens[1].token);

});

test('Should not log in nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'fail@fail.com',
        password: 'thisshouldfail'
    }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should successfully delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOne._id);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should successfully update user', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Charles Cheese'
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Charles Cheese');
});

test('Should not successfully update user with incorrect field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'New York City'
        })
        .expect(400);
}); 

/**
 * goal1: test login failure
 * 
 * 1. create 'should not login nonexistant user'
 * 2. send off request with bad creds
 * 3. expect correct status response
 * 4. test
 */

 /**
  * goal2: test delete account
  * 
  * 1. create positive and negative delete test case
  * 2. test
  */

  /**
   * goal3: validate new token is saved
   * 
   * 1. fetch user from db
   * 2. assert token matches users token
   * 3. test
   */

   /**
    * goal4: validate user is removed
    * 
    * 1. fetch user from db
    * 2. assert null response
    * 3. test!
    */

    /**
     * goal5: test user updates
     * 
     * 1. create update valid user fields case
     *  - update name of test user
     *  - check data to confirm change
     * 2. create no update for invalid field case
     *  - update some random non user field and expect error code
     * 3. test
     */