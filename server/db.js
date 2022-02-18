const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect('mongodb+srv://dagemga6:lama@cluster0.jcwqn.mongodb.net/Rental-cars', {
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