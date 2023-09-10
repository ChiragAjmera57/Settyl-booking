const mongoose = require('mongoose')
require('dotenv').config()
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }
 const connection = mongoose.connect(process.env.MONGO_URL,connectionParams) 
module.exports = connection