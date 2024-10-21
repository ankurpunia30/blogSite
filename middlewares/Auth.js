const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        // Get token from the header
        const token = req.header("token");
        
        if (!token) {
            return res.status(401).json({ error: "No authentication token, authorization denied" });
        }
        
        // Verify token
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        
        // Attach user ID to the request
        req.user = verified.user_id;
        
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: "Token verification failed, authorization denied" });
    }
};

module.exports = { authenticate };
