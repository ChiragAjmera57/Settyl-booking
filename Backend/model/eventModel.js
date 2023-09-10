const mongoose = require('mongoose')
const eventModel = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'event name already taken'],
        unique:[true,'event name already taken'],
    },
    image:{
        type:String,
        require:true
    },
    date:{
        type:String
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
    organizer:{
        
    },
    price:{
        type:Number
    },
    bookingDeadline:{
        type:String
    }

     
})

const Event = mongoose.model('event', eventModel);
module.exports = Event