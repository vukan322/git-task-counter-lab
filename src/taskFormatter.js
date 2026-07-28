export function formatTaskLabel(task) {
  return task.completed
    ? `${task.title}, completed`
    : `${task.title}, not completed`;
}
