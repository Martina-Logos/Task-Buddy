import TaskItem from './TaskItem'

/**
 * TaskList
 * Renders the full list of tasks, split into:
 *   - Pending tasks (not completed)
 *   - Completed tasks
 *
 * Shows an empty state message when there are no tasks at all.
 */
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm font-medium">No tasks yet — add one above!</p>
      </div>
    )
  }

  const pending   = tasks.filter(t => !t.completed)
  const completed = tasks.filter(t =>  t.completed)

  return (
    <div className="flex flex-col gap-6">
      {/* Pending tasks */}
      {pending.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 px-1">
            Pending · {pending.length}
          </h3>
          <ul className="flex flex-col gap-2">
            {pending.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}

      {/* Completed tasks */}
      {completed.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 px-1">
            Done · {completed.length}
          </h3>
          <ul className="flex flex-col gap-2">
            {completed.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}