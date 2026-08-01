import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getNotes, getTasks } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [noteCount, setNoteCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [notesRes, tasksRes] = await Promise.all([getNotes(), getTasks()])
        setNoteCount(notesRes.data.length)
        setTaskCount(tasksRes.data.filter((task) => !task.is_completed).length)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const stats = [
    { label: 'Notes', value: noteCount },
    { label: 'Tasks Due', value: taskCount },
  ]

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white">Welcome back{user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
      <p className="mt-2 text-gray-400">Here's what's happening in your academic world today.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {loading ? (
          <p className="text-gray-500 col-span-3">Loading stats...</p>
        ) : (
          stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}