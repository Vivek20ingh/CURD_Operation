const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { valid } = require('@hapi/joi');

const {loginValidation}=require('./validation');
let refreshTokens= [];
let userid;

router.post('/',async (req,res) => {
// Lets validate
   const {error} =loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message)

    // checking if email exit
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');

    // password is correct
    const validpass= await bcrypt.compare(req.body.password, user.password);
    if(!validpass) return res.status(400).send('Invalid Password')

    // create ans assign token 
    const accessToken = jwt.sign({_id: user._id},process.env.TOKEN_SECRET,{ expiresIn: '100s' })
    const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    userid=req.body.email;
    res.send({ accessToken: accessToken, refreshToken: refreshToken} )
   
})


const updateuserid =() =>{
    return userid;
}
const updaterefreshToken=()=>{
    return refreshTokens;
}
module.exports = { router,updateuserid,updaterefreshToken };
