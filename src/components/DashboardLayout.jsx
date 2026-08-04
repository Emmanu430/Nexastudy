import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'

export default function DashboardLayout({ children }) {
    const { sidebarOpen, setSidebarOpen } = useAuth()

    return (
        <div className="flex bg-gray-950 min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 p-8">
            {!sidebarOpen && (
            <button
                onClick={() => setSidebarOpen(true)}
                className="mb-6 text-white hover:text-blue-500 transition"
            >
                <Menu size={24} />
            </button>
            )}
            {children}
        </main>
        </div>
    )
}