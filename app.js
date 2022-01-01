let form = document.querySelector("#task_form");
let taskInput = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");


// add event listener
form.addEventListener("submit" , addTask);
clearBtn.addEventListener("click", clearTask)
filter.addEventListener("keyup", filterTask);
taskList.addEventListener("click" , removeTask);
document.addEventListener("DOMContentLoaded" , getTasks);


// Define function 
//add task 
function addTask (e) {
    if (taskInput.value === "") {
        alert ("Please Add Your Task");
    } else {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value + " "))
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);

        // store task in local storage
        storeTaskInLocalStorage(taskInput.value)
        taskInput.value = "";
    }
    e.preventDefault();
};


// clear task 
function clearTask () {
    taskList.innerHTML = ""
    localStorage.clear()
}


// filter task 
function filterTask (e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(task => {
        let item = task.firstChild.textContent ;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    })
};


// remove all the task
function removeTask (e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are You Sure To Remove It")) {
            let ele = e.target.parentElement;
            ele.remove();

            // remove from local Storage
            removeFromLocalStorage(ele);
        }
    } 
};


// store task in local storage 
function storeTaskInLocalStorage (task) {
    let tasks ;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.push(task);
    localStorage.setItem ("tasks" , JSON.stringify(tasks));
};

// get task from local storage

function getTasks () {
    let tasks ;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "))
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);
    })
};

// remove from local storage
function removeFromLocalStorage (taskItem) {
    let tasks ;
    if (localStorage.getItem("tasks") === null) {
        tasks= [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    let li = taskItem ;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index , 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}