const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/env");

function authMiddleware(req,res,next){
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({
            message : "Unauthorized"
        });
    }

    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    }
    catch(err){
        return res.status(401).json({
            message : "Invalid token"
        });
    }
}

module.exports = authMiddleware;