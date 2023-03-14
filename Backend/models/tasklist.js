const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    name : {
        type : String,
        required:true
    },
    description: {
        type : String,
        required : true
    },
    active : {
        type : Boolean
    }
});

const TaskList = mongoose.model("TaskList",taskSchema);
module.exports = TaskList;