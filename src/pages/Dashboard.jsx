import DashboardLayout from '../components/DashboardLayout'

const stats = [
  { label: 'Notes', value: 12 },
  { label: 'Tasks Due', value: 4 },
  { label: 'Courses', value: 6 },
]

export default function Dashboard() {
    return (
        <DashboardLayout>
        <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
        <p className="mt-2 text-gray-400">Here's what's happening in your academic world today.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            ))}
        </div>
        </DashboardLayout>
    )
}