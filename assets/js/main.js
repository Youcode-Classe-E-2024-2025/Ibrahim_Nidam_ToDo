const stats_bar = document.getElementById("statisques-bar");
const stats = document.getElementById("statisques");
const add_Task_btn = document.querySelectorAll(".add-Task-btn");

const form = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");
const done = document.getElementById("done");

const high_p = document.getElementById("priority-high");
const medium_p = document.getElementById("priority-medium");
const low_p = document.getElementById("priority-low");
const buttons = document.querySelectorAll("button[data-priority-id]");

const more_vert = document.querySelectorAll(".more-vert");

let selected_priority = null;
let status_Id = null

//Form Toggle start
add_Task_btn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        status_Id = btn.getAttribute("data-status-id")
        form.classList.remove("show-form");
        console.log(status_Id);
    });
});

cancel.addEventListener("click", function () {
    form.classList.add("show-form");
});
//Form Toggle end

// change name of columns start

more_vert.forEach((btn) => {
    btn.addEventListener("click", function () {
        const para_Id = btn.getAttribute("data-para-id");
        const para = document.getElementById(para_Id);
        
        const original_Text = para.innerText;
        
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("text-xl");
        input.id = "todo-input";
        input.style.width = `${3 * para.offsetWidth}px`;
        
        para.replaceWith(input);
        input.focus();
        
        input.addEventListener("blur", saveInput);
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                saveInput();
            }
        });
        
        function saveInput() {
            para.innerText = input.value || original_Text;
            input.replaceWith(para);
        }
    });
});

// change name of columns end

// add task start

buttons.forEach((btn) => {
    btn.addEventListener("click", function () {

    buttons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    selected_priority = btn.getAttribute("data-priority-id");
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const form_title = document.getElementById("title").value;
    const form_description = document.getElementById("description").value;
    const due_date = document.getElementById("due-date").value;
    const due_hour = document.getElementById("due-time-hh").value;
    const due_minute = document.getElementById("due-time-mm").value;

  const task_Id = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const now = new Date();
  const creation_date = now.toISOString().slice(0, 16);

  const due_Date_Merged = `${due_date}T${due_hour}:${due_minute}`;


  const task_Data = {
    id: task_Id,
    title: form_title,
    description: form_description,
    dueDate: due_Date_Merged,
    creationDate: creation_date,
    priority: selected_priority,
    status: status_Id
  };

  const tasks_added = JSON.parse(localStorage.getItem("tasks_added")) || [];

  tasks_added.push(task_Data);

  localStorage.setItem("tasks_added", JSON.stringify(tasks_added));

  form.reset();
  form.classList.add("show-form");

  console.log("Task saved:", task_Data);
});

//add task end