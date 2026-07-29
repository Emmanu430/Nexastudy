import Sidebar from './Sidebar'

export default function DashboardLayout({ children }) {
    return (
        <div className="flex bg-gray-950 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
            {children}
        </main>
        </div>
    )
}