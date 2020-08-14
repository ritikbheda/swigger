const isAdmin = (req, res, next) => {

    if(req.session.userInfo){
        if(req.session.userInfo.isEmployee){
           next();
        }
        else{
            next();
        }
    }
}

module.exports = isAdmin;