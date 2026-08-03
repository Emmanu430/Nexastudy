import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getCourses, createCourse, deleteCourse } from '../api'
import { Trash2 } from 'lucide-react'

export default function Courses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [isCreating, setIsCreating] = useState(false)

    const fetchCourses = async () => {
        try {
        const response = await getCourses()
        setCourses(response.data)
        } catch (error) {
        console.error('Failed to fetch courses:', error)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!title.trim() || !code.trim()) return
        setIsCreating(true)
        try {
        await createCourse({ title, code })
        setTitle('')
        setCode('')
        fetchCourses()
        } catch (error) {
        console.error('Failed to create course:', error)
        } finally {
        setIsCreating(false)
        }
    }

    const handleDelete = async (id) => {
        try {
        await deleteCourse(id)
        setCourses(courses.filter((course) => course.id !== id))
        } catch (error) {
        console.error('Failed to delete course:', error)
        }
    }

    return (
        <DashboardLayout>
        <h1 className="text-3xl font-bold text-white">Courses</h1>
        <p className="mt-2 text-gray-400">Keep track of what you're studying this semester.</p>

        <form onSubmit={handleCreate} className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-800 flex flex-col sm:flex-row gap-3">
            <input
            type="text"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
            type="text"
            placeholder="Code (e.g. CSC 101)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full sm:w-40 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
            type="submit"
            disabled={isCreating}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
            {isCreating ? 'Adding...' : 'Add'}
            </button>
        </form>

        <div className="mt-8">
            {loading ? (
            <p className="text-gray-500">Loading courses...</p>
            ) : courses.length === 0 ? (
            <p className="text-gray-500">You have no courses yet. Add one above!</p>
            ) : (
            <div className="grid md:grid-cols-3 gap-4">
                {courses.map((course) => (
                <div
                    key={course.id}
                    className="p-5 rounded-xl bg-gray-900 border border-gray-800 border-l-4"
                    style={{ borderLeftColor: course.color }}
                >
                    <div className="flex items-start justify-between">
                    <div>
                        <p className="text-white font-semibold">{course.title}</p>
                        <p className="text-gray-500 text-sm mt-1">{course.code}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(course.id)}
                        className="text-gray-500 hover:text-red-500 transition"
                    >
                        <Trash2 size={16} />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </DashboardLayout>
    )
}