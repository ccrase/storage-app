const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done)=>{
    //passport callback function

    //returns user data in object
    console.log(profile);
    //check to see if user has been to the site before
    //if they have, RETRIEVE data
    //if they haven't, CREATE a new record
    //STOPPED AT #10. NEXT STEPS: CREATE DATABASE
    
})
);