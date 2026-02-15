//we do real authorization in the controller, so we can just use the userId from the controller


//CRUDoperations for Task
const taskRepo = require("./task.repository");

async function createTask(data,user){
    return await taskRepo.createTask({
        ...data,
        userId:user.userId // yhn ._id bhi aa skta h 
    });
}

async function getMyTasks(user){
    return await taskRepo.findTasksByUser(user.userId);
}

async function updateTask(taskId,updateData,user){
    const task = await taskRepo.findTaskById(taskId);

    if(!task){
        throw new Error("Task not found");
    }

    if(task.userId.toString() !== user.userId){
        throw new Error("Unauthorized");
    }//ye check krne k liye ki jo task update krna chah rhe h wo usi user ka h ya nhi

    return await taskRepo.updateTask(taskId,updateData);
}

async function deleteTask(taskId,user) {
    const task = await taskRepo.findTaskById(taskId);

    if(!task){
        throw new error("Task not found");
    }

    if(task.userId.toString() !== user.userId){
        throw new Error("Unauthorized");
    }

    return await taskRepo.deleteTask(taskId);
}

module.exports = {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask
};