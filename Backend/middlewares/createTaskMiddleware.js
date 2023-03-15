


const createTaskMiddleware = (req, res, next) => {
   

    const taskListID = req.header("taskListID");
    req.body.taskListID = taskListID;
    const {period,periodType} = req.body;
    const periodSlicer = period.split("-");
    // dd-mm-yyyy
    const date = Number(periodSlicer[0]);
    const month = Number(periodSlicer[1]);
    const year = Number(periodSlicer[2]);

    if(periodType.toLowerCase() === "monthly"){
        const Month = month-1;
        const dueDate = new Date(year,Month+1,date);
        req.dueDate = dueDate;
    }else if(periodType.toLowerCase() === "yearly"){
        const Month = month-1;
        const dueDate = new Date(year+1,Month,date);
        req.dueDate = dueDate;
    }else if(periodType.toLowerCase() === "quarterly"){
        const Month = month-1;
        const dueDate = new Date(year,Month+3,date);
        req.dueDate = dueDate;
    }
    next();
};
module.exports = createTaskMiddleware;