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

export default api