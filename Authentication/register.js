const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const {registerandUpdationValidation}=require('./validation');

router.post('/', async (req,res) =>{
    // Lets validate
       const {error} =registerandUpdationValidation(req.body);
       if(error) return res.status(400).send(error.details[0].message)
    
       // checking if the user is already in the database
       const emailExist = await User.findOne({email: req.body.email});
       if(emailExist) return res.status(400).send('Email alreay exist');

           // checking if the username is already in the database
           const username = await User.findOne({username: req.body.username});
           if(username) return res.status(400).send('Username alreay exist');
    
       // Hash passwords
       const salt =await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
        // create a new user
       const user = new User({
           email: req.body.email,
           password: hashedPassword,
           name: req.body.name,
           username: req.body.username,
           country: req.body.country,
           city: req.body.city
       });
       try{
           const savedUser = await user.save();
           res.send({user: user._id});
       } catch (err)
       {
           res.status(400).send(err);
       }
    });
    module.exports = router;
    