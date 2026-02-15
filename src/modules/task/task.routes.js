const express = require('express');
const controller = require("./task.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

// Create a new task
router.post("/",
    authMiddleware,
    controller.create
);

// Get all tasks for the authenticated user
router.get("/",
    authMiddleware,
    controller.getMyTasks
)

// Update a task
router.put("/:id",
    authMiddleware,
    controller.update 
)

// Delete a task
router.delete("/:id",
    authMiddleware,
    controller.remove 
)

module.exports = router;