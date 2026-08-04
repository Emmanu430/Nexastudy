import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getNotes, getTasks, getCourses } from '../api'
import { useAuth } from '../context/AuthContext'
import { motion } from 'motion/react'

export default function Dashboard() {
  const { user } = useAuth()
  const [noteCount, setNoteCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)
    const [courseCount, setCourseCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [notesRes, tasksRes, coursesRes] = await Promise.all([getNotes(), getTasks(), getCourses()])
        setNoteCount(notesRes.data.length)
        setTaskCount(tasksRes.data.filter((task) => !task.is_completed).length)
        setCourseCount(coursesRes.data.length)
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
    { label: 'Courses', value: courseCount },
  ]

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white">Welcome back{user ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
      <p className="mt-2 text-gray-400">Here's what's happening in your academic world today.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
       {loading ? (
  <p className="text-gray-500 col-span-3">Loading stats...</p>
) : (
  stats.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl bg-gray-900 border border-gray-800"
    >
      <p className="text-gray-400 text-sm">{stat.label}</p>
      <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
    </motion.div>
  ))
)}
      </div>
    </DashboardLayout>
  )
}