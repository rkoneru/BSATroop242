import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function StoriesPage() {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const successStories = [
        {
            name: 'Michael Johnson',
            rank: 'Eagle Scout',
            year: '2024',
            quote: 'Scouting in Troop 242 shaped who I am today. I earned my Eagle Scout rank and built lifelong friendships along the way.',
            emoji: '🦅'
        },
        {
            name: 'Sarah Chen',
            rank: 'Life Scout',
            year: '2023',
            quote: 'The leadership skills I learned through various patrol positions prepared me for college and beyond. This troop is incredible!',
            emoji: '❤️'
        },
        {
            name: 'David Martinez',
            rank: 'Eagle Scout',
            year: '2023',
            quote: 'From a shy Scout to an Eagle Scout leading camping trips - this troop believed in me when I didn\'t believe in myself.',
            emoji: '🦅'
        },
        {
            name: 'Emma Williams',
            rank: 'Star Scout',
            year: '2024',
            quote: 'Every weekend adventure and merit badge earned brought me closer to achieving my Eagle Scout dream. I\'m almost there!',
            emoji: '🌟'
        },
        {
            name: 'James Lee',
            rank: 'Eagle Scout',
            year: '2022',
            quote: 'The Eagle Scout service project I completed still benefits the community today. Troop 242 taught me to give back.',
            emoji: '🦅'
        },
        {
            name: 'Lisa Anderson',
            rank: 'First Class',
            year: '2024',
            quote: 'Camping in the woods, earning merit badges, making friends - Troop 242 gives me experiences I\'ll never forget.',
            emoji: '🥇'
        }
    ];

    const faqItems = [
        {
            question: 'How do I join Troop 242?',
            answer: 'Join us at our weekly Tuesday meetings at 7:00 PM at the Disabled American Veterans building in Sanford. No prior experience necessary! Bring a parent and come ready to make new friends.'
        },
        {
            question: 'What are the membership costs?',
            answer: 'Monthly troop dues are $25. We also have occasional special fees for camps and outings (typically $50-150 depending on the activity). Financial assistance is available.'
        },
        {
            question: 'What are the rank requirements?',
            answer: 'Each rank has specific requirements including camping nights, merit badges, leadership roles, and skills. Start as a Scout and progress through Tenderfoot, Second Class, First Class, Star, Life, and Eagle Scout.'
        },
        {
            question: 'How often do we meet and go camping?',
            answer: 'We meet weekly on Tuesdays at 7 PM. We camp 10-12 times per year including weekend campouts, summer camp, and winter camp. The second Tuesday of each month is usually an outing.'
        },
        {
            question: 'Can I transfer from another troop?',
            answer: 'Absolutely! Scouts can transfer between troops. Your rank and merit badges transfer with you. Just talk to our Scoutmaster to get started.'
        },
        {
            question: 'What if I\'ve never been a Scout before?',
            answer: 'Perfect! Most of our new Scouts start at the Scout rank with no prior experience. We\'ll teach you everything - from knots to camping skills to leadership.'
        },
        {
            question: 'How do I earn merit badges?',
            answer: 'Merit badges are earned by completing requirements set by the BSA. You can take merit badge classes at camps, work with merit badge counselors, or earn them during troop activities.'
        },
        {
            question: 'What\'s the Eagle Scout service project?',
            answer: 'The Eagle Scout project is a planned, led, and executed service project by the Scout candidate. It benefits your community and demonstrates leadership skills.'
        }
    ];

    return (
        <div className="bg-scout min-h-screen page-container">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-navy-nav backdrop-blur border-b border-scout-nav z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl" style={{ background: 'linear-gradient(135deg, #3f3f46, #27272a)' }}>
                            ⛺
                        </div>
                        <div>
                            <div className="text-lg font-black italic uppercase tracking-tight text-scout-tan">CFL Troop 242</div>
                            <div className="text-xs text-scout-tan font-semibold">Est. 1994</div>
                        </div>
                    </a>
                    
                    {/* Desktop Link */}
                    <a href="/" className="hidden md:block text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors">← Back to Home</a>

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
                            <div className="px-6 py-4 bg-navy-nav/95 backdrop-blur-md">
                                <a 
                                    href="/" 
                                    className="block text-sm font-semibold text-gray-700 hover:text-scout-green transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ← Back to Home
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main id="main-content" className="pt-32 pb-20">
                {/* Page Header */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4">
                                Scout <span className="text-scout-gradient">Stories</span>
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl">
                                Real stories from real scouts. Hear how Troop 242 changed their lives and shaped their futures.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Scout <span className="text-scout-gradient">Success</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-12">Scouts from all ranks share their Troop 242 journey</p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {successStories.map((story, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-xl card-scout"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="text-5xl mb-2">{story.emoji}</div>
                                            <h3 className="text-lg font-bold text-gray-800">{story.name}</h3>
                                            <p className="text-sm text-scout-tan font-semibold">{story.rank} • {story.year}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{story.quote}"</p>
                                    <div className="mt-4 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="fill-scout-tan text-scout-tan" />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-3xl mx-auto px-4 md:px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Frequently Asked <span className="text-scout-gradient">Questions</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-12">Everything you need to know about Troop 242</p>

                        <div className="space-y-4">
                            {faqItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="card-scout rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/30 transition-colors text-left"
                                    >
                                        <h3 className="font-bold text-gray-800 text-lg">{item.question}</h3>
                                        <ChevronDown
                                            size={24}
                                            className={`text-scout-green transition-transform ${openFAQ === i ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {openFAQ === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="px-6 pb-4 border-t border-gray-700/30 text-gray-700"
                                        >
                                            {item.answer}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                Ready to Start Your <span className="text-scout-gradient">Scout Journey</span>?
                            </h2>
                            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Join Troop 242 and become part of a community that builds leaders. We meet every Tuesday at 7 PM.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="mailto:troop242sanford@gmail.com"
                                    className="px-8 py-4 rounded-lg font-bold text-white transition-all hover:shadow-xl"
                                    style={{ background: 'linear-gradient(135deg, #3f3f46, #27272a)' }}
                                >
                                    Contact Us Today
                                </a>
                                <a
                                    href="/"
                                    className="px-8 py-4 rounded-lg font-bold border-2 border-scout-tan text-scout-tan hover:bg-scout-tan/10 transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-green-900/50 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-white font-bold mb-4">About</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-scout-green transition-colors">Home</a></li>
                                <li><a href="/#events" className="hover:text-scout-green transition-colors">Events</a></li>
                                <li><a href="/#badges" className="hover:text-scout-green transition-colors">Merit Badges</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/#resources" className="hover:text-scout-green transition-colors">Forms & Documents</a></li>
                                <li><a href="https://www.scouting.org" target="_blank" rel="noopener noreferrer" className="hover:text-scout-green transition-colors">BSA.org</a></li>
                                <li><a href="https://scoutbook.scouting.org" target="_blank" rel="noopener noreferrer" className="hover:text-scout-green transition-colors">Scoutbook</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Community</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/stories" className="hover:text-scout-green transition-colors">Scout Stories</a></li>
                                <li><a href="/#contact" className="hover:text-scout-green transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Connect</h4>
                            <p className="text-sm mb-3">troop242sanford@gmail.com</p>
                            <a href="mailto:troop242sanford@gmail.com" className="inline-block px-4 py-2 rounded-lg text-sm font-bold" style={{ background: '#3f3f46' }}>
                                Email Us
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center text-sm">
                        <p>&copy; 2026 BSA Troop 242 - Central Florida. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
