import { motion } from "motion/react"
import Footer from "../components/Footer"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../swiper-custom.css'
import { useNavigate } from 'react-router-dom'


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
    const testimonials = [
        { name: 'Amara O.', school: 'UNILAG', quote: 'NexaStudy completely changed how I organize my semester.' },
        { name: 'Tunde B.', school: 'OAU', quote: 'The AI chat helps me understand topics faster than reading alone.' },
        { name: 'Chioma K.', school: 'UI', quote: 'Finally, one place for notes, tasks, and everything else.' },
]

    export default function Landing() {
        const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 overflow-x-hidden">
        <section className="w-full text-center pt-20">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-white"
            >
            Nexa<span className="text-blue-500">Study</span>
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400"
            >
            Your Academic Operating System
            </motion.p>

            <button 
            onClick={() => navigate('/auth', { state: { register: true } })}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
            </button>
        </section>

        <section id="features" className="w-full py-20 px-6">
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
        <section  className="w-full py-20 px-6 overflow-hidden">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What Students Say</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                style={{ width: '100%' }}
                className="max-w-2xl mx-auto pb-12"
            >
                {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                    <div className="p-6 sm:p-8 rounded-xl bg-gray-900 text-center">
                    <p className="text-gray-300 text-lg italic">"{t.quote}"</p>
                    <p className="mt-4 text-white font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.school}</p>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </section>
        <Footer />
        </div>
    )
}