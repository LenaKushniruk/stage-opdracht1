const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksSection = document.querySelector('.tasks-section');
const categoryButtons = document.querySelectorAll('.category-btn');
const menuToggle = document.querySelector('.menu-toggle');
const categories = document.querySelector('.categories');

let selectedCategory = null;
let allTasks = [];

initApp();

function initApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const catFromUrl = urlParams.get('cat');

  if (catFromUrl) {
    setCategory(catFromUrl);
  }

  loadTasks();

  addTaskBtn.addEventListener('click', addTask);

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cat = button.getAttribute('data-cat');
      setCategory(cat);
      updateUrl(cat);
    });
  });

  // Hamburger menu toggle
  menuToggle.addEventListener('click', () => {
    categories.classList.toggle('open');
  });
}

function setCategory(category) {
  selectedCategory = category;

  categoryButtons.forEach(btn => {
    const btnCat = btn.getAttribute('data-cat');
    btn.classList.toggle('active', btnCat === category);
  });

  filterTasksByCategory();
}

function updateUrl(category) {
  const newUrl = `${window.location.pathname}?cat=${encodeURIComponent(category)}`;
  history.pushState({}, '', newUrl);
}

function addTask() {
  const task = taskInput.value.trim();

  if (!selectedCategory) {
    alert('Kies eerst een categorie!');
    return;
  }

  if (task) {
    const taskObj = {
      text: task,
      category: selectedCategory
    };
    allTasks.push(taskObj);
    createTaskElement(taskObj);
    taskInput.value = '';
    saveTasks();
    filterTasksByCategory();
  } else {
    alert('Voer een taak in!');
  }
}

function createTaskElement(taskObj) {
  const listItem = document.createElement('nav');
  listItem.classList.add('task-item');
  listItem.setAttribute('data-category', taskObj.category);

  const taskText = document.createElement('span');
  taskText.textContent = taskObj.text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteTask';

  deleteButton.addEventListener('click', function () {
    const index = allTasks.findIndex(
      t => t.text === taskObj.text && t.category === taskObj.category
    );
    if (index !== -1) {
      allTasks.splice(index, 1);
    }
    listItem.remove();
    saveTasks();
  });

  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);
  tasksSection.appendChild(listItem);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  allTasks = tasks;
  tasksSection.innerHTML = '';
  tasks.forEach(createTaskElement);
  filterTasksByCategory();
}

function filterTasksByCategory() {
  document.querySelectorAll('.task-item').forEach(item => {
    const itemCat = item.getAttribute('data-category');
    item.style.display = itemCat === selectedCategory ? 'flex' : 'none';
  });
}

