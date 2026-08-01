import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { updateProfile, updatePassword } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
    const { user, setUser } = useAuth()
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [profileMessage, setProfileMessage] = useState('')
    const [profileError, setProfileError] = useState('')
    const [isSavingProfile, setIsSavingProfile] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isSavingPassword, setIsSavingPassword] = useState(false)

    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        setProfileMessage('')
        setProfileError('')
        setIsSavingProfile(true)
        try {
        const { data } = await updateProfile({ name, email })
        setUser(data)
        setProfileMessage('Profile updated successfully')
        } catch (err) {
        setProfileError(err.response?.data?.message || 'Failed to update profile')
        } finally {
        setIsSavingProfile(false)
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setPasswordMessage('')
        setPasswordError('')
        if (newPassword !== confirmPassword) {
        setPasswordError("New passwords don't match")
        return
        }
        setIsSavingPassword(true)
        try {
        await updatePassword({
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
        })
        setPasswordMessage('Password updated successfully')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        } catch (err) {
        setPasswordError(err.response?.data?.message || 'Failed to update password')
        } finally {
        setIsSavingPassword(false)
        }
    }

    return (
        <DashboardLayout>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-gray-400">Manage your account details.</p>

        <form onSubmit={handleProfileSubmit} className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-800 max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">Basic Info</h2>

            {profileMessage && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                {profileMessage}
            </div>
            )}
            {profileError && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {profileError}
            </div>
            )}

            <label className="text-sm text-gray-400">Name</label>
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
            />

            <label className="text-sm text-gray-400">Email</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
            type="submit"
            disabled={isSavingProfile}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
            {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="mt-6 p-6 rounded-xl bg-gray-900 border border-gray-800 max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>

            {passwordMessage && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                {passwordMessage}
            </div>
            )}
            {passwordError && (
            <div className="mb-4 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {passwordError}
            </div>
            )}

            <label className="text-sm text-gray-400">Current Password</label>
            <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
            />

            <label className="text-sm text-gray-400">New Password</label>
            <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
            />

            <label className="text-sm text-gray-400">Confirm New Password</label>
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-600"
            />

            <button
            type="submit"
            disabled={isSavingPassword}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
            {isSavingPassword ? 'Saving...' : 'Update Password'}
            </button>
        </form>
        </DashboardLayout>
    )
}