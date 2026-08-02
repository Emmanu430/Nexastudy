import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { LayoutDashboard, StickyNote, ListTodo, MessageSquare, User, LogOut, X } from 'lucide-react'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import LogoIcon from './Logo'

export default function Sidebar({ isOpen, onClose }) {
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
        <AnimatePresence>
        {isOpen && (
            <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.aside
                initial={{ x: -256 }}
                animate={{ x: 0 }}
                exit={{ x: -256 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-6 z-50"
            >
                <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex  items-center   overflow-hidden">
                    <LogoIcon size={50} />
                    <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl  font-bold text-white whitespace-nowrap"
                    >
                        Nexa<span className="text-blue-500">Study</span>
                    </motion.span>
                </Link>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
                </div>

                {user && (
                <div className="mb-8 pb-6 border-b border-gray-800">
                    <p className="text-white font-medium truncate">{user.name}</p>
                    <p className="text-gray-500 text-sm truncate">{user.email}</p>
                </div>
                )}

                <nav className="flex flex-col gap-1 flex-1">
{navItems.map(({ to, label, icon: Icon }, index) => (
    <motion.div
    key={to}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
    >
    <Link
        to={to}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition whitespace-nowrap"
    >
        <Icon size={18} />
        {label}
    </Link>
    </motion.div>
))}
</nav>

                <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition whitespace-nowrap"
                >
                <LogOut size={18} />
                Logout
                </button>
            </motion.aside>
            </>
        )}
        </AnimatePresence>
    )
}