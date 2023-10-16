
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const AddTaskn=require("./models/addtask");
const {todoList,addTask,completeTask,removeTask} = require("./controller/function");
//gZ1G1jPDnaxsk8dt
const mongoose=require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// const todoList = {
//  todo: ["do Node.js", "do AWS", "play games"],
//   workDone: ["read a book"],
// };

const database=()=>{
  const connectionparams={
    useNewUrlParser:true,
    useUnifiedTopology:true,

  }
  try{
    mongoose.connect('mongodb+srv://souravsingh1452001:gZ1G1jPDnaxsk8dt@cluster0.ck4f85i.mongodb.net/?retryWrites=true&w=majority',
    connectionparams
    );
    console.log("Databse connected succesfully");
  }catch(error){
    console.log("Database connection failed");
  }
}
database();
app.post("/addtask", (req, res) => {
  // const newwork = req.body.newtask;
  // console.log(newwork);
  // todoList.todo.push(newwork);
  // res.redirect("/");
  addTask(req,res);
});
app.get("/insert",(req,res)=>{
  var addTaskn=new AddTaskn();
  addTaskn.name="readbook";
  addTaskn.type=false;
  addTaskn.save((err,data)=>{
    if(err){
      console.error(err);
    }else{
      res.status(200).send({"msg":"Insertd"});
    }
  })
})
app.post("/completetask", (req, res) => {
  // const getTask = req.body.check;
  // console.log(todoList.workDone);
  // if (typeof getTask === "string") {
  //   todoList.workDone.push(getTask);
   
  //   const index = todoList.todo.indexOf(getTask);
   
  // }  else if (typeof getTask=== "object") {
  //   for (var i = 0; i < getTask.length; i++) {
  //       todoList.workDone.push(getTask[i]);
  //       todoList.todo.splice(todoList.todo.indexOf(getTask[i]), 1);
  //   }

  // }
  // res.redirect("/");
  completeTask(req,res);
});
app.post("/removetask",(req,res)=>{
    // const getTask=req.body.check;
    // console.log(getTask);

    // if (typeof getTask === "string") {
    //     const index = todoList.todo.indexOf(getTask);
    //     todoList.todo.splice(index, 1);
       
       
    //   }  else if (typeof getTask=== "object") {
    //     for (var i = 0; i < getTask.length; i++) {
         
    //         todoList.todo.splice(todoList.todo.indexOf(getTask[i]), 1);
    //     }
    
    //   }
    // res.redirect("/");
    removeTask(req,res);
});

app.get("/", (req, res) => {
  res.render("index", {todo: todoList.todo, workDone: todoList.workDone });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


