function protectRoute(req, res , next){
    if(req.cookies.login == '1234'){
        next();
    }else{
        res.json({ message : "cookie not found" })
    }
}

module.exports= protectRoute;