const express = require("express");
const router = express.Router();
const TaskListModel = require("../models/tasklist");
const TasksModel = require("../models/tasks");
const createTaskMiddleware = require("../middlewares/createTaskMiddleware")



//ROUTE 1 - Create task list ( http://localhost:5000/api/createtasklist )

router.post("/createtasklist",async (req,res)=>{
    try{

    const {name,description,active} = req.body;
    const TaskList = new TaskListModel({
        name,description,active
    });
    const listItem = await TaskList.save();
    res.json({"success":true,"id":listItem.id});
    }catch(error){
        res.status(500).json({"error":"Internal Server Error"});
        console.log(error);
    };
    

});



// ROUTE 2 - Create tasks ( http://localhost:5000/api/createtask )

// set taskListID as header key with value as the document id of taskList inorder to be able to create a task
// Example = "taskListID":"sadh23hhu3uh25h23h"

router.post("/createtask",createTaskMiddleware,async (req, res)=>{
    const {taskName,description,period,periodType,taskListID} = req.body;
    const dueDate = req.dueDate;
    const TaskList = await TaskListModel.findById(taskListID);
    taskListName = TaskList.name;
   
    const task = new TasksModel({
        taskListName,taskName,description,dueDate,period,periodType,taskListID
    });
    task.save().then((task)=>{res.json(task)});
    
});


//ROUTE 3 - List task ( http://localhost:5000/api/tasklist )

// here we need to provide the TaskList id inorder to fetch all the tasks 

router.get("/tasklist/:id",async (req,res)=>{
    try{

    let {page,limit}  = req.query;
    if(!page){
        page = 1;
    }else if(!limit){
        limit = 5;
    }else if(!page && !limit){
        page = 1;
    }   
    const Task = await TasksModel.find({taskListID:req.params.id},{taskListName:1,taskName:1,description:1,periodType:1,period:1,dueDate:1}).skip((page-1)*limit).limit(limit);
    
    const taskItems = Task.map((item)=>{
         const dueDateIST = `${item.dueDate.getDate()}-${item.dueDate.getMonth()+1}-${item.dueDate.getFullYear()}`;
         
        
        return {...item._doc,dueDate:dueDateIST};
         
    });
    const tasks = {taskCount:taskItems.length,tasks:taskItems};

    res.status(200).json(tasks);
    
    }catch(error){
        res.status(500).json({"success":"false"})
    }
    
})

module.exports = router;