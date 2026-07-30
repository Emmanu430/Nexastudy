import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="relative flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
        <Link to="/" className="text-xl font-bold text-white">
            Nexa<span className="text-blue-500">Study</span>
        </Link>

        {/* Desktop links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <Link to="/auth" className="text-gray-300 hover:text-white transition">Login</Link>
            <button
            onClick={() => navigate('/auth', { state: { register: true } })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
            Get Started
            </button>
        </div>

        {/* Hamburger button - only visible on mobile */}
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
        >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile dropdown menu */}
        {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-950 border-b border-gray-800 flex flex-col p-6 gap-4 md:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition">Home</Link>
            <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition">Features</a>
            <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition">Login</Link>
            <button
                onClick={() => { setMenuOpen(false); navigate('/auth', { state: { register: true } }) }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Get Started
            </button>
            </div>
        )}
        </nav>
    )
}