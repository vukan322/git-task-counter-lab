export function formatTaskLabel(task) {
  const status = task.completed ? 'completed' : 'not completed';
  return `Task 1: ${task.title}, ${status}`;
}
