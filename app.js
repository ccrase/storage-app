const express = require('express');
const authRoutes = require('./routes/auth-routes');
const  passportSetup =require('./config/passport-setup');

const app = express();
var PORT = process.env.PORT || 3000;

//set up to view engine 
app.set('view engine', 'ejs');

//set up routes
app.use('/auth', authRoutes);

//create home route
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(PORT, ()=>{
    console.log('app is now listening for requests on port 3000')
})