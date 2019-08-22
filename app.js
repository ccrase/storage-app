const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup =require('./config/passport-setup');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
var PORT = process.env.PORT || 3000;


//set up to view engine 
app.set('view engine', 'ejs');

//set up cookie session and encrypts 
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //one day
    keys: [keys.session.cookieKey] //encrypts the cookie
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);

//create home route
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(PORT, ()=>{
    console.log('app is now listening for requests on port http://localhost:' + PORT);
})