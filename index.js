const express= require('express');
const app= express();
const dotenv= require('dotenv');
const mongoose = require('mongoose');



//Import Routes

const register= require('./Authentication/register');
const { router }= require('./Authentication/login');
const getRoutes = require('./Routes/Get')
const updateRoutes = require('./Routes/Update')
const deleteRoutes = require('./Routes/Delete')
const posttoken = require('./Authentication/token')



dotenv.config();

// connect to DB


mongoose.connect(process.env.DB_CONNECT,{ keepAlive:true,useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 5000})
.then(x=> console.log('connected'))
.catch(err => console.log('not connected to db'));

//middleware
app.use(express.json());

// Route Midleware

app.use('/api/register', register);
app.use('/api/login', router);
app.use('/api/get', getRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/delete', deleteRoutes);
app.use('/api/posttoken', posttoken);




app.listen(3000,() => console.log('Server running on Port 3000'));