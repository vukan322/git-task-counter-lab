export function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ');
}

export function createTask(title, id) {
  const normalizedTitle = normalizeTitle(title);

  if (!normalizedTitle) {
    throw new Error('Task title is required.');
  }

  return {
    id,
    title: normalizedTitle,
    completed: false
  };
}

export function getTaskCounts(tasks) {
  const completed = tasks.length;

  return {
    total: tasks.length,
    completed,
    remaining: tasks.length - completed
  };
}

export function toggleTask(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      completed: !task.completed
    };
  });
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}
