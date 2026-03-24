import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <p className="empty-text">No tasks here — add one above!</p>
      </div>
    )
  }

  const pending   = tasks.filter(t => !t.completed)
  const completed = tasks.filter(t =>  t.completed)

  return (
    <div className="task-list">
      {pending.length > 0 && (
        <section>
          <p className="section-label">Pending · {pending.length}</p>
          <ul className="task-list">
            {pending.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <p className="section-label">Done · {completed.length}</p>
          <ul className="task-list">
            {completed.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}