const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const fs = require('fs');
require('dotenv').config({path:"./config/keys.env"})
var bodyParser = require('body-parser')
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const path = require('path');
const meal = require('./model/meal');

// app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.set("views", "./views");
app.engine('.hbs', exphbs({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname,'/public')));


app.get('/', (req, res) =>{
   // console.log('currently on hime page');
        res.render('home',{
            title: 'SWIFFERS',
            style: 'home.css',
            topMeal: meal.getTopMeal()
        });
    })

app.get('/meal', (req, res) => {
    res.render("meal", {
        title: "meal",  
         style: 'home.css',
        allMeal: meal.getAllMeals(),

    });
    //onsole.log('you are on the mael pakages page.');
});

app.get('/login', (req, res) => {
    res.render("login",{
        title: "login",
        style: "login.css",
        email:"",
        err_email: "",
        pass: "",
        err_pass: "",

    });
    //console.log('you are in login pafe');
});
app.post('/login', (req, res) => {
    let er_email=[];
    let er_pass=[];

    if(req.body.email===""){
        er_email.push("You must enter a valid email address.");
    }
    if(req.body.password===""){
        er_pass.push("You must enter a password.");
    }

    if( er_pass.length>0 || er_email.length>0 ){
        res.render("login",{
            title: "login",
            style: "login.css",
            email:req.body.email,
            err_email: er_email,
            pass: req.body.pass,
            err_pass: er_pass,
    
        });
    }

    else{
        
        res.redirect("/");

 
    }
});

app.get('/register', (req, res) =>{
    // console.log('currently on hime page');
         res.render('register',{
             title: 'Sign In',
             style: "login.css",
             err_user: "",
             user:"",
             err_email: "",
             email:"",
             err_pass: "",
             err_conpass: "",
             pass: "",
             conpass:"",
             //topMeal: meal.getTopMeal();
         });
     })
 
app.post("/register", (req, res) => {
    let er_user=[];
    let er_email=[];
    let er_pass=[];
    let er_conpass=[];
    if(req.body.user===""){
        er_user.push("You must enter your username.");
    }

    if(req.body.email===""){
        er_email.push("You must enter a valid email address.");
    }
    if(req.body.password===""){
        er_pass.push("You must enter a password.");
    }
    else if(req.body.password.length<7){
        er_pass.push("Password must be atleast 7 characters.");
    }
    if(!(req.body.conpassword==req.body.password)){
        er_conpass.push("Password does not match");
    }
    if( er_user.length>0 || er_email.length>0 || er_pass.length>0 ||er_conpass.length>0 ){
        res.render("register",{
            title:"Sign In",
            err_user: er_user, style: "login.css",
            user:req.body.user,
            err_email: er_email,
            email:req.body.email,
            err_pass: er_pass,
            err_conpass: er_conpass,
            pass: req.body.pass,
            conpass: req.body.conpass,

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
    
        //Asynchornous operation (who don't know how long this will take to execute)
        sgMail.send(msg)
        .then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });
    


    }
})


app.listen(process.env.PORT||3000, () => {
    console.log('this server is ruuning on port 3000');
});