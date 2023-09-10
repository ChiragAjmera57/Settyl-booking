const mongoose = require('mongoose')
const registerEvent = new mongoose.Schema({
   eventId:{

   },
   userId:{
    
   }
     
})

const Register = mongoose.model('register', registerEvent);
module.exports = Register