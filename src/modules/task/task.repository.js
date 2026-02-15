const Task = require("./task.model");

async function createTask(data) {
    return await Task.create(data);
}

async function findTasksByUser(userId) {
    return await Task.find({ userId }).sort({ createdAt: -1 }); //if user has many tasks, this will return the most recent ones first
}

async function findTaskById(id) {
    return await Task.findById(id);
}

async function updateTask(id, updateData) {
    return await Task.findByIdAndUpdate(id,updateData,{ new: true }); //new:true returns the updated document
}

async function deleteTask(id) {
    return await Task.findByIdAndDelete(id);
}

module.exports = {
    createTask,
    findTasksByUser,
    findTaskById,
    updateTask,
    deleteTask
};