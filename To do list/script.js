function addTask() {
  const taskText = document.getElementById('newTask').value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  let tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks();
  document.getElementById('newTask').value = '';
}

function getTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const filter = document.getElementById('filter').value;
  const tasks = getTasks();

  tasks.forEach(task => {
    if (filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'pending' && !task.completed)) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="controls">
          <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(this, '${task.text}')">
          <button onclick="deleteTask('${task.text}')">Delete</button>
        </div>
      `;
      if (task.completed) li.classList.add('completed');
      taskList.appendChild(li);
    }
  });
}

function toggleComplete(checkbox, taskText) {
  let tasks = getTasks();
  const index = tasks.findIndex(task => task.text === taskText);
  tasks[index].completed = checkbox.checked;
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(taskText) {
  let tasks = getTasks();
  const index = tasks.findIndex(task => task.text === taskText);
  if (index > -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}

