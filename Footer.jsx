import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = useCallback((path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [navigate]);

    const handleAnchorClick = useCallback((e, anchor) => {
        e.preventDefault();
        if (location.pathname === '/home') {
            // If already on home, just scroll to element
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            // Navigate to home, then scroll to element
            navigate('/home', { replace: false });
            setTimeout(() => {
                const element = document.getElementById(anchor.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        }
    }, [navigate, location.pathname]);

    return (
        <footer className="footer-scout py-12 md:py-16 border-t border-scout-green/20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                 {/* Branding */}
                 <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-2xl">⛺</div>
                            <div className="font-black italic uppercase text-scout-tan text-sm md:text-base">BSA Troop 242</div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-200 leading-relaxed">Empowering youth through outdoor adventure, leadership development, and community service.</p>
                    </div>
                {/* Mobile/Tablet: Stacked Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
                    {/* Branding */}
                   {/*  <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-2xl">⛺</div>
                            <div className="font-black italic uppercase text-scout-tan text-sm md:text-base">BSA Troop 242</div>
                        </div>
                        <p className="text-xs md:text-sm text-gray-200 leading-relaxed">Empowering youth through outdoor adventure, leadership development, and community service.</p>
                    </div> */}

                    {/* Navigation */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-4 text-sm md:text-base">Quick Links</h3>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => handleNavigate('/home')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Home</button>
                            <button onClick={() => handleNavigate('/calendar')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Calendar</button>
                            <button onClick={() => handleNavigate('/stories')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Stories</button>
                            <button onClick={(e) => handleAnchorClick(e, '#events')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Events</button>
                            <button onClick={() => handleNavigate('/about')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">About</button>
                        </div>
                    </div>

                    {/* Camping & Resources */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-4 text-sm md:text-base">Explore</h3>
                        <div className="flex flex-col gap-3">
                           <button onClick={() => handleNavigate('/camping')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Camping</button>
                            <button onClick={() => handleNavigate('/scout-camping')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Scout Camping</button>
                            <button onClick={() => handleNavigate('/troop-camping')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Troop Camping</button>
                            <button onClick={() => handleNavigate('/members')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Leaders Portal</button>
                        </div>
                    </div>

                    {/* External Resources */}
                    <div>
                        <h3 className="font-bold text-gray-200 mb-4 text-sm md:text-base">Resources</h3>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => window.open('https://scoutbook.scouting.org/', '_blank')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Scoutbook</button>
                            <button onClick={() => window.open('https://www.scouting.org/', '_blank')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">BSA.org</button>
                            <button onClick={() => window.open('https://calendar.google.com/calendar/r?cid=k11l4b9od26qdlquf6fth7stbg%40group.calendar.google.com', '_blank')} className="text-xs md:text-sm text-gray-400 hover:text-scout-green transition-colors btn-borderless text-left">Troop Calendar</button>
                        </div>
                    </div>
                </div>

                {/* Get Involved CTA - Full Width on Mobile */}
                <div className="bg-scout-green/10 border border-scout-green/30 rounded-lg p-6 mb-8 md:mb-12">
                    <h3 className="font-bold text-scout-tan text-base md:text-lg mb-3">Join Us</h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-4">Weekly meetings every Tuesday at 7:00 PM in Sanford, FL</p>
                    <button onClick={(e) => handleAnchorClick(e, '#contact')} className="text-xs md:text-sm btn-scout-primary px-4 md:px-6 py-2 md:py-3 rounded-lg inline-block font-semibold">Contact Us</button>
                </div>

                {/* Copyright */}
                <div className="border-t border-scout-green/20 pt-6 md:pt-8 text-center">
                    <p className="text-xs md:text-sm text-gray-300">
                        © {currentYear} BSA Troop 242 Sanford. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
