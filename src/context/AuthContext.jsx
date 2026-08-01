import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    useEffect(() => {
        api.get('/api/user')
        .then((response) => setUser(response.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, sidebarOpen, setSidebarOpen }}>
        {children}
        </AuthContext.Provider>
    )
    }

    export function useAuth() {
    return useContext(AuthContext)
}