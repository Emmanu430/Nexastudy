import { motion } from "motion/react"
import Footer from "../components/Footer"
const features = [
    {
        title: "Smart Notes",
        description: "Organize and search your notes effortlessly.",
    },
    {
        title: "Task Tracking",
        description: "Stay on top of assignments and deadlines.",
    },
    {
        title: "AI Study Assistant",
        description: "Get instant help understanding your coursework.",
    },
    ]

    export default function Landing() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <section className="text-center">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white"
            >
            NexaStudy
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400"
            >
            Your Academic Operating System
            </motion.p>

            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
            </button>
        </section>

        <section className="py-20 px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
                <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="p-6 rounded-xl bg-gray-900"
                >
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
                </motion.div>
            ))}
            </div>
        </section>
        <Footer />
        </div>
    )
}