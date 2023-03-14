const createTaskMiddleware = (req,res,next)=>{
    const id = req.header("id");
    req.body.taskListID = id;
    next();
};
module.exports = createTaskMiddleware;