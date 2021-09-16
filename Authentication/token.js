const router = require('express').Router();

const jwt = require('jsonwebtoken')


const {updaterefreshToken}= require('./login')

router.post('/', async (req,res) => {
    const refreshToken= req.body.refreshToken
    if(refreshToken== null)res.sendStatus(401)
    if(!updaterefreshToken().includes(refreshToken))return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,updateuserid) =>{
        if(err)return res.sendStatus(403)
        const accessToken = jwt.sign({_id: updateuserid._id},process.env.TOKEN_SECRET,{ expiresIn: '100s' })
        res.json({accessToken: accessToken})
    })
})

module.exports= router;