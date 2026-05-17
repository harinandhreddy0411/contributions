const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerText = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      showTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      showTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  saveTasks();
  showTasks();
  taskInput.value = "";
});

showTasks();