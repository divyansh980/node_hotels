const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

//Post Method to add a Menu Item
router.post ('/', async(req , res)=>{
        try {
                const data = req.body
                const newMenu = new MenuItem(data);
                const response = await newMenu.save();
                console.log('Menu data saved');
                res.status(200).json(response);
                
                
        } catch (err) {
                console.log(err);
                res.status(500).json({error : 'Internal Server error'});

                
        }
});

//Get method to get the menu Items
router.get('/:taste',async(req, res)=>{
        try {
                // const data = await MenuItem.find();
                // console.log('MEnu data fetched');
                // res.status(200).json(data);
                
                
        } catch (err) {
                // console.log(err);
                // res.status(500).json({error : 'Internal Server Error'});
                 
                
                
        }
});

module.exports = router ; 