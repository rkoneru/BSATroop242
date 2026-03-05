import { motion } from 'framer-motion';
import { Lock, LogOut, Bell, Eye, EyeOff, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useAnnouncements } from './AnnouncementContext.jsx';

export default function MembersPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // 'admin' or 'leader'
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const { announcements, addAnnouncement, deleteAnnouncement } = useAnnouncements();

    // Mock credentials (in real app, this would be backend authentication)
    const credentials = {
        admin: { username: 'admin', password: 'troop242admin' },
        leader: { username: 'leader', password: 'troop242leader' }
    };

    // State for event signups
    const [eventSignups, setEventSignups] = useState([
        { id: 1, fullName: 'John Smith', email: 'john@email.com', phone: '(555) 123-4567', eventType: 'Camping Trip', notes: 'First time camping', date: '2025-03-01' },
        { id: 2, fullName: 'Sarah Lee', email: 'sarah@email.com', phone: '(555) 234-5678', eventType: 'Car Wash', notes: 'Can help setup', date: '2025-03-02' },
        { id: 3, fullName: 'Mike Johnson', email: 'mike@email.com', phone: '(555) 345-6789', eventType: 'Merit Badge Class', notes: 'Interested in Cooking', date: '2025-03-03' }
    ]);

    const [newAnnouncement, setNewAnnouncement] = useState({ type: 'info', title: '', message: '', icon: '' });
    const [editingId, setEditingId] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        if (loginData.username === credentials.admin.username && loginData.password === credentials.admin.password) {
            setIsLoggedIn(true);
            setUserRole('admin');
        } else if (loginData.username === credentials.leader.username && loginData.password === credentials.leader.password) {
            setIsLoggedIn(true);
            setUserRole('leader');
        } else {
            alert('Invalid credentials. Try admin/troop242admin or leader/troop242leader');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setLoginData({ username: '', password: '' });
    };

    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        if (newAnnouncement.title && newAnnouncement.message) {
            addAnnouncement(newAnnouncement);
            setNewAnnouncement({ type: 'info', title: '', message: '', icon: '' });
        }
    };

    const deleteSignup = (id) => {
        setEventSignups(eventSignups.filter(s => s.id !== id));
    };

    const handleSignupAction = (id, action) => {
        if (action === 'approve') {
            alert('Signup approved! Confirmation email will be sent.');
        } else if (action === 'reject') {
            alert('Signup rejected! Rejection email will be sent.');
            deleteSignup(id);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="bg-scout min-h-screen page-container flex flex-col">
                <Header />
                <main id="main-content" className="flex-1 flex items-center justify-center px-4 md:px-8 py-20">
                    <div className=" max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/5 backdrop-blur p-9 rounded-xl border border-scout-green/30 shadow-2xl"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="flex justify-center mb-8"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-scout-green to-emerald-600 rounded-full flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                            </motion.div>
                            {/* Heading */}
                            <h1 className="text-3xl font-black text-center mb-2 text-scout-gradient italic">
                                Members Portal
                            </h1>
                            <p className="text-center text-gray-300 mb-8 text-sm">
                                Leaders and Admins login
                            </p>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-5 mb-8">
                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={loginData.username}
                                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-scout-green/30 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-white/10 backdrop-blur text-white placeholder-gray-400 transition-all"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-scout-green/30 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-white/10 backdrop-blur text-white placeholder-gray-400 transition-all"
                                            placeholder="Enter password"
                                            required
                                        />
                                        <motion.button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            whileHover={{ scale: 1.1 }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-scout-green transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-scout-green to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                                >
                                    Sign In
                                </motion.button>
                            </form>

                            {/* Demo Credentials */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="bg-scout-green/10 border-l-4 border-scout-green rounded-lg p-5"
                            >
                                <p className="text-sm font-bold text-scout-green mb-3">Demo Credentials:</p>
                                <div className="space-y-2">
                                    <div className="text-xs">
                                        <span className="text-scout-green font-semibold">Admin:</span>
                                        <span className="text-gray-300 ml-2">admin / troop242admin</span>
                                    </div>
                                    <div className="text-xs">
                                        <span className="text-scout-green font-semibold">Leader:</span>
                                        <span className="text-gray-300 ml-2">leader / troop242leader</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-scout min-h-screen page-container">
            <Header />
            <main id="main-content" className="pt-32 pb-20 px-4 md:px-8">
                {/* Dashboard Header */}
                <section className="py-8 bg-gradient-to-r from-scout-green/10 to-emerald-600/10 border-b border-scout-green/30 mb-12">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-black text-scout-gradient italic uppercase">Dashboard</h1>
                            <p className="text-gray-700 mt-2">Welcome, {userRole === 'admin' ? 'Administrator' : 'Leader'}!</p>
                        </div>
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
                        >
                            <LogOut size={20} />
                            Logout
                        </motion.button>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    {/* Announcements Section */}
                    {userRole === 'admin' && (
                        <section className="card-scout p-8 rounded-xl">
                            <h2 className="text-3xl font-black text-scout-gradient italic uppercase mb-8 flex items-center gap-3">
                                <Bell size={32} />
                                Manage Announcements
                            </h2>

                            {/* Add Announcement Form */}
                            <form onSubmit={handleAddAnnouncement} className="mb-12 p-6 bg-gray-800/30 rounded-lg border border-scout-green/30">
                                <h3 className="text-xl font-bold mb-6">Create New Announcement</h3>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Type</label>
                                        <select
                                            value={newAnnouncement.type}
                                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-scout-green"
                                        >
                                            <option value="info">Info (Blue)</option>
                                            <option value="success">Success (Green)</option>
                                            <option value="warning">Warning (Amber)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Icon (Emoji)</label>
                                        <input
                                            type="text"
                                            value={newAnnouncement.icon}
                                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, icon: e.target.value })}
                                            placeholder="e.g., 🎖️"
                                            maxLength="2"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-scout-green"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={newAnnouncement.title}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                                        placeholder="Announcement title"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-scout-green"
                                        required
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-bold mb-2">Message</label>
                                    <textarea
                                        value={newAnnouncement.message}
                                        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                                        placeholder="Announcement message"
                                        rows="3"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-scout-green resize-none"
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 px-6 py-3 bg-scout-green text-white font-bold rounded-lg hover:shadow-lg"
                                >
                                    <Plus size={20} />
                                    Add Announcement
                                </motion.button>
                            </form>

                            {/* Announcements List */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold mb-6">Active Announcements ({announcements.length})</h3>
                                {announcements.map((announcement) => (
                                    <motion.div
                                        key={announcement.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className={`p-6 rounded-lg border-l-4 flex justify-between items-start ${
                                            announcement.type === 'success'
                                                ? 'bg-emerald-50 border-emerald-500'
                                                : announcement.type === 'warning'
                                                ? 'bg-amber-50 border-amber-500'
                                                : 'bg-blue-50 border-blue-500'
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">{announcement.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{announcement.title}</h4>
                                                    <p className="text-xs text-gray-500">{announcement.date}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{announcement.message}</p>
                                        </div>
                                        <motion.button
                                            onClick={() => deleteAnnouncement(announcement.id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="ml-4 text-red-600 hover:text-red-800 flex-shrink-0"
                                        >
                                            <Trash2 size={20} />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Event Signups Section */}
                    <section className="card-scout p-8 rounded-xl">
                        <h2 className="text-3xl font-black text-scout-gradient italic uppercase mb-8 flex items-center gap-3">
                            📋 Event Signups
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-700">Total Signups: <span className="font-bold text-scout-green text-xl">{eventSignups.length}</span></p>
                            </div>

                            {eventSignups.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No event signups yet.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-800/50">
                                            <tr className="text-left">
                                                <th className="px-4 py-3 font-bold text-gray-200">Name</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Email</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Phone</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Event Type</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Notes</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Date</th>
                                                <th className="px-4 py-3 font-bold text-gray-200">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {eventSignups.map((signup) => (
                                                <tr key={signup.id} className="hover:bg-gray-800/20 transition-colors">
                                                    <td className="px-4 py-3 font-semibold text-gray-800">{signup.fullName}</td>
                                                    <td className="px-4 py-3 text-gray-700">{signup.email}</td>
                                                    <td className="px-4 py-3 text-gray-700">{signup.phone}</td>
                                                    <td className="px-4 py-3 text-gray-700">{signup.eventType}</td>
                                                    <td className="px-4 py-3 text-gray-700 text-sm">{signup.notes || '-'}</td>
                                                    <td className="px-4 py-3 text-gray-700 text-sm">{signup.date}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <motion.button
                                                                onClick={() => handleSignupAction(signup.id, 'approve')}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className="text-green-600 hover:text-green-800"
                                                                title="Approve"
                                                            >
                                                                <Check size={18} />
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={() => handleSignupAction(signup.id, 'reject')}
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Reject"
                                                            >
                                                                <X size={18} />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
