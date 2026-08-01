import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getTasks, createTask, updateTask, deleteTask } from '../api'
import { Trash2 } from 'lucide-react'

export default function TasksPages() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const fetchTasks = async () => {
    try {
      const response = await getTasks()
      setTasks(response.data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setIsCreating(true)
    try {
      await createTask({ title, due_date: dueDate || null })
      setTitle('')
      setDueDate('')
      fetchTasks()
    } catch (error) {
      console.error('Failed to create task:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      const { data } = await updateTask(task.id, { is_completed: !task.is_completed })
      setTasks(tasks.map((t) => (t.id === task.id ? data : t)))
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white">Tasks</h1>
      <p className="mt-2 text-gray-400">Stay on top of your assignments and deadlines.</p>

      <form onSubmit={handleCreate} className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-800 flex gap-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isCreating ? 'Adding...' : 'Add'}
        </button>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">You have no tasks yet. Add one above!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => handleToggleComplete(task)}
                    className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
                  />
                  <div>
                    <p className={`font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {task.title}
                    </p>
                    {task.due_date && <p className="text-gray-500 text-sm">Due {task.due_date}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}