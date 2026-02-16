//we do real authorization in the controller, so we can just use the userId from the controller

const AppError = require("../../utils/AppError");

//CRUDoperations for Task
const taskRepo = require("./task.repository");

async function createTask(data,user){
    return await taskRepo.createTask({
        ...data,
        userId:user.userId // yhn ._id bhi aa skta h 
    });
}
//applied pagination and limit to getMyTasks, also added filtering by completed status and sorting by createdAt
async function getMyTasks(user,query){
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;

    const completed = query.completed === 'true' ? true : query.completed === 'false' ? false : undefined;

    const sort = query.sort || { createdAt: -1 };
    return await taskRepo.findTasksByUser(user.userId, { page, limit, completed, sort });
}

async function updateTask(taskId,updateData,user){
    const task = await taskRepo.findTaskById(taskId);

    if(!task){
        throw new AppError("Task not found",404);
    }

    if(task.userId.toString() !== user.userId){
        throw new AppError("Unauthorized",403);
    }//ye check krne k liye ki jo task update krna chah rhe h wo usi user ka h ya nhi

    return await taskRepo.updateTask(taskId,updateData);
}

async function deleteTask(taskId,user) {
    const task = await taskRepo.findTaskById(taskId);

    if(!task){
        throw new AppError("Task not found",404);
    }

    if(task.userId.toString() !== user.userId){
        throw new AppError("Unauthorized",403);
    }

    return await taskRepo.deleteTask(taskId);
}

module.exports = {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask
};