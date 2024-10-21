//middleware for authentication
//check if the user is authenticated 
//if not, redirect to login page
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  
    try{
        const token=req.header('x-auth-token');
        // console.log(token);
        
        if(!token){
            return res.status(401).json({error:"No authentication token, authorization denied"});
        }
        
        const verified=jwt.verify(token,process.env.TOKEN_KEY);
        
        if(!verified){
            return res.status(401).json({error:"Token verification failed, authorization denied"});
        }
        
        req.user=verified.user_id;
        
        next();

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { authenticate };
