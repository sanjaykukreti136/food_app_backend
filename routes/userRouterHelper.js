const jwt = require('jsonwebtoken');
const { JWT_KEY }  = require('../secrets');


function protectRoute(req, res , next){
      try{
          if(req.cookies.login){
             let isValid = jwt.verify( req.cookies.login  , JWT_KEY )
             if(isValid){
                 next();
             }else{
                 res.json({ message : "not valid user" })
             }
          }else{
              res.json({ message : " not allowed " })
          }
      }
      catch(err){
          res.json({ message : err.message })
      }
}

module.exports= protectRoute;