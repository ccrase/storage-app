require('dotenv').config();
//add this to the .gitignore
module.exports = {
    google:{
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
    }
};