//Handles req/res for user routes

const userService = require("./user.service");

async function register(req,res) {
    try{
        const result = await userService.registerUser(req.body);

        res.status(201).json({
            message : "User registered successfully",
            userId : result.insertedId
        })


    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
}

module.exports = {
    register
};