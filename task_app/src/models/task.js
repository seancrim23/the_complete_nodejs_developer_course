const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
});

taskSchema.pre('save', function(next) {
    const task = this;

    if(task.isModified('description')){
        //console.log('description has been modified!');
    }

    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

/**
 * goal1: refactor task model to add timestamps
 * 
 * 1. create schema
 * 2. setup timestamps
 * 3. create tasks to test
 */