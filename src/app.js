// yhn bnega express app
const express = require('express');
const userRoutes = require("./modules/user/user.routes");
const taskRoutes = require("./modules/task/task.routes");
const app = express();
const authMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(express.json()); // for parsing application/json

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