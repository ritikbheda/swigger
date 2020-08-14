const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const clientSession = require('client-sessions');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

router.use(clientSession({
    cookieName: "session",
    secret: "swigger_login",
    duration: 2*60*1000,
    activeDuration: 60*1000
}));



router.get('/login', (req, res) => {
    res.render("login",{
        title: "login",
        style: "login.css"

    });
    //console.log('you are in login pafe');
});
router.post('/login', (req, res) => {
    let error_messages = [];
    
    const {email, password} = req.body;
    
    if(password===""){
        error_messages[1] = "You must enter a password.";
    }
    if(email===""){
        error_messages[0] = "You must enter a valid email address.";
    
    if(error_messages.length > 0){
        res.render("login",{
            title: "login",
            style: "login.css",
            email: req.body.email,
            error: error_messages,
        //    password: password,
    
        });
    }
    }
    else{
        
        userModel.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if(!user){
                error_messages[0] = "no such email in database"
            
                if(error_messages.length > 0){
                    console.log("I am here");
                    res.render("login",{
                        title: "login",
                        style: "login.css",
                        email: req.body.email,
                        password: password,
                        error: error_messages
                    });     
                }
            }
             else{
                if(!(bcrypt.compareSync(req.body.password, user.password))){
                    error_messages[1] = "incorrect password";
                
                    if(error_messages.length > 0){
                        res.render("login",{
                            title: "login",
                            style: "login.css",
                            email: req.body.email,
                            password: password,
                            error: error_messages
                        });     
                    }
                }
                else{

                // req.session.user = {
                //    email: email,
                //    password: password
                // }
                req.session.userInfo = user;

                    if(req.session.userInfo){
                        console.log(req.session.user);
                        res.redirect("/dashboard");
                    }
                    else{
                        res.redirect("/");
                    }
                }
               
            }
            
            
        })
        .catch(err => {
            // console.log(`there were errors ${err}`);
        })





 
    }
});


router.get('/logout',(req, res) => {
    req.session.destroy(); 
    res.redirect("login");
});

module.exports = router;