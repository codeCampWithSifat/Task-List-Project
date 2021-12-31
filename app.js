let form = document.querySelector("#task_form");
let newTaskInput = document.querySelector("#new_task");
let taskFilterInput = document.querySelector("#task_filter");
let tasks = document.querySelector("#tasks");
let clearTaskBtn = document.querySelector("#clear_task_btn");


// add event listener 
form.addEventListener("submit" , addTask)
clearTaskBtn.addEventListener("click", clearTask)
taskFilterInput.addEventListener("keyup",filterTask);


// add function

// add task
function addTask (e) {
   if (newTaskInput.value === "") {
       alert("Please Add Your Task")
   } else {
       let li = document.createElement("li");
       li.appendChild(document.createTextNode(newTaskInput.value + " "));
       let link = document.createElement("a");
       link.setAttribute("href", "#");
       link.innerText = "x";
       li.appendChild(link);
       tasks.appendChild(li);

       newTaskInput.value = ""
   }
    e.preventDefault();
};


// remove task from the clear button 
function clearTask () {
    tasks.innerHTML = ""
};


// finding the filter item 
function filterTask (e) {
   const text = e.target.value.toLowerCase();
   const tasks = document.querySelectorAll("li");
   tasks.forEach(task => {
       let item = task.firstChild.textContent ;
       if (item.toLowerCase().indexOf(text) !== -1){
           task.style.display = "block";
       } else {
           task.style.display = "none";
       }
   });
};

// Remove task Unordered List
