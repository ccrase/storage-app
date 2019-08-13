const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "",
    database: "storageapp_DB"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("DB connection successful");
});

passport.use(
    new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret

}, (accessToken, refreshToken, profile, done)=>{
    //passport callback function

    //returns user data in object
    var google_id = profile.id;
    var username = profile.displayName;
    var first_name = profile.name.givenName;
    var last_name = profile.name.familyName;
    //check to see if user has been to the site before
    connection.query("SELECT id, username FROM user;", function(err, res){
        for(var i = 0; i < res.length; i++){
            //if the user already exists
            if(res[i].id === google_id){
                console.log("User exists with username = " + res[i].username);
            }else{
                //if the user doesn't exist
                console.log("user doesn't exist. Adding into DB...");
                //function to add the user into the db
                addUser();
            };
        };
    });

    //adds a new user into the db 
    function addUser(){
        //if they have, RETRIEVE data
        //if they haven't, CREATE a new record
        var sql = "INSERT INTO user (google_id, username, first_name, last_name) VALUES ?";
        var values = [[google_id,username,first_name,last_name]];
        connection.query(sql, [values], function(err, res){
            if(err) throw err;
        });
        connection.end();
    };


    
})
);