const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email!');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be positive!');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        validate(value) {
            if(value.length <= 6){
                throw new Error('Password must be more than six characters!');
            }
            if(value.toUpperCase().includes('password'.toUpperCase())){
                throw new Error('Password must not contain the word password!');
            }
        }
    }
});

module.exports = User;