import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function ScoutCamping() {
    const [expandedSection, setExpandedSection] = useState(null);

    const campingActivities = [
        {
            id: 1,
            title: 'Setting Up Camp',
            description: 'Learn proper tent setup, camp layout, and fire safety protocols',
            icon: '⛺',
            details: 'Master the fundamentals of campsite preparation including selecting the right location, setting up tents correctly, and organizing camp zones for maximum safety and efficiency.'
        },
        {
            id: 2,
            title: 'Campfire Cooking',
            description: 'Outdoor cooking skills and delicious recipes for the trail',
            icon: '🔥',
            details: 'Develop culinary skills in the outdoors including dutch oven cooking, grilling over open flames, and preparing nutritious meals for scouts in the field.'
        },
        {
            id: 3,
            title: 'Navigation Skills',
            description: 'Master compass use, map reading, and orienteering',
            icon: '🧭',
            details: 'Become proficient with navigation tools including reading topographic maps, using a compass for triangulation, and orienteering across varied terrain.'
        },
        {
            id: 4,
            title: 'Wilderness Survival',
            description: 'Essential survival skills and outdoor safety knowledge',
            icon: '🌲',
            details: 'Learn critical survival techniques including shelter building, water purification, fire starting, and emergency protocols for staying safe in the wilderness.'
        }
    ];

    const campingMeritBadges = [
        { name: 'Camping', requirement: 'Camp 20 nights' },
        { name: 'Cooking', requirement: 'Prepare 21 meals' },
        { name: 'Wilderness Survival', requirement: 'Complete survival challenges' },
        { name: 'Orienteering', requirement: 'Navigate 5 courses' },
        { name: 'Backpacking', requirement: 'Complete 3 treks' },
        { name: 'Environmental Science', requirement: 'Study ecosystems' }
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Video Background Section */}
                <div className="relative w-full h-screen overflow-hidden">
                    {/* Video Background */}
                    <video
                        autoPlay
                        muted
                        loop
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/BSATroop242/assets/CSS_Day_Night_Camping_Background_Animation.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                        <div className="max-w-2xl px-4">
                            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                                Scout Camping Adventures
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-100 mb-8 drop-shadow-lg">
                                Experience the great outdoors with Troop 242
                            </p>
                            <button
                                onClick={() => {
                                    document.getElementById('activities').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-scout-green hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 flex items-center gap-2 mx-auto"
                            >
                                Explore Activities <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                        <ChevronDown size={32} className="text-white" />
                    </div>
                </div>

                {/* Activities Section */}
                <section id="activities" className="py-16 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-scout-tan">
                            Camping Activities
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {campingActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-gray-800 rounded-lg overflow-hidden border border-scout-green/30 hover:border-scout-green transition cursor-pointer"
                                    onClick={() =>
                                        setExpandedSection(
                                            expandedSection === activity.id ? null : activity.id
                                        )
                                    }
                                >
                                    <div className="p-6 bg-gradient-to-r from-scout-green/20 to-transparent">
                                        <div className="flex items-start gap-4">
                                            <span className="text-4xl">{activity.icon}</span>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-scout-tan mb-2">
                                                    {activity.title}
                                                </h3>
                                                <p className="text-gray-300">{activity.description}</p>
                                            </div>
                                        </div>

                                        {expandedSection === activity.id && (
                                            <div className="mt-4 pt-4 border-t border-scout-green/30">
                                                <p className="text-gray-200 text-sm leading-relaxed">
                                                    {activity.details}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Merit Badges Section */}
                <section id="badges" className="py-16 px-4 md:px-8 bg-gray-800/50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-scout-tan">
                            Camping Merit Badges
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            {campingMeritBadges.map((badge, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-scout-green/20 to-transparent p-6 rounded-lg border border-scout-green/50 hover:border-scout-green transition"
                                >
                                    <div className="w-16 h-16 bg-scout-green/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <span className="text-2xl">🎖️</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-center text-scout-tan mb-2">
                                        {badge.name}
                                    </h3>
                                    <p className="text-center text-gray-300 text-sm">
                                        {badge.requirement}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Scout Oath Section */}
                <section className="py-16 px-4 md:px-8 bg-gray-800/50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-scout-tan">
                            Scout Oath
                        </h2>

                        <div className="bg-gradient-to-r from-scout-green/20 to-transparent p-8 rounded-lg border border-scout-green/50">
                            <p className="text-lg text-gray-100 leading-relaxed text-center">
                                <span className="block mb-4 text-scout-tan font-bold">On my honor I will do my best</span>
                                <span className="block mb-4">To do my duty to God and my country</span>
                                <span className="block mb-4">and to obey the Scout Law;</span>
                                <span className="block mb-4">To help other people at all times;</span>
                                <span className="block">To keep myself physically strong,</span>
                                <span className="block">mentally awake, and morally straight.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Scout Law Section */}
                <section className="py-16 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-scout-tan">
                            Scout Law
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { point: 'A Scout is Trustworthy', desc: 'A Scout tells the truth. They are honest, and they make and keep promises. People can depend on them.' },
                                { point: 'A Scout is Loyal', desc: 'A Scout is true to their family, friends, Scout leaders, school, and country.' },
                                { point: 'A Scout is Helpful', desc: 'A Scout cares about other people. They willingly volunteer to help others without expecting payment or reward.' },
                                { point: 'A Scout is Friendly', desc: 'A Scout is a friend to all. They are courteous to everyone and respect differences in people and cultures.' },
                                { point: 'A Scout is Courteous', desc: 'A Scout is polite to everyone regardless of age or position. They show respect through their words and actions.' },
                                { point: 'A Scout is Kind', desc: 'A Scout treats all living things with care and respect. They know there is strength in being gentle.' },
                                { point: 'A Scout is Obedient', desc: 'A Scout follows the rules of their family, school, and troop. They obey their leaders and willingly follow their guidance.' },
                                { point: 'A Scout is Cheerful', desc: 'A Scout looks for the bright side of life. They cheerfully do tasks that come their way and try to make others happy.' },
                                { point: 'A Scout is Thrifty', desc: 'A Scout works to pay their way and helps others. They spend money wisely and do not waste time or material.' },
                                { point: 'A Scout is Brave', desc: 'A Scout can face danger even if they are afraid. They stand up for what they believe is right.' },
                                { point: 'A Scout is Clean', desc: 'A Scout keeps their body and mind fit. They help keep their home and community clean and protect the environment.' },
                                { point: 'A Scout is Reverent', desc: 'A Scout is reverent toward God. They are faithful in their religious duties and respect the convictions of others.' }
                            ].map((law, idx) => (
                                <div key={idx} className="bg-gray-800 p-6 rounded-lg border border-scout-green/30 hover:border-scout-green transition">
                                    <h3 className="text-lg font-bold text-scout-green mb-2">{law.point}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{law.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Outdoor Law Section */}
                <section className="py-16 px-4 md:px-8 bg-gray-800/50">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-scout-tan">
                            Outdoor Law
                        </h2>

                        <div className="space-y-6">
                            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-scout-green">
                                <h3 className="text-xl font-bold text-scout-green mb-2">Leave No Trace</h3>
                                <p className="text-gray-300">
                                    Scouts minimize their environmental impact. We pack out what we pack in, stay on established trails, and restore campsites to their natural state.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-scout-light-green">
                                <h3 className="text-xl font-bold text-scout-light-green mb-2">Respect Wildlife</h3>
                                <p className="text-gray-300">
                                    Observe wildlife from a distance without disturbing them. Never feed animals and understand that they are living in their natural habitat.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-scout-tan">
                                <h3 className="text-xl font-bold text-scout-tan mb-2">Fire Safety</h3>
                                <p className="text-gray-300">
                                    Build campfires responsibly. Always fully extinguish fires, never leave them unattended, and follow all local fire restrictions and regulations.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-scout-light-green">
                                <h3 className="text-xl font-bold text-scout-light-green mb-2">Water Conservation</h3>
                                <p className="text-gray-300">
                                    Use water wisely and keep natural water sources clean. Always camp at least 200 feet away from water sources to protect aquatic ecosystems.
                                </p>
                            </div>

                            <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-scout-green">
                                <h3 className="text-xl font-bold text-scout-green mb-2">Responsible Camping</h3>
                                <p className="text-gray-300">
                                    Camp only in designated areas. Use established campsites when available and camp on durable surfaces to prevent vegetation damage.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Camping Tips Section */}
                <section className="py-20 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <h2 className="text-5xl md:text-6xl font-black italic mb-4">
                                <span className="text-scout-gradient">Camping</span> Tips
                            </h2>
                            <p className="text-lg text-gray-700 max-w-2xl">Key principles for a safe, enjoyable, and responsible camping experience.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 backdrop-blur p-6 rounded-xl border-l-4 border-scout-green">
                                <h3 className="text-xl font-bold text-scout-green mb-2">🎒 Preparation</h3>
                                <p className="text-gray-700">
                                    Plan your camping trip well in advance. Check weather forecasts, inform parents of your itinerary, and ensure all equipment is in good working condition.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur p-6 rounded-xl border-l-4 border-scout-tan">
                                <h3 className="text-xl font-bold text-scout-tan mb-2">⚠️ Safety First</h3>
                                <p className="text-gray-700">
                                    Always follow the buddy system, inform a responsible adult of your whereabouts, and carry a first aid kit. Respect nature and follow Leave No Trace principles.
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur p-6 rounded-xl border-l-4 border-scout-light-green">
                                <h3 className="text-xl font-bold text-scout-light-green mb-2">🤝 Community</h3>
                                <p className="text-gray-700">
                                    Camping is about building friendships and developing character. Help your fellow scouts, share responsibilities, and create memorable experiences together.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-20 px-6 relative z-10 bg-gradient-to-r from-scout-green/10 to-scout-tan/5 backdrop-blur">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl md:text-6xl font-black italic mb-6 text-scout-gradient">
                            Ready to Camp?
                        </h2>
                        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                            Join Troop 242 for our upcoming camping trips and outdoor adventures. Learn valuable skills, make lasting friendships, and discover your outdoor potential.
                        </p>
                        <button className="px-10 py-4 bg-scout-green text-white font-bold rounded-lg hover:bg-green-700 transition transform hover:scale-105 text-lg">
                            Sign Up for Next Campout
                        </button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
