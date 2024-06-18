const todoInput = document.querySelector('.todo-input');
const prioritySelector = document.querySelector('.priority-selector');
const todoList = document.querySelector('#todo-list');
const addButton = document.querySelector('.add-btn');

// Function to create a new todo item
function createTodoItem(task, priority) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item', priority);
    
    todoItem.innerHTML = `
        <span>${task}</span>
        <button class="complete-btn">&#10004;</button>
        <button class="delete-btn">&times;</button>
    `;

    // Event listener for completing a task
    const completeBtn = todoItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => {
        todoItem.classList.toggle('completed');
    });

    // Event listener for deleting a task
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        todoItem.remove();
    });

    todoList.appendChild(todoItem);
    sortTasks();
}

// Function to add a new task
function addTask() {
    if (todoInput.value.trim() !== '') {
        createTodoItem(todoInput.value.trim(), prioritySelector.value);
        todoInput.value = ''; // Clear input field after adding task
    }
}

// Event listener for Enter button
addButton.addEventListener('click', addTask);

// Event listener for Enter key press
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to sort tasks by priority
function sortTasks() {
    const items = Array.from(todoList.children);
    items.sort((a, b) => {
        const priorities = ['low', 'medium', 'high'];
        return priorities.indexOf(a.classList[1]) - priorities.indexOf(b.classList[1]);
    });
    items.forEach(item => todoList.appendChild(item));
}
