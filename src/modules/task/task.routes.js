const express = require('express');
const controller = require("./task.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createTaskSchema, updateTaskSchema } = require("./task.validation");

const router = express.Router();

// Get all tasks for the authenticated user
router.get("/",
    authMiddleware,
    controller.getMyTasks
)

// Create a new task
router.post("/",
    authMiddleware,
    validate(createTaskSchema),
    controller.create
);


// Update a task
router.put("/:id",
    authMiddleware,
    validate(updateTaskSchema),
    controller.update 
)

// Delete a task
router.delete("/:id",
    authMiddleware,
    controller.remove 
)

module.exports = router;