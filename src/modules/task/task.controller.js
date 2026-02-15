const taskService = require("./task.service");

async function create(req,res) {
    try{
        const task = await taskService.createTask(req.body,req.user);
        res.status(201).json(task);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

async function getMyTasks(req,res) {
    try{
        const tasks = await taskService.getMyTasks(req.user);
        res.json(tasks);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

async function update(req,res) {
    try{
        const updated = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user
        );

        res.json(updated);
    }
    catch(error){
        res.status(403).json({error:error.message});
    }
}

async function remove(req,res){
    try{
        await taskService.deleteTask(req.params.id,req.user);
        res.json({message:"Task deleted successfully"});
    }
    catch(error){
        res.status(403).json({error:error.message});
    }
}

module.exports = {
    create,
    getMyTasks,
    update,
    remove
};