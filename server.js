const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
//const fs = require('fs');
const session = require('client-sessions');
const isLoggedIn = require("../assignment1/middleware/authentication");
const isAdmin =require("../assignment1/middleware/admin");

require('dotenv').config({path:"./config/keys.env"})
var bodyParser = require('body-parser')
let mongoose = require('mongoose');
let password = encodeURIComponent(process.env.xxx);  
mongoose.connect(`mongodb+srv://swiggerCompany:${password}@cluster0.w3igo.mongodb.net/swiggerCompany?retryWrites=true&w=majority`,{ useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true });


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

app.use(session({
    cookieName: "session",
    secret: "swigger_login",
    //duration: 2*60*1000,
    //activeDuration: 60*1000
}))

// app.use((req, res, next) =>{
//    req.session.userInfo = {};
// })

const login = require('./controller/login.js');
const register = require('./controller/register.js');
const meals = require('./controller/meal.js');
const mealModel = require('./model/meal');
const { title } = require('process');

session.userInfo = null;
app.get('/', (req, res) =>{
   // console.log('currently on hime page');
//   req.session.userInfo = null;


mealModel.find({})
.then((item)=>{
    const filteredProducts = item.map(product=>{
        return {
            id: product._id,
            title: product.title,
            price: product.price,
            desc: product.desc,
            imgAddress: product.imgAddress
        }
    });

    res.render("home", {
        title: "SWIGGERS",
        style: 'home.css',
        data: filteredProducts
    });
});

})

app.get('/dashboard', isLoggedIn, isAdmin, (req, res) => {
    console.log("here");
    res.render('dashboard', {
        title: "dashboard page"
        
    })
})


app.get('/admindashboard', isLoggedIn, (req, res) => {
    console.log("here");
    res.render('admindashboard', {
        title: "admindashboard page"
        
    })
})

app.use('/', login, register, meals);


app.listen(process.env.PORT||3000, () => {
    console.log('this server is ruuning on port 3000');
});