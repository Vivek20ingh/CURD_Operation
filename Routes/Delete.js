const router = require('express').Router();
const User = require('../model/User');

const {updateuserid}= require('../Authentication/login')

const verify= require('../Authentication/verify')
const {getandDeleteValidation }=require('../Authentication/validation');
router.delete('/',verify,async (req,res) =>{
    try{

        const {error} =getandDeleteValidation (req.body);
        if(error) return res.status(400).send(error.details[0].message)

        const useremail = await User.findOne({email: req.body.email});
        if(!useremail) return res.status(400).send('User not found');
        else if(req.body.email!==updateuserid())res.send('user not match')
        else{
            const user = await User.findOneAndRemove(req.body.email);
            res.send(user);
        }
    }
    catch(err){
        return  res.status(400).send('not login');
    }
       
    
    
});

module.exports= router;