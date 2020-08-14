const express = require('express');
//const { route } = require('./login');
const router = express.Router();
const userModel = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) =>{
    // console.log('currently on hime page');
         res.render('register',{
             title: 'Sign In',
             style: "login.css",
             //topMeal: meal.getTopMeal();
         });
     })
 
router.post("/register", (req, res) => {
    let error_messages = [];
    const {user, email, password, conpassword} = req.body;
    
    if(user===""){
        error_messages[0] = "You must enter your username.";
    }
    if(email===""){
        error_messages[1] = "You must enter a valid email address.";
    }
    if(password===""){
        error_messages[2] = "You must enter a password.";
    }
    else if(password.length<7){
        error_messages[2] = "Password must be atleast 7 characters.";
    }
    if(!(conpassword==password)){
        error_messages[3] = "Password does not match";
    }

    if(error_messages.length > 0){
        res.render("register",{
            title:"Sign In",
            style: "login.css",
            error: error_messages,
            user: user,
            email: email,
        });
    }
    //there are no errors
    else{

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.API);
        const msg = {
        to: `${req.body.email}`,
        from: "ritikbheda13@gmail.com",
        subject: 'Contact Us Form Submit',
        html: 
        `Hi ${req.body.user}<br> This is a registeration confirmation.
        `,
        };   
      
        const newUser = {
            name:req.body.user,
            email: req.body.email,
            password: password,
            isEmployee: false
        } ;

        const user = new userModel(newUser);
        user.save()
        .then(()=>{
            console.log("added successully");
            sgMail.send(msg)
            .then(()=>{
                res.redirect('/dashboard');
            })
            .catch((err)=>{
                console.log(`error while sending the email: ${err}`);
            })
        })
        .catch((err)=>{
            console.log("error while adding to the database");
            console.log(err);
            res.render("register",{
                title: "Sign In",
                style: "login.css",
                user: user,
                error: error_messages,
                email: email,
            });
        })
      
    }
})


module.exports = router;