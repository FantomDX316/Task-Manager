const mongoose = require("mongoose");
const {Schema} = mongoose;

const tasksSchema = new Schema({
    taskListName:{
        type:String
    },
    taskName:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    dueDate:{
        type: Date
    },
    period:{
        type: Date
    },
    periodType:{
        type: String
    },
    taskListID:{
        type: Schema.Types.ObjectID,
        ref:'TaskList'
    }
});

const Tasks  = mongoose.model('Tasks',tasksSchema);
module.exports = Tasks;