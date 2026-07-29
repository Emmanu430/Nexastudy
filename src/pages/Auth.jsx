import { useState } from 'react'

    export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ email, password })
    }

    const [name, setName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        if (registerPassword !== confirmPassword) {
        alert("Passwords don't match")
        return
        }
        console.log({ name, email: registerEmail, password: registerPassword })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl">
            <div className="flex gap-4 mb-6">
            <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg font-medium ${
                isLogin ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
            >
                Login
            </button>
            <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg font-medium ${
                !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                }`}
            >
                Register
            </button>
            </div>

            {isLogin ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                type="submit"
                className="mt-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                Log In
                </button>
            </form>
            ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                type="submit"
                className="mt-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                Register
                </button>
            </form>
            )}
        </div>
        </div>
    )
}