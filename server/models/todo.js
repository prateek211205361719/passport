
const mongoose = require("mongoose");
const { Schema }  = mongoose;

const todoSchema = new Schema({
    text:{
        type:String
    },
    completed:{
        type:Boolean
    },
    userId:{
        type:String
    },
    completedAt:{
        type:Number
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};

