import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getNotes = () => api.get('/api/notes')
export const createNote = (data) => api.post('/api/notes', data)
export const updateNote = (id, data) => api.put(`/api/notes/${id}`, data)
export const deleteNote = (id) => api.delete(`/api/notes/${id}`)

export const getTasks = () => api.get('/api/tasks')
export const createTask = (data) => api.post('/api/tasks', data)
export const updateTask = (id, data) => api.put(`/api/tasks/${id}`, data)
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`)

export const getCourses = () => api.get('/api/courses')
export const createCourse = (data) => api.post('/api/courses', data)
export const updateCourse = (id, data) => api.put(`/api/courses/${id}`, data)
export const deleteCourse = (id) => api.delete(`/api/courses/${id}`)

export const updateProfile = (data) => api.put('/api/profile', data)
export const updatePassword = (data) => api.put('/api/profile/password', data)

export const sendChatMessage = (message) => api.post('/api/chat', { message })

export default api