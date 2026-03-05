import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const closeMenu = () => setIsMenuOpen(false);

    const isActive = (path) => location.pathname === path;

    const handleAnchorClick = (e, anchor) => {
        e.preventDefault();
        if (location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            navigate('/', { replace: false });
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    };

    // Simplified navigation structure for horizontal layout
    const navItems = [
        { label: 'Home', href: '/home' },
        { label: 'Calendar', href: '/calendar' },
        { label: 'Stories', href: '/stories' },
       
        { label: 'Members', href: '/members' },
         { label: 'About', href: '/about' },
       /*  {
            label: 'Activities',
            children: [
                { label: 'Events', href: '#events', anchor: true },
                { label: 'Progress', href: '#tracker', anchor: true },
                { label: 'Badges', href: '#badges', anchor: true },
                { label: 'Resources', href: '#resources', anchor: true }
            ]
        }, */
        // { label: 'Contact', href: '#contact', anchor: true },
        { label: 'Scoutbook', href: 'https://scoutbook.scouting.org/', external: true }
    ];

    // Desktop horizontal menu
    const renderDesktopMenu = () => (
        <div className="hidden md:flex items-center gap-9 ml-auto">
            {navItems.map((item, idx) => (
                <div key={idx} className="relative group">
                    {item.children ? (
                        <>
                            <button className="px-6 py-3 text-gray-700 hover:text-scout-green font-semibold transition-colors flex items-center gap-2 group-hover:text-scout-green rounded-lg hover:bg-scout-green/5 btn-borderless">
                                {item.label}
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {/* Dropdown menu */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-scout-green/20 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3"
                            >
                                {item.children.map((child, cidx) => (
                                    <div key={cidx}>
                                        {child.anchor ? (
                                            <button
                                                onClick={(e) => handleAnchorClick(e, child.href)}
                                                className="block w-full text-left px-5 py-3 text-gray-700 hover:text-scout-green hover:bg-scout-green/10 transition-colors rounded-lg mx-2 btn-borderless"
                                            >
                                                {child.label}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => navigate(child.href)}
                                                className="block w-full text-left px-5 py-3 text-gray-700 hover:text-scout-green hover:bg-scout-green/10 transition-colors rounded-lg mx-2 btn-borderless"
                                            >
                                                {child.label}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        </>
                    ) : item.anchor ? (
                        <button
                            onClick={(e) => handleAnchorClick(e, item.href)}
                            className="px-6 py-3 text-gray-700 hover:text-scout-green font-semibold transition-colors rounded-lg hover:bg-scout-green/5 btn-borderless"
                        >
                            {item.label}
                        </button>
                    ) : item.external ? (
                        <button
                            onClick={() => window.open(item.href, '_blank')}
                            className="px-6 py-3 font-semibold transition-colors rounded-lg text-gray-700 hover:text-scout-green hover:bg-scout-green/5 btn-borderless"
                        >
                            {item.label}
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate(item.href)}
                            className={`px-6 py-3 font-semibold transition-colors rounded-lg btn-borderless ${
                                isActive(item.href)
                                    ? 'text-scout-green bg-scout-green/10'
                                    : 'text-gray-700 hover:text-scout-green hover:bg-scout-green/5'
                            }`}
                        >
                            {item.label}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-scout-green/20" aria-label="Primary navigation">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative z-10">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 flex-shrink-0 btn-borderless"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg text-xl" style={{ background: 'linear-gradient(135deg, #000000, #ec680f)' }}>
                            ⛺
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-lg font-black italic uppercase tracking-tight text-scout-tan">Troop 242</div>
                            <div className="text-xs text-scout-green font-semibold">Sanford, FL</div>
                        </div>  
                    </motion.button>

                    {/* Desktop Horizontal Menu */}
                    {renderDesktopMenu()}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-scout-green/10 rounded-lg transition-colors touch-target"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-scout-green" />
                        ) : (
                            <Menu className="w-6 h-6 text-scout-green" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-scout-green/20 overflow-hidden"
                            aria-hidden={!isMenuOpen}
                        >
                            <div className="px-5 py-5 bg-white/95 backdrop-blur-sm flex flex-col gap-3">
                                {navItems.map((item, idx) => (
                                    <div key={idx}>
                                        {item.children ? (
                                            <div>
                                                <div className="px-3 py-3 text-gray-700 font-semibold">
                                                    {item.label}
                                                </div>
                                                <div className="pl-5 space-y-2 border-l-3 border-scout-green/30">
                                                    {item.children.map((child, cidx) => (
                                                        <div key={cidx}>
                                                            {child.anchor ? (
                                                                <button
                                                                    onClick={(e) => { handleAnchorClick(e, child.href); closeMenu(); }}
                                                                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-scout-green hover:bg-scout-green/5 transition-colors rounded-lg btn-borderless"
                                                                >
                                                                    {child.label}
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => { navigate(child.href); closeMenu(); }}
                                                                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:text-scout-green hover:bg-scout-green/5 transition-colors rounded-lg btn-borderless"
                                                                >
                                                                    {child.label}
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : item.anchor ? (
                                            <button
                                                onClick={(e) => { handleAnchorClick(e, item.href); closeMenu(); }}
                                                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-scout-green hover:bg-scout-green/5 transition-colors rounded-lg font-semibold"
                                            >
                                                {item.label}
                                            </button>
                                        ) : item.external ? (
                                            <button
                                                onClick={() => { window.open(item.href, '_blank'); closeMenu(); }}
                                                className="block w-full text-left px-4 py-3 font-semibold transition-colors rounded-lg text-gray-700 hover:text-scout-green hover:bg-scout-green/5"
                                            >
                                                {item.label}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => { navigate(item.href); closeMenu(); }}
                                                className={`block w-full text-left px-4 py-3 font-semibold transition-colors rounded-lg ${
                                                    isActive(item.href)
                                                        ? 'text-scout-green bg-scout-green/10'
                                                        : 'text-gray-700 hover:text-scout-green hover:bg-scout-green/5'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
}
