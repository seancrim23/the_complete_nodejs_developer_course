const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');
const sharp = require('sharp');
//if no destination is provided, the multer definition
//will automatically pass the new file to whatever function its
//referenced in, see the function at the bottom where multer
//is passed in
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('File must be an image!'));
        }

        cb(undefined, true);
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    }catch(e){
        res.status(400).send(e);
    }

});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

/*router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }

});*/

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send( {error: 'Invalid updates!'} );
    }

    try{
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.send(req.user);
    }catch(e){
        res.status(400).send(e);
    }

});

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }catch(e){
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.send();
    }catch(e){
        res.status(500).send('Error!', e);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send('Error!', e);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize( { width: 250, height: 250 }).png().toBuffer();
    
    req.user.avatar = buffer;
    await req.user.save();
    res.send(req.user);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    try{
        await req.user.save();
        res.send(req.user);
    }catch (e) {
        res.status(400).send('Error!', e);
    }
});

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        
        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send();
    }
});


module.exports = router;

/**
 * goal have signup send back auth token
 * 
 * 1. generate token for saved user
 * 2. send back both token and user
 * 3. create new user from postman and confirm token is there
 */
/**
 * goal2: refactor update profile route
 * 
 * 1. update url to users/me
 * 2. add the auth middleware into mix
 * 3. use existing user document instead of id
 * 4. test
 */
/**
 * goal: setup endpoint for avatar upload
 * 
 * 1. add post users/me/avatar to user router
 * 2. setup multer to store uploads in avatar directory
 * 3. choose name "avatar" for key when registering middleware
 * 4. send back 200 response from route handler
 * 5. test
 */
/**
 * goal: add validation to avatar upload route
 * 
 * 1. limit upload size to 1mb
 * 2. only allow jpg, jpeg, png
 * 3. test!!!
 *      - large files should fail
 *      - non images should fail
 */

 /**
  * goal: clean up error handling
  * 
  * 1. setup error handler function
  * 2. send back 400 w error message
  * 3. test
  */

  /**
   * goal: setup route to delete avatar
   * 
   * 1. setup DELETE users/me/avatar
   * 2. add auth
   * 3. set field to underfined and save user sending back 200
   * 4. test
   */