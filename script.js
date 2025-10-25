// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize and Load Tasks
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Create the addTask Function with Local Storage support
    function addTask(taskText, save = true) {
        // If taskText is an object (from parameter), extract the text
        const actualTaskText = typeof taskText === 'string' ? taskText : taskInput.value.trim();
        
        // Check if input is empty (only when called from user input)
        if (typeof taskText === 'string') {
            // This is loading from storage, skip validation
        } else if (actualTaskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        // Task Creation and Removal
        if (actualTaskText !== "") {
            // Create new list item
            const listItem = document.createElement('li');
            listItem.textContent = actualTaskText;
            
            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');
            
            // Assign onclick event to remove button
            removeButton.onclick = function() {
                // Remove from DOM
                taskList.removeChild(listItem);
                
                // Remove from Local Storage
                removeTaskFromStorage(actualTaskText);
            };
            
            // Append remove button to list item
            listItem.appendChild(removeButton);
            
            // Append list item to task list
            taskList.appendChild(listItem);
            
            // Save to Local Storage if needed
            if (save) {
                saveTaskToStorage(actualTaskText);
                
                // Clear the input field only when saving new tasks
                taskInput.value = "";
            }
        }
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach Event Listeners
    addButton.addEventListener('click', function() {
        addTask(); // This will use the input value and save to storage
    });
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // This will use the input value and save to storage
        }
    });

    // Load tasks when page loads
    loadTasks();
});