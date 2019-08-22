const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const connection = require('./connection');

//method takes the user and performs serialize action
passport.serializeUser(function(user, cb) {
    cb(null, user.customer_id);
   });

   passport.deserializeUser(function(customer_id, cb) {
    var sql = "SELECT * FROM customers WHERE customer_id = ?";
    var values = [customer_id];
    connection.query(sql, values, function(err, res){
        if(err) throw err;
        if(res.length > 0){
             return cb(null,res[0]);
        };
    });
    cb(null, null);
   });

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done)=>{
    //passport callback function
    console.log(profile);
    //returns user data in object
    
    var username = profile.displayName;
    var first_name = profile.name.givenName;
    var last_name = profile.name.familyName;
    var google_id = profile.id;

    //check to see if user has been to the site before
    var sql = "SELECT * FROM customers WHERE google_id = ?;";
    var values = [google_id];
    connection.query(sql, values, function(err, res){
        if(err) throw err;
        if(res.length > 0){
             return done(null,res[0]);
        };
        addUser(done);
    });

    //adds a new user into the db 
    function addUser(cb){
        //if they have, RETRIEVE data
        //if they haven't, CREATE a new record
        var sql = "INSERT INTO customers (username, first_name, last_name, google_id) VALUES ?;";
        var values = [[username, first_name, last_name, google_id]];
        connection.query(sql, [values], function(err, res){
            if(err) throw err;
            connection.query("SELECT * FROM customers WHERE customer_id = LAST_INSERT_ID();", function(err, res){
                console.log("Added new user into database" + JSON.stringify(res));
                cb(null, res[0])
            })

        });
    };

 
    
})
);