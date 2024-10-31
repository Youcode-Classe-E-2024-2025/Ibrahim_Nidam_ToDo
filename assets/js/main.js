const stats_bar = document.getElementById("statisques-bar");
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

// const todo_Para = document.getElementById("todo-para");
// const todo_Edit_name = document.getElementById("more-vert-todo");
const more_vert = document.querySelectorAll(".more-vert");

//Form Toggle start
add_Task_btn.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    form.classList.remove("show-form");
    console.log("Button clicked");
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

    const original_Text = para.innerText

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

