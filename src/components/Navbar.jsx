import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
        <Link to="/" className="text-xl font-bold text-white">
            Nexa<span className="text-blue-500">Study</span>
        </Link>

        <div className="flex gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition">
            Login
            </Link>
        </div>
        </nav>
    )
}