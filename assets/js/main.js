const stats_bar =document.getElementById("statisques-bar") 
const stats = document.getElementById("statisques");
const add_Task_btn = document.querySelectorAll(".add-Task-btn");

const form = document.getElementById("task-Form");
const form_title = document.getElementById("title");
const description = document.getElementById("description");
const due_date = document.getElementById("due-date");
const due_hour = document.getElementById("due-time-hh");
const due_minute = document.getElementById("due-time-mm");
const cancel = document.getElementById("cancel");
const done = document.getElementById("done");

const high_p = document.getElementById("priority-high");
const medium_p = document.getElementById("priority-medium");
const low_p = document.getElementById("priority-low");


//Form Toggle start
add_Task_btn.forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        form.classList.remove("show-form");
        console.log("Button clicked");
    });
});

cancel.addEventListener("click", function(){
    form.classList.add("show-form");
})
//Form Toggle end

// change name of columns start

