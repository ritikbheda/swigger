const express= require('express');
const router = express.Router();
const mealModel = require('../model/meal');
const session = require('client-sessions')
const cartModel = require('../model/cart');
const isLoggedIn = require("../middleware/authentication");
const isAdmin =require("../middleware/admin");
const cartM = require('../model/cart');
const { get } = require('mongoose');

router.get('/addMeal',  isLoggedIn, isAdmin, (req, res) =>{
    res.render('addMeal', {
        title: "Add Meal",
        style: "login.css"
    });
})

router.post("/addMeal",isLoggedIn, isAdmin, (req, res) =>{
    let error_messages = [];
    let { title, desc, price,foodCategory, numOFcontains, topMeal, imgAddress} = req.body;
    if(title == ""){
        error_messages[0] = "Please enter meal title";
    }
    if(desc == ""){
        error_messages[1] = "Please enter meal description";
    }
    if(price == ""){
        error_messages[2] = "Please enter meal price";
    }
    if(foodCategory == ""){
        error_messages[3] = "Please enter food category";
    }
    if(numOFcontains == ""){
        error_messages[4] = "Please enter number of contains in the pakage";
    }




    if(imgAddress == ""){
        error_messages[5] = "Please enter meal image address";
    }
    console.log(error_messages);
    if(error_messages.length > 0){
        res.render("addMeal",{
            title: "add Meals",
            title: title,
            desc: desc,
            price: price,
            foodCategory:foodCategory,
            numOFcontains:numOFcontains,
            imgAddress: imgAddress
        });
    }
    else{
        const newMeal = {
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            foodCategory:foodCategory,
            numOFcontains:numOFcontains,
            topMeal: true,
            imgAddress: req.body.imgAddress
        };

        const meal = new mealModel(newMeal);

        meal.save()
        .then(()=>{
            console.log('meal added successfully');
            res.redirect('/MealaddedDashboard');
        })
        .catch((err) =>{
            console.log('there were error while adding to the database');
            console.log(err);
            res.render('/addMeal'); 
        })
    }
})


router.get('/update' ,isLoggedIn, isAdmin, (req, res) => {
    // res.render('update');


    mealModel.find({})
    .then((meals)=>{
        const filteredProducts = meals.map(meal=>{
            return {
                id: meal._id,
                title: meal.title,
                desc:meal.desc,
                price: meal.price,
                foodCategory: meal.foodCategory,
                numOFcontains: meal.numOFcontains,
                imgAddress: meal.imgAddress,
                topMeal: meal.topMeal
    
            }
        });
    
        res.render("meal", {
            title: "update",
            elem: "update",
            style: 'home.css',
            data: filteredProducts
        });

});
    

    // const temp_mealID = req.params.id;

    // mealModel.findOne({_id: temp_mealID})
    // .then((meal) =>{
    //     console.log(meal);

    //     const toReturn = {
    //         id: meal._id,
    //         title: meal.title,
    //         desc:meal.desc,
    //         price: meal.price,
    //         foodCategory: meal.foodCategory,
    //         numOFcontains: meal.numOFcontains,
    //         imgAddress: meal.imgAddress,
    //         topMeal: meal.topMeal
    //     };

    //     res.render('update', {
    //         data: toReturn
    //     });


    // })

})

router.get('/update/:id',isLoggedIn, isAdmin, (req, res) => {


    const temp_mealID = req.params.id;

    mealModel.findOne({_id: temp_mealID})
    .then((meal) =>{
        console.log(meal);

    

        res.render('updateMeal', {
            style:"login.css",
            id: meal._id,
            title: meal.title,
            desc:meal.desc,
            price: meal.price,
            foodCategory: meal.foodCategory,
            numOFcontains: meal.numOFcontains,
            imgAddress: meal.imgAddress,
            topMeal: meal.topMeal
        });


    })






})


router.post('/finalUpdate',isLoggedIn, isAdmin, (req, res) => {

    const temp_mealID = req.body.id;

    let error_messages = [];
    let { title, desc, price,foodCategory, numOFcontains, topMeal, imgAddress} = req.body;
    if(title == ""){
        error_messages[0] = "Please enter meal title";
    }
    if(desc == ""){
        error_messages[1] = "Please enter meal description";
    }
    if(price == ""){
        error_messages[2] = "Please enter meal price";
    }
    if(foodCategory == ""){
        error_messages[3] = "Please enter food category";
    }
    if(numOFcontains == ""){
        error_messages[4] = "Please enter number of contains in the pakage";
    }
    if(imgAddress == ""){
        error_messages[5] = "Please enter meal image address";
    }
    // console.log(error_messages);
    if(error_messages.length > 0){
        

        res.render('updateMeal', {
            style:"login.css",
            id: temp_mealID,
            title: title,
            desc:desc,
            price:price,
            foodCategory:foodCategory,
            numOFcontains: numOFcontains,
            imgAddress: imgAddress,
            topMeal: topMeal
        });
    }
    else{
    
        
    // const temp_mealID = req.params.id;
        // console.log(temp_mealID);
    mealModel.findOne({_id: temp_mealID})
    .then((meal) =>{
        // console.log(meal);
        
        meal.title = title;
        meal.price = price;
        meal.desc = desc;
        meal.foodCategory = foodCategory;
        meal.numOFcontains = numOFcontains;
        //meal.topMeal = topMeal;
        meal.imgAddress= imgAddress;


        meal.save((err) => {
            if(err)
            {console.log(err);
            }
            else{
                console.log("done");   res.redirect('/alter');
            }
        })

    })
    .catch((err) =>{
    console.log(err);}
    )

    }
})

router.get('/delete/:id', isLoggedIn, isAdmin, (req, res) => {
    const temp_mealID = req.params.id;
    mealModel.deleteOne({_id: temp_mealID})
    .then((err)=>{
        console.log("success");
        res.render('alter');
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get('/delete',isLoggedIn, isAdmin, (req, res) => {
    
    mealModel.find({})
    .then((meals)=>{
        const filteredProducts = meals.map(meal=>{
            return {
                id: meal._id,
                title: meal.title,
                desc:meal.desc,
                price: meal.price,
                foodCategory: meal.foodCategory,
                numOFcontains: meal.numOFcontains,
                imgAddress: meal.imgAddress,
                topMeal: meal.topMeal
    
            }
        });
    
        res.render("deleteMeal", {
            title: "delete",
            style: 'home.css',
            data: filteredProducts
        });

});

    
   
})

router.get('/MealaddedDashboard',isLoggedIn, isAdmin, (req, res) => {
    res.render('MealaddedDashboard');
})

router.get('/alter',isLoggedIn, isAdmin, (req, res) =>{
    res.render('alter');
})

router.get('/meal', (req, res) => {
    
    mealModel.find({})
    .then((meals)=>{
        const filteredProducts = meals.map(meal=>{
            return {
                id: meal._id,
                title: meal.title,
                desc:meal.desc,
                price: meal.price,
                foodCategory: meal.foodCategory,
                numOFcontains: meal.numOFcontains,
                imgAddress: meal.imgAddress,
                topMeal: meal.topMeal
    
            }
        });
    
        res.render("meal", {
            title: "update",
            style: 'home.css',
            data: filteredProducts
        });

});
   
    
    //onsole.log('you are on the mael pakages page.');
});

router.get('/description/:id', isLoggedIn, (req, res) =>{
    mealModel.findOne({_id: req.params.id})
    .exec()
    .then((cart) =>{
      //  console.log(cart);
        
        const info = {
            id: cart._id,
            imgAddress: cart.imgAddress,
            title: cart.title,
            price: cart.price,
            desc: cart.desc
        }

        res.render("descMeal", {
            data: info
        });
        
    })

    .catch((err)=>{
        console.log(err);
    })
});


router.post('/addToCart', isLoggedIn, (req, res) =>{

    const temp_userID = req.session.userInfo._id;
    const form = {
        productID: req.body.id,
        quantity: req.body.quantity,
        title: req.body.title, 
        price: req.body.price
    };
    cartModel.findOne({userID: temp_userID})
    .then((cart)=>{
        if(cart){
            console.log(cart);
            let flag = true;
            //console.log(form.productID);
            let i =0;
            while( i<=cart.products.length-1 && flag){
                console.log("*");
                // console.log(cart.products[i]._id);
                if(cart.products[i]._id == req.body.id){
                    console.log(req.body.quantity);
                    cart.products[i].quantity = req.body.quantity;
                    flag = false;
                }
                i++;
                if(!flag){
                    cart.save((err) =>{
                        if(err)
                            console.log(err);
                        else{
                            console.log("done");
                        }
                    })  
                }
                console.log("*");
            }


            if(flag){
                cart.products.push(form);
                cart.save((err) =>{
                    if(err)
                        console.log(err);
                    else{
                        console.log("done2");
                    }
                }) 
            }
        }
        // cart j have ley che
        else{
            const newCart = {
                userID: temp_userID, 
                products : [form]
            };

            var final_cart = new cartModel(newCart);

            final_cart.save()
            .then(() =>{
                // do something
                mealModel.find({})
                .then((meals)=>{
                    const filteredProducts = meals.map(meal=>{
                        return {
                            id: meal._id,
                            title: meal.title,
                            desc:meal.desc,
                            price: meal.price,
                            foodCategory: meal.foodCategory,
                            numOFcontains: meal.numOFcontains,
                            imgAddress: meal.imgAddress,
                            topMeal: meal.topMeal
                
                        }
                    });
                
                    res.render("all", {
                        title: "All meals",
                        style: 'home.css',
                        data: filteredProducts
                    });

                });
            })
            .catch((err) => {
                console.log(`There was an error while saving: ${err}`);
            });
        }
    })


  
    mealModel.find({})
    .then((meals)=>{
        const filteredProducts = meals.map(meal=>{
            return {
                id: meal._id,
                title: meal.title,
                desc:meal.desc,
                price: meal.price,
                foodCategory: meal.foodCategory,
                numOFcontains: meal.numOFcontains,
                imgAddress: meal.imgAddress,
                topMeal: meal.topMeal
    
            }
        });
    
        res.render("all", {
            title: "All meals",
            style: 'home.css',
            data: filteredProducts
        });

});
   
    
});


router.get('/checkout', isLoggedIn, (req, res) =>{
    const temp_userID = req.session.userInfo._id;

    cartModel.findOne({userID: temp_userID})
    .then((cart)=>{
        
        var filteredProducts = [];
        filteredProducts = cart.products.map(product=>{
            return {
                id: product._id,
                quantity: product.quantity,
                title: product.title,
                price: product.price,
                total: product.price * product.quantity
            }
        });
        res.render("checkout", {
            title: "checkout",
            style: 'home.css',
            data: filteredProducts
        });
    })
})

router.get('/checkoutFinal', isLoggedIn, (req, res) => {
    const temp_userID = req.session.userInfo._id;

    cartModel.findOne({userID: temp_userID})
    .then((cart) => {   
        var total = 0;
        for(let i = 0; i<cart.products.length-1;i++){
            total += cart.products[i].quantity * cart.products[i].price;
        }        

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.API);
        const msg = {
        to: `${req.body.email}`,
        from: "ritikbheda13@gmail.com",
        subject: 'Order confirmation',
        html: 
        `Hi ${req.body.user}<br> This is a registeration confirmation email.
        your total was ${total}.
        `,
        };   
    })

    cartModel.deleteOne({userID: temp_userID})
    .then((err)=>{
        console.log('have a good day customer');
        
      


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


})


module.exports = router;