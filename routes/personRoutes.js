const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

//POST route to add a person
router.post('/signup',async(req, res)=>{
        try {
                const data = req.body  // assumnig the request body contains the person data

        //Create a new Person document using the Mongoose Model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload ={
                id: response.id,
                username : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);        
        console.log("Token is : ", token);                     
        
       res.status(200).json({response: response,token :token});        
                
        } catch (err) {
                console.log(err);
                res.status(500).json({error:'Internal Server Error'});
                               
        }
});

//Login Route
router.post('/login', async(req,res)=>{
        try {
                //Extract username and password from request body
                const{username, password }= req.body;

                //Find the user by username
                const user = await Person.findOne({username: username});

                //If user does not exist or password does not match , return error
                if(!user || !(await user.comparePassword(password))){
                        return res.status(401).json({error:'Invalid username or password.'});
                }

                //generate Tokens 
                const payload ={
                        id : user.id,
                        username : user.username
                }
                const token= generateToken(payload);

                //return token as response
                res.json({token})
        } catch (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
                                
        }
});


//Profile route
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
        try {
                const userData = req.user;
                console.log("User Data: ",userData);

                const userId = userData.id;
                const user = await Person.findById(userId);

                res.status(200).json({user});
                
        } catch (err) {
                console.error(err);
                res.status(500).json({error: 'Internal Server Error'});
                
        }
})


//Get method to get the person
router.get('/',jwtAuthMiddleware,async (req,res)=>{
        try {
             const data = await Person.find();   
             console.log('data fetched ');
             res.status(200).json(data);
                
        } catch (err) {
                console.log(err);
                res.status(500).json({error:'Internal Server Error'});
                
        }
});

router.get('//:workType',async(req,res)=>{
        try {
                const workType = req.params.workType;   //Extract the work type from the url parameter
        if(workType == 'chef' || workType == 'manager' || workType =='waiter'){
                const response = await Person.find({work:workType});
                console.log('response fetched');
                res.status(200).json(response)
                
        }else{
                res.status(404).json({error: 'Invalid work type'});
        }
                
        } catch (error) {
                console.log(err);
                res.status(500).json({error : 'Internal Server Error'});
                
        }
})


router.put('/:id',async(req,res)=>{
        try {
                const personId = req.params.id;  // Extract the id from the url parameter
                const updatedPersonData = req.body;  //updated data for the person

                const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
                       new : true , // Return the updated document
                       runValidators : true,   // Run Mongoose validations

                })

                if(!response){
                        return res.status(404).json({error: 'Persoon not found'});

                }

                console.log('data updated');
                res.status(200).json(response);
                
                
        } catch (err) {
                console.log(err);
                res.status(500).json({error : 'Internal Server Error'});

                
        }
})
// just checkingggggg
module.exports = router ; 
