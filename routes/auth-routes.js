const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res)=>{
    res.render('login', {user:req.user});
});

//auth logout
router.get('/logout', (req, res) =>{
    //handled with passport
    req.logout()
    //redirect to the homepage
    res.redirect('/');
    console.log("user is now logged out");
})

//auth with google setting the strategy
router.get('/google', passport.authenticate('google', {
    //what data to capture from the user
    scope: ['profile']
}));

//callback route for google to redirect to.
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //the user is NOW logged in
    res.redirect('/profile/');
});

module.exports = router;