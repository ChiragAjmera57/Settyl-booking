const express = require('express')
const connection = require('./config/connection_mongo')
const User = require('./model/UserModel')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var cors = require('cors')
const authentication = require('./middleware/authentication')
const Event = require('./model/eventModel')
const Register = require('./model/registerEvent')
require('dotenv').config() 

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


// sign up
app.post('/signup',async(req,res)=>{
    const {email,password,name} = req.body;
    const foundOne = await User.findOne({email:email})
    if(foundOne!=null){
       return res.status(400).send({msg:"invalid input"})
    } 
    else{
        await bcrypt.hash(password, 5, function(err, hash) { 
            if(err){
               return res.send({msg:`something went wrong`})
            }
            const user =new User({
                email,password : hash,name
            });
            try { 
                  user.save()
                res.status(200).send({msg:"user registerd succesfully"});
            } catch (error) { 
                res.send({msg:"please try again later"})
            }
        });   

    }
})

// login
app.post('/login',async (req,res)=>{
    const {email,password} = req.body
    const found = await User.findOne({email:email})
    if(found==null){
        res.send({msg:"invalid input"})
    } 
    else{
        const hash_password = found.password
        bcrypt.compare(password, hash_password, function(err, response) {
            if(response){
                let token = jwt.sign({user_id : found._id}, process.env.SECRET_KEY);
                
                res.send({msg : "login successfull", token : token})
                
            }
            else{
               res.status(400).send({msg:"invalid input"})
            }
        });
    }
})

// "/" This will send all event without authentication required.
app.get('/',async(req,res)=>{
    try {
        const events = await Event.find();
        res.send({events})
        
    } catch (error) {
        res.status(404).send({msg:`something went wrong`})
    }

})

// Detail of event not require authentication
app.get('/event/:eventId',async(req,res)=>{
    const eventId = req.params.eventId;
    try {
        const event = await Event.findById(eventId);
        res.send({event})
        
    } catch (error) {
        res.status(404).send({msg:`something went wrong`})
    }
    
})


//event-create only for authenticated users.
app.post('/event-create',authentication, async(req,res)=>{
    const {name,date,description,location,organizer,price,bookingDeadline,image} = req.body;
    const newEvent = new Event({name,date,description,location,organizer:req.user_id,price,bookingDeadline,image})
    try {
       await  newEvent.save()
        res.send({msg:`new event created by ${req.user_id}`}) 
    } catch (error) { 
      
        res.status(400).send({msg:error.message})
    }
    
})


app.patch('/event-update/:id', authentication, async (req, res) => {
    const eventId = req.params.id;
    
    try {
       
        const event = await Event.findById(eventId);
       
        if (event.organizer == req.user_id) {
            const payload = req.body;
            
            // Update the event
            await Event.findByIdAndUpdate(eventId, payload);

            res.status(200).send({ msg: `Event updated` });
        } else {
            res.status(401).send({ msg: `Not authorized to update this event` });
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).send({ msg: `Error updating event` });
    }
});



app.post("/event-register/:id",authentication,async(req,res)=>{
    const eventId = req.params.id;
    const userId = req.user_id;
    console.log(eventId,userId);
    const register = new Register({eventId,userId})
    try {
        await register.save()
        res.send({msg:`event registerd`})
    } catch (error) {
        res.status(401).send('something went wrong')
    }
})


app.get("/user-data",authentication,async(req,res)=>{
    const userId =  req.user_id;
    console.log(userId);
    const foundUser = await User.findById(userId)
    const linkedEvent = await Register.find({userId:userId})
    res.send({foundUser,linkedEvent})
})


app.listen(5000,()=>{
    try {
        connection
        console.log(`connected to db`);
    } catch (error) {
        console.log(`error to db`);
    }
    console.log(`listing to port 5000`)
})