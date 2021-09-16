const router = require('express').Router();
const User = require('../model/User');
const {updateuserid}= require('../Authentication/login')

const verify= require('../Authentication/verify')

const { getandDeleteValidation }= require('../Authentication/validation');

router.get('/',verify,async (req,res) =>{
    try
    {
        const {error} = getandDeleteValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)
    
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.send('user not found')
        else if(req.body.email!==updateuserid())res.send('user not match')
        else res.json({posts: {name: user.name, username: user.username,country: user.country,city: user.city}})
    }catch(err)
    {
        res.status(500).send('not login');
    }
});

module.exports= router;