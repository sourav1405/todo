
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const todoList = {
 todo: ["do Node.js", "do AWS", "play games"],
  workDone: ["read a book"],
};


app.post("/addtask", (req, res) => {
  const newwork = req.body.newtask;
  console.log(newwork);
  todoList.todo.push(newwork);
  res.redirect("/");
});

app.post("/completetask", (req, res) => {
  const getTask = req.body.check;
  console.log(todoList.workDone);
  if (typeof getTask === "string") {
    todoList.workDone.push(getTask);
   
    const index = todoList.todo.indexOf(getTask);
   
  }  else if (typeof getTask=== "object") {
    for (var i = 0; i < getTask.length; i++) {
        todoList.workDone.push(getTask[i]);
        todoList.todo.splice(todoList.todo.indexOf(getTask[i]), 1);
    }

  }
  res.redirect("/");
});
app.post("/removetask",(req,res)=>{
    const getTask=req.body.check;
    console.log(getTask);

    if (typeof getTask === "string") {
        const index = todoList.todo.indexOf(getTask);
        todoList.todo.splice(index, 1);
       
       
      }  else if (typeof getTask=== "object") {
        for (var i = 0; i < getTask.length; i++) {
         
            todoList.todo.splice(todoList.todo.indexOf(getTask[i]), 1);
        }
    
      }
    res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", {todo: todoList.todo, workDone: todoList.workDone });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
