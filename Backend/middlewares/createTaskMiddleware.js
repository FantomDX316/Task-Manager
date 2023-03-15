


const createTaskMiddleware = (req, res, next) => {
    /* Tasks is to be created with 
these fields - Task name, description, due date, period, period type, task list id. Date is 
provided in request in Indian format i.e. dd-mm-yyyy but is required to be saved in ISO date 
format. Period type can be monthly, quarterly or yearly. Should have below validations a) If 
period type is monthly than period should be like Apr 2022 or May 2022 or so on. Same for 
monthly and yearly. b) due date should be after end of period. For example if period is Apr 
2022 then date should be 1st May 2022 or later.*/

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