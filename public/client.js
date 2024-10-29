// Function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    const categoryText = categoryInput.value;

    if (taskText) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const taskSpan = document.createElement('span');
        taskSpan.setAttribute('data-task', taskText);  // Store the actual task text separately
        taskSpan.textContent = `${taskText} (${categoryText})`; // Display task with category

        // Add Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm mr-2';
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            const newTask = prompt('Edit your task:', taskText);
            if (newTask) {
                taskSpan.setAttribute('data-task', newTask);
                taskSpan.textContent = `${newTask} (${categoryText})`;
                saveTasks(); // Save tasks after editing
            }
        };

        // Add Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            li.remove();
            saveTasks(); // Save tasks after removal
        };

        // Append task span and buttons to list item
        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear input field
        saveTasks(); // Save tasks to localStorage
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li span').forEach(taskSpan => tasks.push(taskSpan.getAttribute('data-task')));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage when page loads
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        const taskSpan = document.createElement('span');
        taskSpan.setAttribute('data-task', taskText);
        taskSpan.textContent = taskText; // Display task text

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning btn-sm mr-2';
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() {
            const newTask = prompt('Edit your task:', taskText);
            if (newTask) {
                taskSpan.setAttribute('data-task', newTask);
                taskSpan.textContent = newTask;
                saveTasks(); // Save tasks after editing
            }
        };

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger btn-sm';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            li.remove();
            saveTasks(); // Save tasks after removal
        };

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}

// Search for tasks
function searchTasks() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase(); // Trim spaces and use lowercase
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');

    console.log('Search term:', searchTerm);
    console.log('Number of tasks:', tasks.length);

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.trim().toLowerCase(); // Also trim and lowercase task text
        console.log('Task text:', taskText); // Debugging statement

        if (taskText.includes(searchTerm)) {
            tasks[i].style.display = ''; // Show task if search term matches
            tasks[i].classList.remove('hidden'); // Make sure it's visible if a class is hiding it
        } else {
            tasks[i].style.display = 'none'; // Hide task if search term doesn't match
            tasks[i].classList.add('hidden'); // Hide task using a hidden class
        }
    }
}


// Load tasks when the page loads
window.onload = loadTasks;
