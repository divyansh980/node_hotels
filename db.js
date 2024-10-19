// const mongoose = require('mongoose');

// //Define the MongoDb connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels'    //Replace 'mydatabase' with your database name

// //set up mongoDB connection
// mongoose.connect(mongoURL,{
//         useNewUrlParser: true,
//         useUnifiedTopology : true
// })
// db.js

//old version it use before 4.0.0 version , now new version use in below...

const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/hostels'; // Replace with your MongoDB URI

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB server'))
    .catch(err => console.error('MongoDB connection error', err));



    
//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;



//Define event listerners for database connection

db.on('connected',() =>{
        console.log('Connected to MongoDB server');
        
});

db.on('error',(err) =>{
        console.error('MongoDB connection error',err);
        
});

db.on('disconnected',() =>{
        console.log('MongoDB Disconnected');
        
});


//Export the database connection
module.exports = db;
