const loadDashboard = (req, res, next) =>{
    if( req.session.userInfo.type == "admin"){
        res.render("admindashboard");
    }
    else{
        res.render("dashboard");
    }
}

module.exports = loadDashboard;