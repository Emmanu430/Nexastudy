import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NotesPages from './pages/NotesPages'
import TasksPages from './pages/TasksPages'
import AiChat from './pages/AiChat'

export default function App() {
  const location = useLocation()
  const hideNavbarPaths = ['/dashboard', '/notes', '/tasks', '/ai-chat', '/profile']
  const showNavbar = !hideNavbarPaths.includes(location.pathname)

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/notes" element={
          <ProtectedRoute>
            <NotesPages />
          </ProtectedRoute>
        } />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TasksPages />
          </ProtectedRoute>
        } />
        <Route path="/ai-chat" element={
          <ProtectedRoute>
            <AiChat />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}