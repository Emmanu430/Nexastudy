import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { sendChatMessage } from '../api'
import ReactMarkdown from 'react-markdown'
import { Send } from 'lucide-react'
import remarkGfm from 'remark-gfm'

export default function AiChat() {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || isSending) return

        const userMessage = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput('')
        setIsSending(true)

        try {
            const { data } = await sendChatMessage(input)
            setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Sorry, I couldn't process that. Please try again." },
            ])
        } finally {
            setIsSending(false)
        }
    }

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Chat</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Ask anything about your coursework.</p>

            <div className="mt-6 flex flex-col h-[60vh] rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    {messages.length === 0 && (
                        <p className="text-gray-500 text-center mt-8">
                            Start a conversation — ask a study question to get going.
                        </p>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                msg.role === 'user'
                                    ? 'self-end bg-blue-600 text-white'
                                    : 'self-start bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-transparent'
                            }`}
                        >
                            {msg.role === 'assistant' ? (
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                </div>
                            ) : (
                                <p>{msg.content}</p>
                            )}
                        </div>
                    ))}

                    {isSending && (
                        <div className="self-start bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-4 py-3 rounded-2xl border border-gray-200 dark:border-transparent">
                            Thinking...
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="flex gap-3 p-4 border-t border-gray-200 dark:border-gray-800">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                        type="submit"
                        disabled={isSending}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </DashboardLayout>
    )
}