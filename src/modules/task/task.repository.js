const Task = require("./task.model");

async function createTask(data) {
    return await Task.create(data);
}
//find all tasks for a specific user, sorted by creation date in descending order
//lets aply paging,filtering,sorting,search,better query handling 
// Imagine user has:
// 10,000 tasks
// You cannot return all tasks.
// That kills performance.
// Real apps always paginate

async function findTasksByUser(userId, options) {
    const { page, limit, completed , sort} = options;
    const filter = {userId};

    if (completed !== undefined) {
        filter.completed = completed;
    }

    const skip = (page - 1) * limit;
    return await Task.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);
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