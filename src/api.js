import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
    Accept: 'application/json',
    },
})

export const getCsrfCookie = () => api.get('/sanctum/csrf-cookie')

export const getNotes = () => api.get('/api/notes')
export const createNote = (data) => api.post('/api/notes', data)
export const updateNote = (id, data) => api.put(`/api/notes/${id}`, data)
export const deleteNote = (id) => api.delete(`/api/notes/${id}`)

export const getTasks = () => api.get('/api/tasks')
export const createTask = (data) => api.post('/api/tasks', data)
export const updateTask = (id, data) => api.put(`/api/tasks/${id}`, data)
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`)

export const updateProfile = (data) => api.put('/api/profile', data)
export const updatePassword = (data) => api.put('/api/profile/password', data)

export default api