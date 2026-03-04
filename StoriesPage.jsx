import { motion } from 'framer-motion';
import { ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function StoriesPage() {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            {/* Shared Header */}
            <Header />

            <main id="main-content" className="pt-32 pb-20">
                {/* Page Header */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-6">
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

                {/* Photo Gallery Section */}
                <section className="py-16 md:py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            className="text-4xl md:text-5xl font-black mb-4 italic uppercase"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            Photo <span className="text-scout-gradient">Gallery</span>
                        </motion.h2>
                        <p className="text-gray-600 mb-12">Memories from Troop 242 adventures and activities</p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative group"
                        >
                            {/* Carousel Container */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800 h-96 md:h-[500px]">
                                {/* Main Image */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="text-center">
                                            <div className="text-8xl mb-4">
                                                {['⛺', '🏕️', '🎯', '🥾', '🔥', '🎖️', '🌲', '⛰️'][currentImageIndex]}
                                            </div>
                                            <p className="text-2xl font-bold text-scout-tan mb-2">
                                                {['Campout Adventure', 'Summer Camp', 'Skill Challenge', 'Hiking Expedition', 'Campfire Night', 'Rank Advancement', 'Nature Exploration', 'Mountain Trek'][currentImageIndex]}
                                            </p>
                                            <p className="text-sm text-gray-400">Click the arrows to browse more photos</p>
                                        </div>
                                    </motion.div>

                                    {/* Navigation Buttons */}
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + 8) % 8)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-scout-green/70 text-white transition-all hover:scale-110 backdrop-blur-sm"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % 8)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-scout-green/70 text-white transition-all hover:scale-110 backdrop-blur-sm"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </div>

                                {/* Indicator Dots */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                    {[...Array(8)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentImageIndex(i)}
                                            className={`w-3 h-3 rounded-full transition-all ${
                                                i === currentImageIndex
                                                    ? 'bg-scout-tan w-8'
                                                    : 'bg-white/40 hover:bg-white/70'
                                            }`}
                                            aria-label={`Go to photo ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                                {['⛺', '🏕️', '🎯', '🥾', '🔥', '🎖️', '🌲', '⛰️'].map((emoji, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        whileHover={{ scale: 1.1 }}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg flex items-center justify-center text-3xl transition-all ${
                                            i === currentImageIndex
                                                ? 'ring-2 ring-scout-tan bg-scout-green/20'
                                                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                                        }`}
                                    >
                                        {emoji}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6">
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
                    <div className="max-w-7xl mx-auto px-6">
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

            {/* Shared Footer */}
            <Footer />
        </div>
    );
}
