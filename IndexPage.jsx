import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { useAnnouncements } from './AnnouncementContext.jsx';

export default function IndexPage() {
    const [dismissedAnnouncements, setDismissedAnnouncements] = useState([]);
    const { announcements } = useAnnouncements();

    const services = [
        {
            title: 'Weekly Meetings',
            description: 'Every Tuesday at 7:00 PM with structured activities, games, and skill-building',
            emoji: '📅'
        },
        {
            title: 'Outdoor Adventures',
            description: '10-12 camping trips yearly including weekend campouts and summer camps',
            emoji: '⛺'
        },
        {
            title: 'Merit Badges',
            description: 'Earn 13 Eagle-required badges and more across diverse skill areas and interests',
            emoji: '🎖️'
        },
        {
            title: 'Leadership Training',
            description: 'Hold positions of responsibility and develop leadership skills through experience',
            emoji: '👨‍💼'
        }
    ];

    const stats = [
        { number: '22+', label: 'Eagle Scouts' },
        { number: '30', label: 'Years Strong' },
        { number: '50+', label: 'Active Members' },
        { number: '95%', label: 'Advancement Success' }
    ];

    const toggleAnnouncement = (id) => {
        setDismissedAnnouncements(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen">
            {/* Day to Night Transition Background */}
            <div className="day-night-background">
                {/* Day Side - Left */}
                <div className="day-side">
                    {/* Sun */}
                    <div className="sun"></div>

                    {/* Trees */}
                    <div className="tree-day" style={{ left: '15%', bottom: '0' }}>
                        <div className="tree-day-foliage"></div>
                        <div className="tree-day-trunk"></div>
                    </div>
                    <div className="tree-day" style={{ left: '35%', bottom: '0' }}>
                        <div className="tree-day-foliage"></div>
                        <div className="tree-day-trunk"></div>
                    </div>

                    {/* Deer */}
                    <div className="deer-day" style={{ left: '20%' }}>
                        <div className="deer-body">
                            <div className="deer-head">
                                <div className="deer-ear deer-ear-left"></div>
                                <div className="deer-ear deer-ear-right"></div>
                                <div className="deer-eye"></div>
                            </div>
                            <div className="deer-leg deer-leg-1"></div>
                            <div className="deer-leg deer-leg-2"></div>
                            <div className="deer-leg deer-leg-3"></div>
                            <div className="deer-leg deer-leg-4"></div>
                        </div>
                    </div>

                    {/* Tents - Day */}
                    <div className="tent-day" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                        <div className="tent-canvas">
                            <div className="tent-pole"></div>
                            <div className="tent-flag"></div>
                        </div>
                    </div>
                </div>

                {/* Night Side - Right */}
                <div className="night-side">
                    {/* Moon */}
                    <div className="moon"></div>

                    {/* Stars */}
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 60}%`,
                                animation: `twinkle ${2 + Math.random() * 2}s infinite`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        ></div>
                    ))}

                    {/* Night Trees */}
                    <div className="tree-night" style={{ right: '15%', bottom: '0' }}>
                        <div className="tree-night-foliage"></div>
                        <div className="tree-night-trunk"></div>
                    </div>
                    <div className="tree-night" style={{ right: '35%', bottom: '0' }}>
                        <div className="tree-night-foliage"></div>
                        <div className="tree-night-trunk"></div>
                    </div>

                    {/* Night Tents with Light */}
                    <div className="tent-night" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                        <div className="tent-night-canvas">
                            <div className="tent-light"></div>
                        </div>
                    </div>

                    {/* Scouts under stars */}
                    <div className="scout-group" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                        <div className="scout">
                            <div className="scout-head"></div>
                            <div className="scout-body"></div>
                            <div className="scout-legs">
                                <div className="scout-leg"></div>
                                <div className="scout-leg"></div>
                            </div>
                        </div>
                        <div className="scout">
                            <div className="scout-head"></div>
                            <div className="scout-body"></div>
                            <div className="scout-legs">
                                <div className="scout-leg"></div>
                                <div className="scout-leg"></div>
                            </div>
                        </div>
                        <div className="scout">
                            <div className="scout-head"></div>
                            <div className="scout-body"></div>
                            <div className="scout-legs">
                                <div className="scout-leg"></div>
                                <div className="scout-leg"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transition Gradient */}
                <div className="transition-gradient"></div>
            </div>

            {/* Content Layer */}
            <div className="background-content">
                {/* Shared Header */}
                <Header />

            <main id="main-content" className="pt-24">
                {/* Hero Section - Mindoor Style */}
                <section className="py-20 md:py-32 bg-gradient-to-b from-white/95 to-white/90 day-section">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white leading-tight">
                                You're Not Alone
                                <br />
                                <span className="text-yellow-300">Adventure Starts Here</span>
                            </h1>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join BSA Troop 242 and discover a community where scouts develop leadership, build confidence, and create lifelong friendships through adventure and outdoor experiences.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <a href="mailto:troop242sanford@gmail.com" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                                    Join Us Today
                                </a>
                                <a href="/" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                                    Learn More
                                </a>
                            </div>

                            {/* Client Avatars */}
                            <div className="flex justify-center items-center gap-2">
                                <div className="flex -space-x-4">
                                    {['🦅', '❤️', '🌟', '🥇', '🎖️'].map((emoji, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl border-2 border-white">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-white/80 ml-4">Trusted by 50+ scouts and families</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Announcements Section */}
                <section className="py-16 md:py-20 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 backdrop-blur-sm day-section">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <Bell className="w-8 h-8 text-white" />
                            <h2 className="text-3xl md:text-4xl font-black text-white">
                                Latest Announcements
                            </h2>
                        </motion.div>

                        <div className="space-y-4">
                            {announcements.map((announcement, i) => (
                                !dismissedAnnouncements.includes(announcement.id) && (
                                    <motion.div
                                        key={announcement.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`p-6 rounded-lg border-l-4 flex items-start justify-between backdrop-blur-sm ${
                                            announcement.type === 'success'
                                                ? 'bg-emerald-500/90 border-emerald-300'
                                                : announcement.type === 'warning'
                                                ? 'bg-amber-500/90 border-amber-300'
                                                : 'bg-blue-500/90 border-blue-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <span className="text-3xl mt-1">{announcement.icon}</span>
                                            <div>
                                                <h3 className="font-bold text-white mb-1">{announcement.title}</h3>
                                                <p className="text-white/90 text-sm">{announcement.message}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => toggleAnnouncement(announcement.id)}
                                            className="ml-4 text-white/60 hover:text-white transition-colors flex-shrink-0"
                                            aria-label="Dismiss announcement"
                                        >
                                            <X size={20} />
                                        </button>
                                    </motion.div>
                                )
                            ))}
                        </div>

                        {announcements.length > 0 && dismissedAnnouncements.length === announcements.length && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12"
                            >
                                <p className="text-gray-500">No active announcements at this time.</p>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 bg-white/90 backdrop-blur-sm day-section">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-16 text-white"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            What We Offer
                        </motion.h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {services.map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 bg-white/95 rounded-lg border border-white/50 hover:border-yellow-300 hover:shadow-lg transition-all backdrop-blur-sm"
                                >
                                    <div className="text-5xl mb-4">{service.emoji}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-white/80">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-20 bg-white/90 backdrop-blur-sm day-section">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="grid md:grid-cols-4 gap-8 text-center"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="text-5xl font-black text-yellow-300 mb-3">{stat.number}</div>
                                    <div className="text-white/90 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 bg-gradient-to-b from-gray-100/80 to-white/80 backdrop-blur-sm day-section">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-4 text-white"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Our Leadership Team
                        </motion.h2>
                        <p className="text-center text-white/80 text-lg mb-16 max-w-2xl mx-auto">
                            Experienced Scout Masters and volunteers dedicated to guiding the next generation of leaders
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { role: 'Scoutmaster', name: 'Dedicated to Excellence', emoji: '👨‍🏫' },
                                { role: 'Assistant Scoutmaster', name: 'Guiding Each Step', emoji: '👨‍💼' },
                                { role: 'Committee Chair', name: 'Supporting Growth', emoji: '👩‍💼' }
                            ].map((member, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl mx-auto mb-4">
                                        {member.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-1">{member.role}</h3>
                                    <p className="text-white/80">{member.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-scout-green to-emerald-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Start Your Adventure?</h2>
                            <p className="text-xl text-green-100 mb-8">
                                We meet every Tuesday at 7:00 PM. New scouts always welcome.
                            </p>
                            <div>
                                <button onClick={() => window.open('https://calendar.google.com/calendar/r?cid=k11l4b9od26qdlquf6fth7stbg%40group.calendar.google.com', '_blank')} className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all btn-borderless">Calendar</button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <a href="mailto:troop242sanford@gmail.com" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                                    Mail Us for any inquiries
                                </a>
                               
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

                {/* Shared Footer */}
                <Footer />
            </div>
        </div>
    );
}
