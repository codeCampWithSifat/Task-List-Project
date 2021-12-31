let form = document.querySelector("#task_form");
let newTaskInput = document.querySelector("#new_task");
let taskFilterInput = document.querySelector("#task_filter");
let tasks = document.querySelector("#tasks");
let clearTaskBtn = document.querySelector("#clear_task_btn");


// add event listener 
form.addEventListener("submit" , addTask)
clearTaskBtn.addEventListener("click", clearTask)
taskFilterInput.addEventListener("keyup",filterTask);
tasks.addEventListener("click",removeTask)
document.addEventListener("DOMContent" , getTasks)
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

       // store task in local storage 
        storeTaskInLocalStorage(newTaskInput.value);
        newTaskInput.value = "";
   }
    e.preventDefault();
};


// remove task from the clear button 
function clearTask () {
    tasks.innerHTML = "";
    localStorage.clear();
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
function removeTask (e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are You Sure To Remove It")) {
            let ele = e.target.parentElement;
            ele.remove();

            // remove from local Storage
            removeFromLS(ele)
        }
    }
   
};


// store task in local storage 
function storeTaskInLocalStorage (task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks" , JSON.stringify(tasks))
}



// load dom content from local storage 

function getTasks () {
    let tasks ;
    if (localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerText = "x";
        li.appendChild(link);
        tasks.appendChild(li);
    })
};

// Remove from local storage
function removeFromLS (taskItem) {
    let tasks ;
    if (localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    let li = taskItem ;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index , 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}