import { motion } from 'framer-motion';
import { Calendar, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function CalendarPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        eventType: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const eventTypes = [
        'Camping Trip',
        'Car Wash',
        'Hiking Trip',
        'Merit Badge Class',
        'Community Service',
        'Weekly Meeting',
        'Swimming Activity',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create mailto link with form data
        const subject = `Event Signup: ${formData.eventType}`;
        const body = `
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Notes: ${formData.notes || 'None'}
        `.trim();

        window.location.href = `mailto:troop242sanford@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Show success message
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ fullName: '', email: '', phone: '', eventType: '', notes: '' });
        }, 3000);
    };

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
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="w-8 h-8 text-scout-green" />
                                <h1 className="text-5xl md:text-7xl font-black italic uppercase text-scout-gradient">
                                    Troop 242 Calendar
                                </h1>
                            </div>
                            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
                                Stay updated with all of Troop 242's upcoming events, meetings, camping trips, and activities. Subscribe to our calendar to receive notifications about important dates and events.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Calendar Embed */}
                <section className="py-12 md:py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="rounded-xl overflow-hidden shadow-2xl"
                        >
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=k11l4b9od26qdlquf6fth7stbg%40group.calendar.google.com&ctz=America%2FNew_York&mode=MONTH&showTitle=1&showNav=1&showPrint=1&showTabs=1&showCalendars=1"
                                style={{
                                    border: 0,
                                    width: '100%',
                                    height: '600px'
                                }}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info */}
                <section className="py-16 md:py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl font-black mb-12 text-scout-gradient italic uppercase">
                            Important Info
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0 }}
                                className="p-6 rounded-lg card-scout"
                            >
                                <div className="text-4xl mb-4">📅</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Weekly Meetings</h3>
                                <p className="text-gray-700">
                                    Every Tuesday at 7:00 PM at the Disabled American Veterans building in Sanford, Florida.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-6 rounded-lg card-scout"
                            >
                                <div className="text-4xl mb-4">⛺</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Campouts</h3>
                                <p className="text-gray-700">
                                    We organize 10-12 camping trips per year, including weekend campouts, summer camps, and winter activities.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-6 rounded-lg card-scout"
                            >
                                <div className="text-4xl mb-4">🎖️</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Merit Badges</h3>
                                <p className="text-gray-700">
                                    We hold merit badge classes and activities throughout the year to help scouts advance.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Subscribe Section */}
                <section className="py-16 md:py-20 bg-scout-green/5 rounded-xl">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-4xl font-black mb-6 text-scout-gradient italic uppercase">
                                Never Miss an Event
                            </h2>
                            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                                Subscribe to our Google Calendar to get automatic notifications for all Troop 242 events and activities.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://calendar.google.com/calendar/r?cid=dHJvb3AyNDJzYW5mb3JkQGdtYWlsLmNvbQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 border-2 border-scout-tan text-scout-tan font-bold rounded-lg hover:bg-scout-tan/10 transition-all"
                                >
                                    Subscribe Now
                                </a>
                                <a
                                    href="mailto:troop242sanford@gmail.com"
                                    className="px-8 py-4 border-2 border-scout-tan text-scout-tan font-bold rounded-lg hover:bg-scout-tan/10 transition-all"
                                >
                                    Contact for Details
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Event Signup Form Section */}
                <section className="py-16 md:py-20">
                    <div className="max-w-2xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-4xl font-black mb-4 text-scout-gradient italic uppercase">
                                Event Signup
                            </h2>
                            <p className="text-gray-700 mb-12">
                                Interested in joining an upcoming event? Fill out the form below and we'll send you more details.
                            </p>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center p-12 rounded-xl card-scout text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-scout-green mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Signup Submitted!</h3>
                                    <p className="text-gray-700">
                                        Thank you for your interest! We've sent your signup details and will contact you soon with more information.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 card-scout p-8 rounded-xl">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-gray-50"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-gray-50"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-gray-50"
                                            placeholder="(123) 456-7890"
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Event Type *
                                        </label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-gray-50"
                                        >
                                            <option value="">Select an event type</option>
                                            {eventTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scout-green focus:border-transparent bg-gray-50 resize-none"
                                            placeholder="Any additional information (e.g., dietary restrictions, special requirements)"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full px-8 py-4 bg-gradient-to-r from-scout-green to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Send size={20} />
                                        Send Signup
                                    </motion.button>

                                    <p className="text-xs text-gray-500 text-center">
                                        * Required fields
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Shared Footer */}
            <Footer />
        </div>
    );
}
