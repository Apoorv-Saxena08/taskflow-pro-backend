const taskService = require("./task.service");
const asyncHandler = require("../../utils/asyncHandler");

const create = asyncHandler(
    async (req,res)=>{
        const task = await taskService.createTask(req.body,req.user);
        res.status(200).json({
            success:true,
            data:task,
            results:task.length
        });
    }
)

// async function create(req,res) {
//     try{
//         const task = await taskService.createTask(req.body,req.user);
//         res.status(201).json({
//             success:true,
//             data:task
//         });
//     }
//     catch(error){
//         next(error);
//     }
// }
//apply paging , filtering,sorting to getMyTasks
const getMyTasks = asyncHandler(
    async (req,res)=>{
        const tasks = await taskService.getMyTasks(req.user,req.query);
        res.status(200).json({
            success:true,
            data:tasks,
            results:tasks.length
        });
    }
)

// async function getMyTasks(req,res) {
//     try{
//         const tasks = await taskService.getMyTasks(req.user);
//         res.json({
//             success:true,
//             data:tasks
//         });
//     }
//     catch(error){
//         next(error);
//     }
// }

const update = asyncHandler(
    async (req,res)=>{
        const updated = await taskService.updateTask(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json({
            success:true,
            data:updated,
            results:updated ? 1 : 0
        });
    }
)

// async function update(req,res) {
//     try{
//         const updated = await taskService.updateTask(
//             req.params.id,
//             req.body,
//             req.user
//         );

//         res.json({
//             success:true,
//             data:updated
//         });
//     }
//     catch(error){
//         next(error);
//     }
// }

const remove = asyncHandler(
    async (req,res)=>{
        await taskService.deleteTask(req.params.id,req.user);
        res.json({
            success:true,
            message:"Task deleted successfully",
            results:1
        });
    }
)

// async function remove(req,res){
//     try{
//         await taskService.deleteTask(req.params.id,req.user);
//         res.json({
//             success:true,
//             message:"Task deleted successfully"
//         });
//     }
//     catch(error){
//         next(error);
//     }
// }

module.exports = {
    create,
    getMyTasks,
    update,
    remove
};