import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function IndexPage() {
    const testimonials = [
        {
            name: 'Michael Johnson',
            rank: 'Eagle Scout 2024',
            quote: 'Scouting in Troop 242 shaped who I am today.',
            emoji: '🦅'
        },
        {
            name: 'Sarah Chen',
            rank: 'Life Scout',
            quote: 'The leadership skills prepared me for college and beyond.',
            emoji: '❤️'
        },
        {
            name: 'David Martinez',
            rank: 'Eagle Scout 2023',
            quote: 'From shy Scout to Eagle leading camping trips.',
            emoji: '🦅'
        }
    ];

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
            description: 'Earn 13 Eagle-required badges across diverse skill areas and interests',
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

    return (
        <div className="bg-white min-h-screen page-container">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur border-b border-gray-200 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-2">
                        <div className="text-2xl">⛺</div>
                        <div className="font-bold text-gray-900">BSA Troop 242</div>
                    </a>
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">More</a>
                        <a href="/stories" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Stories & FAQ</a>
                    </div>
                </div>
            </nav>

            <main id="main-content" className="pt-24">
                {/* Hero Section - Mindoor Style */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-5xl mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 leading-tight">
                                You're Not Alone
                                <br />
                                <span className="text-scout-green">Adventure Starts Here</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join BSA Troop 242 and discover a community where scouts develop leadership, build confidence, and create lifelong friendships through adventure and outdoor experiences.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <a href="mailto:troop242sanford@gmail.com" className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-gray-400 transition-all">
                                    Join Us Today
                                </a>
                                <a href="/" className="px-8 py-4 border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-gray-400 transition-all">
                                    Learn More
                                </a>
                            </div>

                            {/* Client Avatars */}
                            <div className="flex justify-center items-center gap-2">
                                <div className="flex -space-x-4">
                                    {['🦅', '❤️', '🌟', '🥇', '🎖️'].map((emoji, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-scout-green/20 flex items-center justify-center text-xl border-2 border-white">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-4">Trusted by 50+ scouts and families</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900"
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
                                    className="p-8 bg-white rounded-lg border border-gray-200 hover:border-scout-green hover:shadow-lg transition-all"
                                >
                                    <div className="text-5xl mb-4">{service.emoji}</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600">{service.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
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
                                    <div className="text-5xl font-black text-scout-green mb-3">{stat.number}</div>
                                    <div className="text-gray-600 font-semibold">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-4 text-gray-900"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Our Leadership Team
                        </motion.h2>
                        <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
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
                                    <div className="w-32 h-32 rounded-full bg-scout-green/20 flex items-center justify-center text-6xl mx-auto mb-4">
                                        {member.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.role}</h3>
                                    <p className="text-gray-600">{member.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Scout Success Stories
                        </motion.h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 bg-gray-50 rounded-lg border border-gray-200"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} className="text-yellow-400">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="text-4xl">{testimonial.emoji}</div>
                                        <div>
                                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600">{testimonial.rank}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <a href="/stories" className="inline-flex items-center gap-2 text-scout-green font-bold hover:text-green-700 transition-colors">
                                Read more success stories <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* FAQ Preview */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black text-center mb-16 text-gray-900"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                        >
                            Common Questions
                        </motion.h2>

                        <div className="space-y-6">
                            {[
                                { q: 'How do I join Troop 242?', a: 'Simply visit us on Tuesday at 7 PM or contact us via email. New scouts of all experience levels welcome!' },
                                { q: 'What does membership cost?', a: '$25 monthly dues plus occasional activity fees. Financial assistance available for families in need.' },
                                { q: 'What is the Eagle Scout path like?', a: '7 ranks to progress through, each with unique requirements. Takes 3-5 years with active participation.' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="p-6 bg-white rounded-lg border border-gray-200"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                                    <p className="text-gray-600">{item.a}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <a href="/stories" className="inline-flex items-center gap-2 text-scout-green font-bold hover:text-green-700 transition-colors">
                                View all FAQs <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-scout-green text-white">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Start Your Adventure?</h2>
                            <p className="text-xl text-green-100 mb-8">
                                We meet every Tuesday at 7:00 PM. New scouts always welcome.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="mailto:troop242sanford@gmail.com" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                                    Contact Us
                                </a>
                                <a href="/" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
                                    Full Website
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-12">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h4 className="text-white font-bold mb-4">Troop 242</h4>
                                <p className="text-sm">Building leaders through scouting excellence since 1994.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Links</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="/" className="hover:text-white transition-colors">Full Website</a></li>
                                    <li><a href="/stories" className="hover:text-white transition-colors">Stories & FAQ</a></li>
                                    <li><a href="https://www.scouting.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">BSA.org</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Contact</h4>
                                <p className="text-sm">troop242sanford@gmail.com</p>
                                <p className="text-sm mt-2">Tuesdays 7:00 PM<br />Sanford, Florida</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-8 text-center text-sm">
                            <p>&copy; 2026 BSA Troop 242. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
