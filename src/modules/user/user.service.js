//Business logic for user operations

const bcrypt = require('bcrypt');
const userRepo = require("./user.repository");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../config/env");

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

//login setup krenge using JWT - json web token 
// 🔐 Authentication
// "Who are you?"
// User logs in with email + password.
// If correct → server issues a token.
// 🛂 Authorization
// "What are you allowed to do?"
// User tries to access protected route.
// Server checks token.
// If valid → access granted.
// If not → denied.
// 📘 THEORY PART 2 — What is JWT?
// JWT = JSON Web Token
// It looks like this:
// xxxxx.yyyyy.zzzzz
// It has 3 parts:
// 1️⃣ Header
// 2️⃣ Payload (user data)
// 3️⃣ Signature (security proof)
// Server signs it using:
// JWT_SECRET
// Client stores token and sends it in headers:
// Authorization: Bearer <token>
// Server verifies using same secret.
// Stateless. No sessions stored in DB. Very scalable.

async function loginUser({email , password}){
    const user = await userRepo.findByEmail(email);

    if(!user){
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password,user.password); //same password but hashed in db , so we compare them using bcrypt's compare function

    if(!isMatch){
        throw new Error("Invalid credentials");
    }

    //else assign token to this user
    const token = jwt.sign(
        {userId:user._id , email:user.email},
        JWT_SECRET,
        {expiresIn:"1h"}
    );

    return token;
}
  

module.exports = {
    registerUser,
    loginUser
}