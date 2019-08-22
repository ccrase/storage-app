const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res)=>{
    res.render('login');
});

//auth logout
router.get('/logout', (req, res) =>{
    //handle with passport
    res.send('logging out');
})

//auth with google setting the strategy
router.get('/google', passport.authenticate('google', {
    //what data to capture from the user
    scope: ['profile']
}));

//callback route for google to redirect to.
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //the user is NOW logged in
    //res.send(req.user);
    res.send('you reached the callback URI');
});

module.exports = router;