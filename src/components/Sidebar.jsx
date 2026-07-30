import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, StickyNote, ListTodo, MessageSquare, User, LogOut } from 'lucide-react'
import api from '../api'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
    const navigate = useNavigate()
    const { user, setUser } = useAuth()

    const handleLogout = async () => {
        try {
        await api.post('/logout')
        setUser(null)
        navigate('/auth')
        } catch (error) {
        console.error('Logout failed:', error.response?.data)
        }
    }

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/notes', label: 'Notes', icon: StickyNote },
        { to: '/tasks', label: 'Tasks', icon: ListTodo },
        { to: '/ai-chat', label: 'AI Chat', icon: MessageSquare },
        { to: '/profile', label: 'Profile', icon: User },
    ]

    return (
        <aside className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-6">
        <Link to="/" className="text-xl font-bold text-white mb-6">
            Nexa<span className="text-blue-500">Study</span>
        </Link>

        {user && (
            <div className="mb-8 pb-6 border-b border-gray-800">
            <p className="text-white font-medium truncate">{user.name}</p>
            <p className="text-gray-500 text-sm truncate">{user.email}</p>
            </div>
        )}

        <nav className="flex flex-col gap-1 flex-1">
            {navItems.map(({ to, label, icon: Icon }) => (
            <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
                <Icon size={18} />
                {label}
            </Link>
            ))}
        </nav>

        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition"
        >
            <LogOut size={18} />
            Logout
        </button>
        </aside>
    )
}