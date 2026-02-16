// yhn bnega express app
const express = require('express');
const userRoutes = require("./modules/user/user.routes");
const taskRoutes = require("./modules/task/task.routes");
const helmet = require("helmet"); //SECURITY of Headers to prevent from XSS,Clickjacking,MIME sniffing,Content injection attacks
const morgan = require("morgan"); //LOGGING
const rateLimit = require("express-rate-limit"); // to limit the number of requests from a single IP
// 10,000 login attempts ,API spamming ,DDOS behavior ,Rate limiting blocks excessive requests.

const cors = require("cors"); // to enable CORS (Cross-Origin Resource Sharing) for frontend-backend communication

const mongoSanitize = require("express-mongo-sanitize"); // to prevent NoSQL injection attacks

const authMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(helmet()); // for security headers

//Real companies depends on LOGS , vhn console krke ni dekh skte
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

if(process.env.NODE_ENV === "production"){
    // app.use(morgan("combined"));
    //security rules
}

const limiter = rateLimit({
    max:100 , // max number of requests
    windowMs: 15*60*1000, // 15 minutes
    message: "Too many requests from this IP, please try again after 15 minutes"
})
// Now:
// 100 requests per 15 minutes per IP
// After that → blocked
// Production-grade behavior.

app.use("/api",limiter); // Apply rate limiting to all API routes 

//app.use(cors()); // Enable CORS for all routes
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
}));

//more secure version 
// app.use(cors({
//     origin: process.env.CLIENT_URL || "*",
//     credentials: true
// }));
// Later in production:

// CLIENT_URL=https://yourfrontend.com

app.use(express.json()); // for parsing application/json

app.use(mongoSanitize()); // to prevent NoSQL injection attacks

//All routes here

app.get("/health", (req,res)=>{
    res.json({status: "ok"});
})

app.use("/api/users", userRoutes)
app.use("/api/tasks",taskRoutes); 

//TEsting an protected api 
app.get("/api/protected" ,
    authMiddleware,
    (req,res)=>{
        res.json({
            message : "This is a protected route",
            user : req.user
        });
    }
);

// {
//   "name": "Apoorv",
//   "email": "apoorv@test.com",
//   "password": "123456"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OThmMDcwMmQ3NjU3ODg0ZWRmZjMxZWYiLCJlbWFpbCI6ImFwb29ydkB0ZXN0LmNvbSIsImlhdCI6MTc3MTAwMjY1MSwiZXhwIjoxNzcxMDA2MjUxfQ.ZY8pxnmoxa25y00u7-ifbuvUhP_S8Y6YAJBQHR1Aor0

// Error handling middleware (must be last)
app.use(errorMiddleware);

module.exports = app;