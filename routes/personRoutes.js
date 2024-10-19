const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//POST route to add a person
router.post('/',async(req, res)=>{
        try {
                const data = req.body  // assumnig the request body contains the person data

        //Create a new Person document using the Mongoose Model
        const newPerson = new Person(data);

        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
        
                
        } catch (err) {
                console.log(err);
                res.status(500).json({error:'Internal Server Error'});
                               
        }
});

//Get method to get the person
router.get('/',async (req,res)=>{
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

module.exports = router ; 
