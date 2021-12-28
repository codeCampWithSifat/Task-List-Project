let form = document.querySelector("#task_form");
let taskInput = document.querySelector("#new_task");
let filter = document.querySelector("#task_filter");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task_btn");

// define event listener 
form.addEventListener("submit" , addTask);
taskList.addEventListener ("click" , removeTask);
clearBtn.addEventListener("click" , clearTask);


// define function 

//add Task 
function addTask (e) {
    if (taskInput.value === "") {
        alert ("Please Add Your Task")
    } else {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement("a");
        link.setAttribute("href" , "#");
        link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);
        taskInput.value = ""
    }
    e.preventDefault()
};

// remove Task
function removeTask (e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are Your Sure To Remove It")) {
            let element = e.target.parentElement ;
            element.remove()
        }  
    } 
};

// clear Task 
function clearTask () {
    taskList.innerHTML = ""
}