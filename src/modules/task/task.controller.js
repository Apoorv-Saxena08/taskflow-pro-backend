const taskService = require("./task.service");

async function create(req,res) {
    try{
        const task = await taskService.createTask(req.body,req.user);
        res.status(201).json({
            success:true,
            data:task
        });
    }
    catch(error){
        next(error);
    }
}

async function getMyTasks(req,res) {
    try{
        const tasks = await taskService.getMyTasks(req.user);
        res.json({
            success:true,
            data:tasks
        });
    }
    catch(error){
        next(error);
    }
}

async function update(req,res) {
    try{
        const updated = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user
        );

        res.json({
            success:true,
            data:updated
        });
    }
    catch(error){
        next(error);
    }
}

async function remove(req,res){
    try{
        await taskService.deleteTask(req.params.id,req.user);
        res.json({
            success:true,
            message:"Task deleted successfully"
        });
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    create,
    getMyTasks,
    update,
    remove
};