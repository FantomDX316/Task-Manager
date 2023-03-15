


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
    next();
};
module.exports = createTaskMiddleware;