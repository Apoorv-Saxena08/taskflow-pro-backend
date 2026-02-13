//Business logic for user operations

const bcrypt = require('bcrypt');
const userRepo = require("./user.repository");

async function registerUser({name , email , password}){
    //Check if user already exists
    const existing = await userRepo.findByEmail(email);

    if(existing){
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // here 10 is salt rounds , more salt , more secure , less fast

    const result = await userRepo.createUser({
        name , email , 
        password: hashedPassword,
        createdAt : new Date()
    });

    return result;
}

module.exports = {
    registerUser
}