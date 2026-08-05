import { useState, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getNotes, createNote, updateNote, deleteNote } from '../api'
import { Trash2, Pencil } from 'lucide-react'

export default function NotesPages() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editContent, setEditContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    const fetchNotes = async () => {
        try {
        const response = await getNotes()
        setNotes(response.data)
        } catch (error) {
        console.error('Failed to fetch notes:', error)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const splitTitleAndContent = (text) => {
        const lines = text.trim().split('\n')
        const title = lines[0].slice(0, 255)
        const restOfContent = lines.slice(1).join('\n')
        return { title, content: restOfContent }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!content.trim()) return
        setIsCreating(true)
        try {
        await createNote(splitTitleAndContent(content))
        setContent('')
        fetchNotes()
        } catch (error) {
        console.error('Failed to create note:', error)
        } finally {
        setIsCreating(false)
        }
    }

    const handleDelete = async (id) => {
        try {
        await deleteNote(id)
        setNotes(notes.filter((note) => note.id !== id))
        } catch (error) {
        console.error('Failed to delete note:', error)
        }
    }

    const startEditing = (note) => {
        setEditingId(note.id)
        setEditContent(note.content ? `${note.title}\n${note.content}` : note.title)
    }

    const cancelEditing = () => {
        setEditingId(null)
        setEditContent('')
    }

    const handleSaveEdit = async (id) => {
        if (!editContent.trim()) return
        setIsSaving(true)
        try {
        const { data } = await updateNote(id, splitTitleAndContent(editContent))
        setNotes(notes.map((note) => (note.id === id ? data : note)))
        setEditingId(null)
        setEditContent('')
        } catch (error) {
        console.error('Failed to update note:', error)
        } finally {
        setIsSaving(false)
        }
    }

    return (
        <DashboardLayout>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notes</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Capture and organize your thoughts.</p>

        <form onSubmit={handleCreate} className="mt-8 p-6 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <textarea
            placeholder="Start typing... the first line becomes your note's title"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
            <button
            type="submit"
            disabled={isCreating}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
            {isCreating ? 'Adding...' : 'Add Note'}
            </button>
        </form>

        <div className="mt-8">
            {loading ? (
            <p className="text-gray-500">Loading notes...</p>
            ) : notes.length === 0 ? (
            <p className="text-gray-500">You have no notes yet. Create one above!</p>
            ) : (
            <div className="grid md:grid-cols-2 gap-4">
                {notes.map((note) => (
                <div key={note.id} className="p-5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    {editingId === note.id ? (
                    <>
                        <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        />
                        <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => handleSaveEdit(note.id)}
                            disabled={isSaving}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={cancelEditing}
                            className="px-4 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        </div>
                    </>
                    ) : (
                    <>
                        <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{note.title}</h3>
                        <div className="flex gap-2">
                            <button
                            onClick={() => startEditing(note)}
                            className="text-gray-500 hover:text-blue-500 transition"
                            >
                            <Pencil size={16} />
                            </button>
                            <button
                            onClick={() => handleDelete(note.id)}
                            className="text-gray-500 hover:text-red-500 transition"
                            >
                            <Trash2 size={16} />
                            </button>
                        </div>
                        </div>
                        {note.content && <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">{note.content}</p>}
                    </>
                    )}
                </div>
                ))}
            </div>
            )}
        </div>
        </DashboardLayout>
    )
}