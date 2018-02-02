

const mongoose = require('mongoose');
const { Schema } = mongoose;
var userSchema = new Schema({
    googleId:{
        type:String
    },
    name:{
        type:String
    },

});

var Users = mongoose.model('Users', userSchema);
module.exports = {
    Users
}
