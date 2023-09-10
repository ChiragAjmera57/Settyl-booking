const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,require:true,unique:true
    },
    password:{
        type:String,require:true
    },
    name:{
        type:String
    }

     
})

const User = mongoose.model('user', userSchema);
module.exports = User