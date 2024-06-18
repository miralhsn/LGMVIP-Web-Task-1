const todoInput = document.querySelector('.todo-input');
const prioritySelector = document.querySelector('.priority-selector');
const todoList = document.querySelector('#todo-list');

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

// Event listener for adding a new task
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim() !== '') {
        createTodoItem(todoInput.value.trim(), prioritySelector.value);
        todoInput.value = ''; // Clear input field after adding task
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
