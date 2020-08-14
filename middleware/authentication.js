const isLoggedIn = (req, res, next) =>{
    console.log("iihihih");
    console.log(req.session);
    console.log("iihihih");

    if(req.session.userInfo){
        next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = isLoggedIn;