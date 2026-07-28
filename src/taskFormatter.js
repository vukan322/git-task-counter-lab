export function formatTaskLabel(task) {
  const status = task.completed ? 'completed' : 'not completed';
  return `Task: ${task.title}, ${status}`;
}
