import { useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();

    const handleAnchorClick = (e, anchor) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // If already on home, just scroll to element
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            // Navigate to home, then scroll to element
            navigate('/', { replace: false });
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    };

    return (
        <footer className="footer-scout py-16 border-t border-scout-green/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-12 mb-12">
                    {/* Branding */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-2xl">⛺</div>
                            <div className="font-black italic uppercase text-scout-tan">BSA Troop 242</div>
                        </div>
                        <p className="text-sm text-gray-400">Building leaders through outdoor adventure and community service since 1996.</p>
                    </div>

                    {/* Navigation Row */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-6">Navigation</h3>
                        <div className="flex flex-wrap items-center gap-6">
                            <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Home</button>
                            <button onClick={() => navigate('/about')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">About</button>
                            <button onClick={() => navigate('/stories')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Stories</button>
                            <button onClick={() => navigate('/calendar')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Calendar</button>
                            <button onClick={(e) => handleAnchorClick(e, '#events')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Events</button>
                            {/* <button onClick={(e) => handleAnchorClick(e, '#contact')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Contact</button> */}
                        </div>
                    </div>

                    {/* Resources Row */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-6">Resources</h3>
                        <div className="flex flex-wrap items-center gap-6">
                            <button onClick={() => window.open('https://scoutbook.scouting.org/', '_blank')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Scoutbook</button>
                            <button onClick={() => window.open('https://www.scouting.org/', '_blank')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">BSA.org</button>
                            <button onClick={() => window.open('https://calendar.google.com/calendar/r?cid=k11l4b9od26qdlquf6fth7stbg%40group.calendar.google.com', '_blank')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Calendar</button>
                            <button onClick={() => navigate('/members')} className="text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless">Leaders Portal</button>
                        </div>
                    </div>

                    {/* Get Involved */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-6">Get Involved</h3>
                        <p className="text-sm text-gray-400 mb-5">Join us for weekly meetings every Tuesday at 7:00 PM in Sanford, FL.</p>
                        <button onClick={(e) => handleAnchorClick(e, '#contact')} className="text-sm btn-scout-primary px-6 py-3 rounded-lg inline-block font-semibold btn-borderless">Contact Us</button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-scout-green/20 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        © {currentYear} BSA Troop 242 Sanford. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
