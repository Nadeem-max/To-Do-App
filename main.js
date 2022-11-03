let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

//Empty Array to store Task
let arrayOfTasks = [];

// check if there is tasks in local srorege
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//trigger Get Data from local storge function
getDataFromLocalStoregr();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArry(input.value); // Add Task to Tasks
    input.value = ""; //Empty Input field
  }
};

//click on task element
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    //remove task from local storeg
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element from the page
    e.target.parentElement.remove();
  }
  // Task element
  if(e.target.classList.contains("task")){
     //toggle complated for the task
     toggleStatusTaskWith(e.target.getAttribute("data-id"))
    // toggle to done class
    e.target.classList.toggle("done")

  }

});

function addTaskToArry(TaskText) {
  // Task data
  const task = {
    id: Date.now(),
    title: TaskText,
    complated: false,
  };
  // push the task to array of tasks
  arrayOfTasks.push(task);
  // add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // Add task To Local
  addDataToLocalFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  taskDiv.innerHTML = "";
  //looping on array Of Tasks
  arrayOfTasks.forEach((task) => {
    //create main Div
    let div = document.createElement("div");
    div.className = "task";
    //check if task is done
    if (task.complated) {
      div.className = "task done";
    }
    
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // creat delete button
    let span = document.createElement("span");
    span.classList.add("del");
    span.appendChild(document.createTextNode("Delete"));
    //append button to main div
    div.appendChild(span);
    // Add task to tasks container
    taskDiv.appendChild(div); 
  });
}

function addDataToLocalFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStoregr() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
  for(let i = 0; i<arrayOfTasks.length; i++){
       if(arrayOfTasks[i].id == taskId){
        arrayOfTasks[i].complated == false ?arrayOfTasks[i].complated = true : arrayOfTasks[i].complated = false
       }
  }
  addDataToLocalFrom(arrayOfTasks)
}