document.addEventListener('DOMContentLoaded', function() {
    function loadTaks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = task.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('remove-btn');
            deleteButton.onclick = () => {
                taskList.removeChild(listItem);
                saveTasks();
            };
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
        console.log('Tasks loaded from localStorage');
        console.log(tasks);     
    }
    function saveTasks() {
        const taskList = document.getElementById('task-list');
        const tasks = Array.from(taskList.children).map(item => ({
            text: item.firstChild.textContent
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    loadTaks();
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('remove-btn');
            deleteButton.onclick = () => {
                taskList.removeChild(listItem);
            };
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            taskInput.value = '';
            saveTasks();
        }
        else {
            alert('Please enter a task.');
        }
    }
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});