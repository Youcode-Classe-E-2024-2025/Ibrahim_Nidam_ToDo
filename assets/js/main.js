const stats_bar = document.getElementById("statisques-bar");
const stats = document.getElementById("statisques");
const add_Task_btn = document.querySelectorAll(".add-Task-btn");

const form = document.getElementById("task-Form");
const cancel = document.getElementById("cancel");
const done = document.getElementById("done");

const toDo_Cards_Place = document.getElementById("todo-card-article");
const doing_Cards_Place = document.getElementById("doing-card-article");
const review_Cards_Place = document.getElementById("review-card-article");
const done_Cards_Place = document.getElementById("done-card-article");

const high_p = document.getElementById("priority-high");
const medium_p = document.getElementById("priority-medium");
const low_p = document.getElementById("priority-low");
const buttons = document.querySelectorAll("button[data-priority-id]");

const more_vert = document.querySelectorAll(".more-vert");

let selected_priority = null;
let status_Id = null;

//Form Toggle start
add_Task_btn.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    status_Id = btn.getAttribute("data-status-id");
    form.classList.remove("show-form");
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
    buttons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    selected_priority = btn.getAttribute("data-priority-id");
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const form_title = document.getElementById("title").value.trim();
  const form_description = document.getElementById("description").value.trim();
  const due_date = document.getElementById("due-date").value;
  const due_hour = document.getElementById("due-time-hh").value;
  const due_minute = document.getElementById("due-time-mm").value;

  const has_Numbers_Or_Special_Chars = /[^A-Za-z\s]/.test(form_title);

  if (has_Numbers_Or_Special_Chars) {
    alert("Title shouldn't contain numbers or special characters.");
    return;
  }

  const task_Id = `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const now = new Date();
  const creation_date = now.toISOString().slice(0, 16);

  const due_Date_Merged = `${due_date}T${due_hour}:${due_minute}`;

  if (!selected_priority) {
    alert("You should choose a priority.");
    return;
  }
  if (form_title === "") {
    alert("The title is necessary.");
    return;
  }

  if (due_hour === "HH" || due_minute === "MM" || !due_date) {
    alert("Time fields are required.");
    return;
  }
  const task_Data = {
    id: task_Id,
    title: form_title,
    description: form_description,
    dueDate: due_Date_Merged,
    creationDate: creation_date,
    priority: selected_priority,
    status: status_Id,
  };

  const tasks_added = JSON.parse(localStorage.getItem("tasks_added")) || [];

  tasks_added.push(task_Data);

  localStorage.setItem("tasks_added", JSON.stringify(tasks_added));

  createCard(task_Data);

  form.reset();
  form.classList.add("show-form");
});

//add task end

// adding task card to the proper status start

function createCard(task) {
  const card = document.createElement("div");
  card.className = "max-w-sm p-4 bg-white rounded-lg shadow-md border border-gray-200";
  card.setAttribute("draggable", "true");

  let priority_Class_color;
  if (task.priority === "high") {
    priority_Class_color = "bg-p1 text-p1Text";
  } else if (task.priority === "medium") {
    priority_Class_color = "bg-p2 text-p2Text";
  } else if (task.priority === "low") {
    priority_Class_color = "bg-p3 text-p3Text";
  }

  card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
          <span class=" ${priority_Class_color} text-sm font-semibold px-2 py-1 rounded-md">${
    task.title
  }</span>
          <img src="assets/src/images/icons/more vert points.svg" alt="" class="text-black cursor-pointer">
      </div>
      
      <p class="text-greyText text-xs mb-2">${new Date(
        task.creationDate
      ).toLocaleDateString()} > ${new Date(task.dueDate).toLocaleDateString()}</p>
      
      <p class="text-sm text-ellipsis overflow-hidden text-gray-700 mb-4 ">${task.description}</p>

    <div class="h-px bg-greyHighLights mb-2"></div>
    
    <div class="flex justify-between items-center pt-2">
        <div class="flex items-center">
            <div class="flex -space-x-2">
                <img src="https://picsum.photos/100" alt="" class="w-6 h-6 rounded-full border border-black">
                <img src="https://picsum.photos/100" alt="" class="w-6 h-6 rounded-full border border-black">
                <img src="https://picsum.photos/100" alt="" class="w-6 h-6 rounded-full border border-black">
                <div class="cursor-pointer rounded-full border border-black w-6 h-6 bg-lightModeMain text-white flex items-center justify-center text-xs">+3</div>
            </div>
        </div>
    
        <div class="flex items-center gap-4 text-gray-300 text-xs">
            <div class="flex items-center">
                <img src="assets/src/images/icons/eye visibility.svg" alt="eye icon" class="w-4 h-4 mr-1" />
                <span>2</span>
            </div>
            <div class="flex items-center">
                <img src="assets/src/images/icons/comment.svg" alt="comment icon" class="w-4 h-4 mr-1" />
                <span>0</span>
            </div>
        </div>
    </div>
  `;

  if (task.status === "todo") {
    toDo_Cards_Place.appendChild(card);
  } else if (task.status === "doing") {
    doing_Cards_Place.appendChild(card);
  } else if (task.status === "review") {
    review_Cards_Place.appendChild(card);
  } else {
    done_Cards_Place.appendChild(card);
  }
}


// adding task card to the proper status end


// loading the data from local storge start

document.addEventListener("DOMContentLoaded", function(){
    const tasks_added = JSON.parse(localStorage.getItem("tasks_added")) || []

    if(tasks_added.length > 0){
        tasks_added.forEach(task => {
            createCard(task);
        })
    }
})

// loading the data from local storge end
