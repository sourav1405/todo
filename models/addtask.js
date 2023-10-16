const mongoose=require("mongoose");
const addTaskN=new mongoose.Schema({
   task: {
        type:String,
        required:true,
    },
    done:{
        type:Boolean,
        required:true

    }
})
const Addtask=mongoose.model("Channel",addTaskN);
module.exports=Addtask;