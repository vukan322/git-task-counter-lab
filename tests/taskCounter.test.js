import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createTask,
  getTaskCounts,
  normalizeTitle,
  removeTask,
  toggleTask
} from '../src/taskCounter.js';

test('normalizes task title whitespace', () => {
  assert.equal(normalizeTitle('  Review   pull request  '), 'Review pull request');
});

test('creates an unfinished task', () => {
  assert.deepEqual(createTask('Write tests', 'task-1'), {
    id: 'task-1',
    title: 'Write tests',
    completed: false
  });
});

test('rejects an empty task title', () => {
  assert.throws(
    () => createTask('   ', 'task-1'),
    /Task title is required/
  );
});

test('calculates task counts', () => {
  const tasks = [
    { id: '1', title: 'First', completed: true },
    { id: '2', title: 'Second', completed: false },
    { id: '3', title: 'Third', completed: true }
  ];

  assert.deepEqual(getTaskCounts(tasks), {
    total: 3,
    completed: 2,
    remaining: 1
  });
});

test('toggles only the selected task', () => {
  const tasks = [
    { id: '1', title: 'First', completed: false },
    { id: '2', title: 'Second', completed: false }
  ];

  assert.deepEqual(toggleTask(tasks, '2'), [
    { id: '1', title: 'First', completed: false },
    { id: '2', title: 'Second', completed: true }
  ]);

  assert.equal(tasks[1].completed, false);
});

test('removes only the selected task', () => {
  const tasks = [
    { id: '1', title: 'First', completed: false },
    { id: '2', title: 'Second', completed: false }
  ];

  assert.deepEqual(removeTask(tasks, '1'), [
    { id: '2', title: 'Second', completed: false }
  ]);
});
