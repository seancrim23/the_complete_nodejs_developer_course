require('../src/db/mongoose');
const User = require('../src/models/user');

//ObjectId("5d07fecca829081b40dd7d9e")
//ObjectId("5d07d6358f58b32e789f8269")

/*User.findByIdAndUpdate('5d07dfcb16254524c064fa4e', {age: 1222} ).then(user => {
    console.log(user);

    return User.countDocuments({ age: 1222 });
}).then(count => {
    console.log(count);
}).catch(error => {
    console.log(error);
});*/

const updateAgeAndCount = async (id, age) => {

    try{
        const user = await User.findByIdAndUpdate(id, { age });
        const count = await User.countDocuments( { age });
        console.log(count);
    }catch(error){
        console.log('Error!', error);
    }
};

updateAgeAndCount('5d07d6358f58b32e789f8269', 122);