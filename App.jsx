import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    Menu,
    X,
    Download,
    MapPin,
    Clock,
    Users,
    ArrowRight,
    Zap,
    Shield,
    Target,
    CheckCircle2,
    Circle,
    ChevronDown,
    RotateCcw
} from 'lucide-react';

const RANK_REQUIREMENTS = {
    'Scout': ['Learn the Scout Oath & Scout Law', 'Complete Cyber Chip award', 'Participate in a troop/patrol activity'],
    'Tenderfoot': ['Participate in 10 days/nights camping', 'Cook a trail meal outdoors', 'First aid: simple cuts/burns', 'Demonstrate Scout spirit', 'Scoutmaster conference', 'Board of Review'],
    'Second Class': ['Hike at least 5 miles', 'Camp 10 nights total', 'First aid: rescue breathing', 'Map & compass basics', 'Water rescue awareness', 'Scoutmaster conference', 'Board of Review'],
    'First Class': ['Hike 10 miles in a day', 'Camp 20 nights total', 'Cook full outdoor meal', 'First aid: hypothermia & fractures', 'Land navigation by compass', 'Leadership in troop activity', 'Board of Review'],
    'Star': ['Earn 6 merit badges (4 Eagle-required)', 'Hold position of responsibility 4 months', '6 hours of service', 'Scoutmaster conference', 'Board of Review'],
    'Life': ['Earn 11 merit badges (7 Eagle-required)', 'Hold position of responsibility 6 months', '6 hours of service', 'Scoutmaster conference', 'Board of Review'],
    'Eagle': ['Earn 21 merit badges (13 Eagle-required)', 'Hold position of responsibility 6 months', 'Plan & lead Eagle Scout Service Project', 'Complete Eagle Scout application', 'Eagle Board of Review'],
};

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [progress, setProgress] = useState(() => {
        try { return JSON.parse(localStorage.getItem('troop242_rank_progress')) || {}; }
        catch { return {}; }
    });
    const [activeRank, setActiveRank] = useState(null);

    useEffect(() => {
        localStorage.setItem('troop242_rank_progress', JSON.stringify(progress));
    }, [progress]);

    const toggleReq = (rankName, reqIdx) => {
        setProgress(prev => {
            const total = RANK_REQUIREMENTS[rankName].length;
            const current = prev[rankName] || new Array(total).fill(false);
            const updated = [...current];
            updated[reqIdx] = !updated[reqIdx];
            return { ...prev, [rankName]: updated };
        });
    };

    const resetRank = (rankName) => {
        setProgress(prev => ({ ...prev, [rankName]: new Array(RANK_REQUIREMENTS[rankName].length).fill(false) }));
    };

    const events = [
        { date: 'Mar 10', day: 'Tuesday', time: '7:00 PM', title: 'Troop Meeting', location: 'Charter Org', type: 'Meeting', icon: '📅' },
        { date: 'Mar 19-22', day: 'Weekend', time: 'All Day', title: 'Spring Campout', location: 'Keys', type: 'Campout', icon: '⛺', featured: true },
        { date: 'Apr 5', day: 'Saturday', time: '7:30 PM', title: 'Board of Review', location: 'Charter Org', type: 'Advancement', icon: '🎖️' },
    ];

    const meritBadges = [
        // Eagle Required (13 total) - Alphabetical
        { name: 'Camping', emoji: '⛺', url: 'https://www.scouting.org/awards/merit-badges/camping/' },
        { name: 'Citizenship in Community', emoji: '🗳️', url: 'https://www.scouting.org/awards/merit-badges/citizenship-in-the-community/' },
        { name: 'Citizenship in Nation', emoji: '🇺🇸', url: 'https://www.scouting.org/awards/merit-badges/citizenship-in-the-nation/' },
        { name: 'Citizenship in World', emoji: '🌍', url: 'https://www.scouting.org/awards/merit-badges/citizenship-in-the-world/' },
        { name: 'Communication', emoji: '💬', url: 'https://www.scouting.org/awards/merit-badges/communication/' },
        { name: 'Cooking', emoji: '🍳', url: 'https://www.scouting.org/awards/merit-badges/cooking/' },
        { name: 'Emergency Preparedness', emoji: '🚨', url: 'https://www.scouting.org/awards/merit-badges/emergency-preparedness/' },
        { name: 'Energy', emoji: '⚡', url: 'https://www.scouting.org/awards/merit-badges/energy/' },
        { name: 'Environmental Science', emoji: '🌿', url: 'https://www.scouting.org/awards/merit-badges/environmental-science/' },
        { name: 'First Aid', emoji: '🩹', url: 'https://www.scouting.org/awards/merit-badges/first-aid/' },
        { name: 'Personal Fitness', emoji: '💪', url: 'https://www.scouting.org/awards/merit-badges/personal-fitness/' },
        { name: 'Personal Management', emoji: '📊', url: 'https://www.scouting.org/awards/merit-badges/personal-management/' },
        { name: 'Swimming', emoji: '🏊', url: 'https://www.scouting.org/awards/merit-badges/swimming/' },
    ];

    const ranks = [
        { name: 'Scout', emoji: '⭐', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/scout/' },
        { name: 'Tenderfoot', emoji: '🥉', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/tenderfoot/' },
        { name: 'Second Class', emoji: '🥈', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/second-class/' },
        { name: 'First Class', emoji: '🥇', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/first-class/' },
        { name: 'Star', emoji: '🌟', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/star/' },
        { name: 'Life', emoji: '❤️', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/life/' },
        { name: 'Eagle', emoji: '🦅', url: 'https://www.scouting.org/programs/scouts-bsa/advancement-and-awards/eagle/' },
    ];

    const features = [
        { icon: Zap, title: 'Leadership Development', desc: 'Build confidence and skills through hands-on activities' },
        { icon: Shield, title: 'Safety First', desc: 'Trained leaders ensuring every scout learns safely' },
        { icon: Target, title: 'Eagle Path', desc: '80+ Eagle Scouts from our troop leading communities' },
    ];

    const resources = [
        {
            category: 'Medical', items: [
                { title: 'Health & Medical A&B', url: 'https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_AB.pdf' },
                { title: 'Health & Medical C', url: 'https://filestore.scouting.org/filestore/HealthSafety/pdf/680-001_C.pdf' }
            ]
        },
        {
            category: 'Trip Forms', items: [
                { title: 'Permission Slip', url: 'https://filestore.scouting.org/filestore/pdf/512-035_WB.pdf' },
                { title: 'Release Agreement', url: 'https://filestore.scouting.org/filestore/pdf/680-023.pdf' }
            ]
        },
        {
            category: 'Checklists', items: [
                { title: 'Campout Packing List', url: 'https://www.scouting.org/wp-content/uploads/2019/06/Camping-Checklist.pdf' },
                { title: 'Ten Essentials', url: 'https://www.scouting.org/health-and-safety/gss/gss04/' }
            ]
        },
        {
            category: 'Eagle Scout', items: [
                { title: 'Project Workbook', url: 'https://filestore.scouting.org/filestore/pdf/512-927_WB.pdf' },
                { title: 'Eagle Application', url: 'https://filestore.scouting.org/filestore/pdf/512-728.pdf' }
            ]
        },
    ];

    return (
        <div className="bg-scout text-gray-900 min-h-screen font-sans overflow-x-hidden page-container">
            <a href="#main-content" className="skip-link">Skip to main content</a>

            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(64,145,108,0.1)' }}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(212,168,83,0.08)' }}></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-navy-nav border-scout-nav" aria-label="Primary navigation">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-10">
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg text-2xl" style={{ background: 'linear-gradient(135deg, #011301ff, #fafafaff)' }}>
                            ⛺
                        </div>
                        <div>
                            <div className="text-xl font-black italic uppercase tracking-tight text-scout-tan">BSA Troop 242</div>
                            <div className="text-xs text-scout-tan font-semibold">Sanford - Central Florida</div>
                        </div>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#events" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Events</a>
                        <a href="#tracker" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Progress</a>
                        <a href="#badges" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Badges</a>
                        <a href="#features" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Why Us</a>
                        <a href="#resources" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Resources</a>
                        <a href="#contact" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">Contact</a>
                        <a href="https://scoutbook.scouting.org/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">
                            Scoutbook
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-scout-tan/10 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-scout-tan" />
                        ) : (
                            <Menu className="w-6 h-6 text-scout-tan" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-scout-nav overflow-hidden"
                        >
                            <div className="px-6 py-6 bg-navy-nav/95 backdrop-blur-md">
                                <a 
                                    href="#events" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Events
                                </a>
                                <a 
                                    href="#tracker" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Progress
                                </a>
                                <a 
                                    href="#badges" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Badges
                                </a>
                                <a 
                                    href="#features" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Why Us
                                </a>
                                <a 
                                    href="#resources" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Resources
                                </a>
                                <a 
                                    href="#contact" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2 border-b border-gray-200/20"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </a>
                                <a 
                                    href="https://scoutbook.scouting.org/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="block text-base font-semibold text-gray-700 hover:text-scout-green transition-colors py-3 px-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Scoutbook
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main id="main-content">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="mb-6 flex items-center gap-2">
                                <span className="text-scout-tan font-bold text-sm tracking-widest uppercase"></span>
                                <div className="w-12 h-px bg-gradient-to-r from-scout-tan to-transparent"></div>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black italic uppercase mb-6 leading-tight">
                                <span className="text-scout-gradient">Build</span><br />
                                <span>Tomorrow's</span><br />
                                <span className="text-scout-gradient">Leaders</span>
                            </h1>
                            <p className="text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
                                Join BSA Troop 242 Sanford, central Florida for adventure, leadership development, and lifelong friendships. Where scouts become Eagles.
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <motion.a
                                    href="#events"
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 border-2 border-scout-tan text-scout-tan font-bold rounded-lg hover:bg-scout-tan/10 transition-all"
                                >
                                    Explore Events
                                </motion.a>
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.05 }}
                                    className="px-8 py-4 border-2 border-scout-tan text-scout-tan font-bold rounded-lg hover:bg-scout-tan/10 transition-all"
                                >
                                    Join Us
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        className="mt-20 grid grid-cols-3 gap-6 max-w-7xl mx-auto px-6 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        {[
                            { number: '22+', label: 'Eagle Scouts' },
                            { number: '20', label: 'Years Strong' },
                            { number: '50+', label: 'Active Scouts' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-6 rounded-xl stat-card-scout backdrop-blur">
                                <div className="stat-value text-4xl md:text-5xl font-black stat-number-scout mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* Info Cards Section */}
                <section className="py-12 relative z-10 bg-white/5 backdrop-blur">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Weekly Meetings',
                                    emoji: '📅',
                                    description: 'We meet at 7pm on Tuesdays at the Disabled American Veterans, 3512 S Orlando Drive, Sanford, FL 32773.'
                                },
                                {
                                    title: 'Activities',
                                    emoji: '🎯',
                                    description: 'The second Tuesday of every month is an outing. We also plan hikes, canoe trips, service projects and other weekend activities throughout the year.'
                                },
                                {
                                    title: 'Camping',
                                    emoji: '⛺',
                                    description: 'We go camping 10-12 times per year. Weekend camping, Summer and Winter Camps.'
                                }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-xl card-scout text-center"
                                >
                                    <div className="text-4xl mb-3">{card.emoji}</div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-800">{card.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Events Section */}
                <section id="events" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Upcoming <span className="text-scout-gradient">Events</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-6">Upcoming activities and events for Troop 242</p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {events.map((event, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`group relative p-6 rounded-xl transition-all cursor-pointer ${event.featured
                                        ? 'card-scout-featured'
                                        : 'bg-gray-800/50 border border-gray-700/50 hover:border-green-600/50'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">{event.icon}</div>

                                    <div className="mb-4">
                                        <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${event.featured
                                            ? 'badge-scout-featured'
                                            : 'bg-gray-700/50 text-gray-300'
                                            }`}>
                                            {event.type}
                                        </div>
                                        <div className="text-3xl font-black text-scout-tan">{event.date}</div>
                                        <div className="text-sm text-gray-400">{event.day}</div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 group-hover:text-scout-tan transition-colors">{event.title}</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <Clock size={16} className="text-scout-tan" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-300">
                                            <MapPin size={16} className="text-scout-tan" />
                                            {event.location}
                                        </div>
                                    </div>

                                    {event.featured && (
                                        <div className="mt-4 pt-4 border-t border-green-600/20">
                                            <p className="text-xs text-green-300 font-semibold">Featured Event - Don't miss it!</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-12 p-8 rounded-xl banner-calendar-scout backdrop-blur relative z-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <p className="text-lg text-white mb-2">📅 <strong>Full Calendar View</strong></p>
                                    <p className="text-sm text-white/80">All Troop 242 events in one place</p>
                                </div>
                                <a href="https://calendar.google.com/calendar/r?cid=dHJvb3AyNDJzYW5mb3JkQGdtYWlsLmNvbQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-scout-tan font-bold hover:text-white group whitespace-nowrap">
                                    Subscribe to Calendar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* <div className="mt-8 rounded-lg overflow-hidden border border-white/20 bg-white/5">
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?src=troop242sanford%40gmail.com&ctz=America%2FNew_York&mode=MONTH&showTitle=1&showNav=1&showPrint=0&showTabs=1&showCalendars=1"
                                    style={{ border: 'none', width: '100%', height: '450px' }}
                                    title="Troop 242 Events Calendar"
                                    aria-label="Live monthly calendar of Troop 242 events"
                                />
                            </div> */}

                            {/*<div className="mt-6 p-4 rounded-lg bg-white/10 border border-white/10">
                                <p className="text-sm text-white/90">
                                    💡 <strong>Tip:</strong> The calendar above shows all upcoming events. Add events by logging into{' '}
                                    <span className="text-scout-tan font-semibold">troop242sanford@gmail.com</span> on Google Calendar.
                                </p>
                            </div>*/}
                        </motion.div>
                    </div>
                </section>

                {/* Why Us Section */}
                <section id="features" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Why <span className="text-scout-gradient">Join Us</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-12">What makes CFL Troop 242 Sanford special</p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 hover:border-green-600/50 transition-all group"
                                    >
                                        <div className="w-14 h-14 rounded-lg icon-box-scout flex items-center justify-center mb-6 icon-box-scout-hover transition-all">
                                            <Icon size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>



                {/* Rank Progress Calculator */}
                <section id="tracker" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            aria-label="Rank Progress Calculator"
                        >
                            Rank <span className="text-scout-gradient">Progress</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-8">
                            Check off requirements as you complete them — saved automatically on this device
                        </p>

                        <div role="list">
                            {ranks.map((rank) => {
                                const reqs = RANK_REQUIREMENTS[rank.name];
                                const done = (progress[rank.name] || []).filter(Boolean).length;
                                const pct = reqs ? Math.round((done / reqs.length) * 100) : 0;
                                const isComplete = done === reqs?.length;
                                const isOpen = activeRank === rank.name;

                                return (
                                    <motion.div
                                        key={rank.name}
                                        className="rank-accordion"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        role="listitem"
                                    >
                                        <button
                                            className={`rank-accordion__header${isComplete ? ' rank-accordion__header--complete' : ''}`}
                                            onClick={() => setActiveRank(isOpen ? null : rank.name)}
                                            aria-expanded={isOpen}
                                            aria-controls={`rank-panel-${rank.name.replace(' ', '-')}`}
                                        >
                                            <span className="text-2xl" role="img" aria-label={rank.name}>{rank.emoji}</span>
                                            <div className="flex-1">
                                                <div className="font-bold text-base">{rank.name}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">
                                                    {done}/{reqs?.length ?? 0} completed
                                                    {isComplete && <span className="ml-2 text-emerald-400 font-semibold">✓ Done!</span>}
                                                </div>
                                            </div>
                                            <div
                                                className="rank-progress-bar"
                                                style={{ width: '80px' }}
                                                role="progressbar"
                                                aria-valuenow={pct}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-label={`${rank.name} progress: ${pct}%`}
                                            >
                                                <div
                                                    className={`rank-progress-bar__fill${isComplete ? ' rank-progress-bar__fill--complete' : ''}`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <ChevronDown
                                                size={20}
                                                className="text-gray-400 transition-transform"
                                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                aria-hidden="true"
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    id={`rank-panel-${rank.name.replace(' ', '-')}`}
                                                    className="rank-accordion__body"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {reqs.map((req, idx) => {
                                                        const checked = (progress[rank.name] || [])[idx] ?? false;
                                                        return (
                                                            <button
                                                                key={idx}
                                                                className={`rank-req-btn${checked ? ' rank-req-btn--done' : ''}`}
                                                                onClick={() => toggleReq(rank.name, idx)}
                                                                role="checkbox"
                                                                aria-checked={checked}
                                                            >
                                                                {checked
                                                                    ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" aria-hidden="true" />
                                                                    : <Circle size={18} className="text-gray-500 shrink-0" aria-hidden="true" />
                                                                }
                                                                {req}
                                                            </button>
                                                        );
                                                    })}
                                                    <div className="rank-progress-bar" role="presentation">
                                                        <div
                                                            className={`rank-progress-bar__fill${isComplete ? ' rank-progress-bar__fill--complete' : ''}`}
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                    <button
                                                        className="rank-reset-btn"
                                                        onClick={() => resetRank(rank.name)}
                                                        aria-label={`Reset ${rank.name} progress`}
                                                    >
                                                        <RotateCcw size={12} style={{ display: 'inline', marginRight: '4px' }} aria-hidden="true" />
                                                        Reset rank
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Merit Badges Section */}
                <section id="badges" className="py-16 md:py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black mb-2 md:mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Merit <span className="text-scout-gradient">Badges</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Earn badges and develop skills in areas that interest you</p>

                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-4 md:p-8 border border-gray-700/50 backdrop-blur">
                            <div className="rank-track">
                                <div className="rank-track__container">
                                    {meritBadges.map((badge, i) => (
                                        <motion.a
                                            key={i}
                                            href={badge.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rank-badge"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            aria-label={`${badge.name} merit badge requirements (opens scouting.org)`}
                                        >
                                            <div className="rank-badge__emoji">{badge.emoji}</div>
                                            <div className="rank-badge__name">{badge.name}</div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Resources Section */}
                <section id="resources" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Forms & <span className="text-scout-gradient">Resources</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-12">Everything you need in one place</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {resources.map((res, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-700/50 hover:border-green-600/50 transition-all"
                                >
                                    <h3 className="text-xl font-bold mb-4 text-scout-tan">{res.category}</h3>
                                    <div className="space-y-3">
                                        {res.items.map((item, j) => (
                                            <a
                                                key={j}
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 rounded-lg bg-gray-700/30 hover:bg-green-700/10 border border-gray-600/50 hover:border-green-600/50 transition-all group"
                                            >
                                                <span className="text-sm font-medium text-gray-200 group-hover:text-green-300 transition-colors">{item.title}</span>
                                                <Download size={18} className="text-gray-400 group-hover:text-scout-tan transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-5xl font-black mb-4 italic uppercase text-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Ready to <span className="text-scout-gradient">Join</span>?
                        </motion.h2>
                        <p className="text-gray-600 mb-12 text-center">New scouts and their families always welcome</p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Calendar, title: 'When', desc: 'Tuesdays at 7:00 PM', detail: 'Year-round meetings' },
                                { icon: MapPin, title: 'Where', desc: 'Central Florida', detail: 'Sanford area', link: 'https://www.mapquest.com/us/florida/boy-scout-troop-242-796734459' },
                                { icon: Users, title: 'Contact', desc: 'troop242sanford@gmail.com', detail: 'Reply within 24 hours', link: 'mailto:troop242sanford@gmail.com' }

                            ].map((item, i) => {
                                const Icon = item.icon;
                                const content = (
                                    <>
                                        <div className="w-16 h-16 icon-box-scout rounded-lg flex items-center justify-center mx-auto mb-4 icon-box-scout-hover transition-all">
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-green-300 font-semibold mb-1">{item.desc}</p>
                                        <p className="text-sm text-gray-400">{item.detail}</p>
                                    </>
                                );
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-xl card-scout text-center group"
                                    >
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                                                {content}
                                            </a>
                                        ) : (
                                            content
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="mt-12 text-center"
                        >
                            <a
                                href="mailto:troop242sanford@gmail.com"
                                className="px-8 py-4 border-2 border-scout-tan text-scout-tan font-bold rounded-lg hover:bg-scout-tan/10 transition-all"
                            >
                                Send Us an Email
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer-scout py-12 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="text-xl font-black italic mb-2 text-scout-tan">BSA Troop 242</div>
                                <p className="text-gray-600 text-sm">Building leaders and forging character through scouting excellence since 1994.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-gray-800">Site Map</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#events" className="hover:text-scout-tan transition-colors">Events</a></li>
                                    <li><a href="#tracker" className="hover:text-scout-tan transition-colors">Progress</a></li>
                                    <li><a href="#badges" className="hover:text-scout-tan transition-colors">Badges</a></li>
                                    <li><a href="#features" className="hover:text-scout-tan transition-colors">Why Us</a></li>
                                    <li><a href="#resources" className="hover:text-scout-tan transition-colors">Resources</a></li>
                                    <li><a href="/stories" className="hover:text-scout-tan transition-colors">Scout Stories</a></li>
                                    <li><a href="/index" className="hover:text-scout-tan transition-colors">Quick Overview</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-gray-800">Resources</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="https://scoutbook.scouting.org/" target="_blank" rel="noopener noreferrer" className="hover:text-scout-tan transition-colors">Scoutbook</a></li>
                                    <li><a href="https://www.scouting.org/" target="_blank" rel="noopener noreferrer" className="hover:text-scout-tan transition-colors">BSA.org</a></li>
                                    <li><a href="https://calendar.google.com/calendar/r?cid=dHJvb3AyNDJzYW5mb3JkQGdtYWlsLmNvbQ" target="_blank" rel="noopener noreferrer" className="hover:text-scout-tan transition-colors">Calendar</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-gray-800">Get Involved</h4>
                                <p className="text-sm text-gray-600 mb-4">Ready to join? Contact us today!</p>
                                <a href="mailto:troop242sanford@gmail.com" className="inline-block px-4 py-2 btn-footer-scout rounded-lg text-sm font-bold transition-colors">
                                    Email Us
                                </a>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 pt-8 text-center text-gray-500 text-sm">
                            <p>&copy; 2026 Scouting America - Troop 242 (Central Florida Council). All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default App;
