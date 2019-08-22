const router = require('express').Router();

const authCheck = (req, res, next) =>{
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }else{
        //if they are logged in
        next();
    }
};

router.get('/', authCheck, (req,res) =>{
    //profile page will render here! passing in the user object with all of the details 
    //send in a view here
    res.render('profile', {user:req.user});
});

module.exports = router;