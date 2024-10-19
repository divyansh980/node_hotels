const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  //req.body


app.get('/', function (req, res) {
  res.send('Welcome to my hostel.. How may I can help you??')
})



//import the router files
const personRoutes = require('./routes/PersonRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
        console.log('listing on port 3000');
        
});
