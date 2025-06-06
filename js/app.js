// DOM-elementen selecteren
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksSection = document.querySelector('.tasks-section');

loadTasks();

function addTask(){
    const task = taskInput.value.trim();

    if (task){
        createTaskElement(task);
        taskInput.value = '';
        saveTasks()
    }

    else{
        alert('please enter a task!');
    }
}

addTaskBtn.addEventListener('click', addTask);

function createTaskElement(task){
    const listItem = document.createElement('nav');
    listItem.textContent = task;
    tasksSection.appendChild(listItem);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    tasksSection.appendChild(listItem);

    deleteButton.addEventListener('click', function(){
        tasksSection.removeChild(listItem);
    });

}

function saveTasks(){
    let tasks = [];
    tasksSection.querySelectorAll('nav').forEach(function(item){
        tasks.push(item.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}

