import { APP_TITLE } from './config.js';
import {
  createTask,
  getTaskCounts,
  removeTask,
  toggleTask
} from './taskCounter.js';

const storageKey = 'git-task-counter-lab.tasks';


console.log('cao');

const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const errorElement = document.querySelector('#form-error');
const taskList = document.querySelector('#task-list');
const appTitle = document.querySelector('#app-title');
const headerCompletedCount = document.querySelector('#header-completed-count');
const headerTotalCount = document.querySelector('#header-total-count');
const completedCount = document.querySelector('#completed-count');
const remainingCount = document.querySelector('#remaining-count');
const emptyState = document.querySelector('#empty-state');

console.log('caoooo 123');

let tasks = loadTasks();

document.title = APP_TITLE;
appTitle.textContent = APP_TITLE;

function createId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(storageKey) ?? '[]');

    if (!Array.isArray(savedTasks)) {
      return [];
    }

    return savedTasks.filter((task) => {
      return (
        typeof task?.id === 'string' &&
        typeof task?.title === 'string' &&
        typeof task?.completed === 'boolean'
      );
    });
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function renderCounters() {
  const counts = getTaskCounts(tasks);

  headerCompletedCount.textContent = String(counts.completed);
  headerTotalCount.textContent = String(counts.total);
  completedCount.textContent = String(counts.completed);
  remainingCount.textContent = String(counts.remaining);
}

function renderTasks() {
  const items = tasks.map((task) => {
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const title = document.createElement('span');
    const deleteButton = document.createElement('button');

    item.className = task.completed ? 'task-item completed' : 'task-item';

    emptyState.hidden = tasks.length > 0;

    checkbox.className = 'task-toggle';
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', formatTaskLabel(task));
    checkbox.addEventListener('change', () => {
      tasks = toggleTask(tasks, task.id);
      saveTasks();
      render();
    });

    title.className = 'task-title';
    title.textContent = task.title;

    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete ${task.title}`);
    deleteButton.addEventListener('click', () => {
      tasks = removeTask(tasks, task.id);
      saveTasks();
      render();
    });

    item.append(checkbox, title, deleteButton);

    return item;
  });

  taskList.replaceChildren(...items);
}

function render() {
  renderCounters();
  renderTasks();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  try {
    const task = createTask(input.value, createId());

    tasks = [...tasks, task];
    saveTasks();
    errorElement.textContent = '';
    form.reset();
    input.focus();
    render();
  } catch (error) {
    errorElement.textContent = error instanceof Error
      ? error.message
      : 'Unable to add task.';
  }
});


export function formatTaskLabel(task) {
  const status = task.completed ? 'completed' : 'not completed';

  return `Task: ${task.title}, ${status}`;
}


render();
