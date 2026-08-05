import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api, { getCsrfCookie } from '../api'
import { useAuth } from '../context/AuthContext'

    export default function Auth() {
    const location = useLocation()
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [isLogin, setIsLogin] = useState(!location.state?.register)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
    const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoginSubmitting(true)
    try {
        await getCsrfCookie()
        await api.post('/login', { email, password })
        const { data } = await api.get('/api/user')
        setUser(data)
        navigate('/dashboard')
    } catch (err) {
        const message = err.response?.data?.message || 'Login failed. Please check your credentials.'
        setError(message)
    } finally {
        setIsLoginSubmitting(false)
    }
}

    const [name, setName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (registerPassword !== confirmPassword) {
        setError("Passwords don't match")
        return
    }
    setIsRegisterSubmitting(true)
    try {
        await getCsrfCookie()
        await api.post('/register', {
            name,
            email: registerEmail,
            password: registerPassword,
            password_confirmation: confirmPassword,
        })
        const { data } = await api.get('/api/user')
        setUser(data)
        navigate('/dashboard')
    } catch (err) {
        const message = err.response?.data?.message || 'Registration failed. Please try again.'
        setError(message)
    } finally {
        setIsRegisterSubmitting(false)
    }
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-full max-w-md p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-transparent rounded-xl">
            <div className="flex gap-4 mb-6">
            <button
                onClick={() => {setIsLogin(true); setError('')}}
                className={`flex-1 py-2 rounded-lg font-medium ${
                isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
            >
                Login
            </button>
            <button
                onClick={() => { setIsLogin(false); setError('')}}
                className={`flex-1 py-2 rounded-lg font-medium ${
                !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
            >
                Register
            </button>
            </div>
                {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                {error}
            </div>
        )}
            {isLogin ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
    type="submit"
    disabled={isLoginSubmitting}
    className="mt-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
    {isLoginSubmitting ? (
        <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Logging in...
        </>
    ) : (
        'Log In'
    )}
</button>
            </form>
            ) : (
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
    type="submit"
    disabled={isRegisterSubmitting}
    className="mt-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
    {isRegisterSubmitting ? (
        <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Registering...
        </>
    ) : (
        'Register'
    )}
</button>
            </form>
            )}
        </div>
        </div>
    )
}