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

router.post("/createtask",createTaskMiddleware,(req, res)=>{
    const {taskName,description,dueDate,period,periodType,taskListID} = req.body;
   
    const task = new TasksModel({
        taskName,description,dueDate,period,periodType,taskListID
    });
    task.save().then((task)=>{res.json(task)});
    
});


//ROUTE 3 - List task ( http://localhost:5000/api/tasklist )

// router.get("/tasklist",(req,res)=>{

// })

module.exports = router;