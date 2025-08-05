let tasks = [];

const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  try {
    const parsed = JSON.parse(savedTasks);
    if (Array.isArray(parsed)) {
      tasks = parsed;
    }
  } catch (error) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = ''; // Clear old tasks

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task;
    li.appendChild(span);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(index));
    editButton.style.backgroundColor = "blue"
    editButton.style.color = "white"
    editButton.style.border = "none"
    editButton.style.borderRadius = "10px"

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));
    deleteButton.style.backgroundColor = "red"
    deleteButton.style.color = "white"
    deleteButton.style.border = "none"
    deleteButton.style.borderRadius = "10px"

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(actionsDiv);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();

  if (task !== '') {
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const currentTask = tasks[index];
  const newTask = prompt('Edit your task:', currentTask);

  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    saveTasks();
    renderTasks();
  }
}

const addButton = document.getElementById('addButton');
if (addButton) {
  addButton.addEventListener('click', addTask);
}

renderTasks();
