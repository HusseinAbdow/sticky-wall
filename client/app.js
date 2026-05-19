// Todo App Client-side JavaScript

const API_URL = 'http://localhost:3000/api';
const USER_STORAGE_KEY = 'todo_user';

let currentUser = null;
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const dashboard = document.getElementById('dashboardScreen');
const loginScreen = document.getElementById('loginScreen');
const usernameInput = document.getElementById('usernameInput');
const enterAppBtn = document.getElementById('enterAppBtn');
const leaveAppBtn = document.getElementById('leaveAppBtn');
const profileName = document.getElementById('profileName');
const filterItems = document.querySelectorAll('[data-filter]');

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

enterAppBtn.addEventListener('click', handleLogin);
leaveAppBtn.addEventListener('click', handleLeaveApp);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleLogin();
    }
});

filterItems.forEach((item) => {
    item.addEventListener('click', () => {
        currentFilter = item.dataset.filter || 'all';
        updateActiveFilter();
        loadTasks();
    });
});

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
});

function initAuth() {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (savedUser && savedUser.trim()) {
        currentUser = savedUser.trim();
        showDashboard();
        return;
    }

    showLogin();
}

function handleLogin() {
    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a username');
        return;
    }

    currentUser = username;
    localStorage.setItem(USER_STORAGE_KEY, currentUser);
    showDashboard();
}

function handleLeaveApp() {
    currentUser = null;
    localStorage.removeItem(USER_STORAGE_KEY);
    taskList.innerHTML = '';
    usernameInput.value = '';
    currentFilter = 'all';
    updateActiveFilter();
    showLogin();
}

function showLogin() {
    loginScreen.classList.remove('is-hidden');
    loginScreen.hidden = false;
    loginScreen.style.display = 'grid';
    dashboard.classList.add('is-hidden');
    dashboard.hidden = true;
    dashboard.style.display = 'none';
    usernameInput.focus();
}

function showDashboard() {
    profileName.textContent = currentUser;
    usernameInput.value = '';
    loginScreen.classList.add('is-hidden');
    loginScreen.hidden = true;
    loginScreen.style.display = 'none';
    dashboard.classList.remove('is-hidden');
    dashboard.hidden = false;
    dashboard.style.display = 'flex';
    updateActiveFilter();
    taskInput.focus();
    loadTasks();
}

function updateActiveFilter() {
    filterItems.forEach((item) => {
        const filter = item.dataset.filter || 'all';
        item.classList.toggle('active', filter === currentFilter);
    });
}

function matchesCurrentFilter(task) {
    if (currentFilter === 'completed') {
        return task.completed === true;
    }

    if (currentFilter === 'pending') {
        return task.completed === false;
    }

    return true;
}

// Fetch and display all tasks
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks?userId=${encodeURIComponent(currentUser)}`);
        const tasks = await response.json();
        const visibleTasks = tasks.filter(matchesCurrentFilter);
        
        taskList.innerHTML = '';
        visibleTasks.forEach(task => {
            renderTask(task);
        });
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Add a new task
async function addTask() {
    const title = taskInput.value.trim();
    
    if (!title) {
        alert('Please enter a task');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, completed: false, userId: currentUser })
        });
        
        const newTask = await response.json();
        renderTask(newTask);
        taskInput.value = '';
        taskInput.focus();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task');
    }
}

// Render a task in the DOM
function renderTask(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="task-text">${escapeHtml(task.title)}</span>
        <div class="task-actions">
            <button class="task-btn complete-btn" onclick="toggleTask('${task.id}', ${!task.completed})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask('${task.id}')">
                Delete
            </button>
        </div>
    `;
    taskList.appendChild(li);
}

// Toggle task completion status
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task');
    }
}

// Delete a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
    }
}

// Escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
