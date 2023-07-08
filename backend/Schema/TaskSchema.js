const mongoose =require("mongoose");
const {Schema} =mongoose;

const TaskSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    due_date:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    assigned:{
        type:Boolean,
        default:false
    },
    userslist:{
        type:Array,
        default:[]
    }
})
const Task=mongoose.model('Task',TaskSchema)
module.exports=Task;