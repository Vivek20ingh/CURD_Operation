const { boolean } = require('@hapi/joi');
const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        max: 255,
        min: 4
        
    },
    password:{
        type:String,
        required: true,
        min: 4,
        max: 255
    },
    name:{
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    username:{
        type: String,
        required: true,
        max: 255,
        min: 4
       
    },
    country: {
        type:String,
        required: true,
        max: 255,
        min: 4
        
    },
    city:{
        type: String,
        required: true,
        max: 255,
        min: 4
       
    }
});

module.exports = mongoose.model('User', userSchema);