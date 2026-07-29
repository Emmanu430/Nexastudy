import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-6">
        <Link to="/" className="text-xl font-bold text-white mb-10">
            Nexa<span className="text-blue-500">Study</span>
        </Link>

        <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">
            Dashboard
            </Link>
            <Link to="/notes" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">
            Notes
            </Link>
            <Link to="/tasks" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">
            Tasks
            </Link>
            <Link to="/ai-chat" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">
            AI Chat
            </Link>
            <Link to="/profile" className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition">
            Profile
            </Link>
        </nav>
        </aside>
    )
}