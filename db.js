const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
      const connection = mongoose.connection

      connection.on('connected',() =>{
          console.log('database connected successfully')
      })

      connection.on('error',() =>{
        console.log('database connection failed')
    })
  }
  connectDB()
  module.exports=mongoose