const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const {updateuserid}= require('../Authentication/login')

const verify= require('../Authentication/verify')
const {registerandUpdationValidation}=require('../Authentication/validation');

router.put('/',verify,async (req,res) =>{
   try{
      const {error} =registerandUpdationValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message)
       // Hash passwords
  
       const salt =await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt);
       const user1 = await User.findOne({email: req.body.email});
       if(!user1) return res.status(401).send('user email not found');
  
       else if(req.body.email!==updateuserid())res.send('user not match')
  
       else if(user1.username!==req.body.username)
       {
          const username1 = await User.findOne({username: req.body.username});
          if(username1) return res.status(400).send('Username alreay exist');
       }
       else{
          const user = await User.findOneAndUpdate({email:req.body.email},{
              email:req.body.email,
              password:hashedPassword,
              name: req.body.name,
              username: req.body.username,
              country: req.body.country,
              city: req.body.city
          },{new: true});
          res.send(user);
       }
   }catch(err)
   {
      res.status(500).send('not login');
   }
});

module.exports= router;