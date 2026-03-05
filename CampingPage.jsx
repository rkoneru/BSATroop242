import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function CampingPage() {
    const [oathStyle, setOathStyle] = useState({
        bg: 'rgba(20,20,60,0.7)',
        border: 'rgba(80,145,108,0.5)',
        titleColor: '#52b788',
        textColor: '#ccc8ee'
    });

    useEffect(() => {
        // Generate stars dynamically
        const starsEl = document.getElementById('camping-stars');
        if (starsEl) {
            for (let i = 0; i < 140; i++) {
                const s = document.createElement('div');
                s.className = 'camping-star';
                const leftPct = 70 + Math.random() * 30;
                const topPct = Math.random() * 75;
                const size = 1 + Math.random() * 3;
                const dur = 1.5 + Math.random() * 4;
                const del = Math.random() * 5;
                s.style.cssText = `
                    left:${leftPct}%;
                    top:${topPct}%;
                    width:${size}px;
                    height:${size}px;
                    --t:${dur}s;
                    --d:${del}s;
                `;
                starsEl.appendChild(s);
            }
        }

        // Animate Scout Oath colors based on day-night cycle synchronized with sun/moon
        let animationFrameId;

        const animate = () => {
            const now = Date.now();
            const cycleTime = (now % 12000) / 12000; // 12 second cycle
            let bg, border, titleColor, textColor;

            // Day phase (0-0.68): Bright daylight with white background
            if (cycleTime < 0.68) {
                const dayProgress = cycleTime / 0.68;
                const opacity = 0.2 + dayProgress * 0.15; // 0.2 to 0.35
                bg = `rgba(255,255,255,${opacity})`;
                border = `rgba(255,255,255,${0.4 + dayProgress * 0.2})`;
                titleColor = '#1a3a08'; // Dark green
                textColor = '#2a4a10'; // Dark green-gray
            }
            // Sun descending (0.68-0.78): Warmth appears, sky brightens
            else if (cycleTime < 0.78) {
                const sunProgress = (cycleTime - 0.68) / 0.1;
                const opacity = 0.35 - sunProgress * 0.2; // 0.35 to 0.15
                bg = `rgba(255,255,255,${opacity})`;
                border = `rgba(255,200,100,${0.3 + sunProgress * 0.3})`;
                titleColor = `hsl(${120 - sunProgress * 40}, 60%, ${18 + sunProgress * 8}%)`;
                textColor = `hsl(${120 - sunProgress * 40}, 40%, ${25 + sunProgress * 8}%)`;
            }
            // Transition/Twilight (0.78-0.96): Moon appears, sky darkens rapidly
            else if (cycleTime < 0.96) {
                const transProgress = (cycleTime - 0.78) / 0.18;
                bg = `rgba(${Math.round(255 - transProgress * 235)},${Math.round(255 - transProgress * 235)},${Math.round(255 - transProgress * 195)},${ transProgress * 0.7})`;
                border = `rgba(${Math.round(80 + transProgress * 150)},${Math.round(145 - transProgress * 60)},${Math.round(108 + transProgress * 100)},${0.4 - transProgress * 0.2})`;
                titleColor = `hsl(${120 - transProgress * 240}, ${60 - transProgress * 40}%, ${18 + transProgress * 32}%)`;
                textColor = `hsl(${90 - transProgress * 90}, ${40 - transProgress * 20}%, ${25 + transProgress * 35}%)`;
            }
            // Night phase (0.96-1.0): Full night with moon visible
            else {
                bg = 'rgba(20,20,60,0.7)';
                border = 'rgba(80,145,108,0.5)';
                titleColor = '#52b788'; // Light green
                textColor = '#ccc8ee'; // Light purple-gray
            }

            setOathStyle({ bg, border, titleColor, textColor });
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <>
            <Header />
            <div className="w-full">
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

                    .camping-container *, .camping-container *::before, .camping-container *::after {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                    }

                    .camping-container {
                        --cycle: 12s;
                        --day-bg: #87ceeb;
                        --night-bg: #0f0f1e;
                        --sun-color: #FFD700;
                        --moon-color: #fffde7;
                    }

                    .camping-scene {
                        position: relative;
                        width: 100%;
                        height: 100vh;
                        overflow: hidden;
                        font-family: 'Crimson Pro', serif;
                    }

                    /* ─── GRADIENT SKY ─── */
                    .camping-sky {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(
                            to right,
                            #87ceeb 0%,
                            #87ceeb 45%,
                            #b0d8f0 55%,
                            #fbb26a 65%,
                            #d9704e 72%,
                            #6a3d7c 80%,
                            #1a1a3e 90%,
                            #0f0f1e 100%
                        );
                        animation: skyShift var(--cycle) ease-in-out infinite;
                    }

                    @keyframes skyShift {
                        0%,10%   { filter: brightness(1); }
                        70%      { filter: brightness(0.85); }
                        80%      { filter: brightness(0.5); }
                        96%      { filter: brightness(0.15); }
                        100%     { filter: brightness(1); }
                    }

                    /* ─── SUN ─── */
                    .camping-sun {
                        position: absolute;
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        background: radial-gradient(circle at 40% 40%, #fff7aa, #FFD700 40%, #ffa500);
                        box-shadow: 0 0 60px 20px #ffa500, 0 0 120px 40px rgba(255,165,0,0.4);
                        animation: sunArc var(--cycle) ease-in-out infinite;
                        transform-origin: center;
                        will-change: transform, opacity;
                    }

                    @keyframes sunArc {
                        0%   { left: 2%;  top: 92%; opacity: 1;  transform: scale(0.7); }
                        10%  { left: 8%;  top: 68%; opacity: 1;  transform: scale(0.9); }
                        25%  { left: 18%; top: 38%; opacity: 1;  transform: scale(1);   }
                        40%  { left: 30%; top: 14%; opacity: 1;  transform: scale(1.05);}
                        55%  { left: 45%; top: 6%;  opacity: 1;  transform: scale(1.05);}
                        68%  { left: 60%; top: 8%;  opacity: 1;  transform: scale(1);   }
                        75%  { left: 68%; top: 4%;  opacity: 0.7; transform: scale(0.85);}
                        78%  { left: 72%; top: 2%;  opacity: 0;  transform: scale(0.5); }
                        100% { left: 72%; top: 2%;  opacity: 0;  transform: scale(0.5); }
                    }

                    /* Sun rays */
                    .camping-sun::before {
                        content: '';
                        position: absolute;
                        inset: -20px;
                        border-radius: 50%;
                        background: transparent;
                        box-shadow:
                            0 -28px 0 4px rgba(255,220,0,0.3),
                            0  28px 0 4px rgba(255,220,0,0.3),
                            -28px 0  0 4px rgba(255,220,0,0.3),
                            28px 0  0 4px rgba(255,220,0,0.3),
                            -20px -20px 0 4px rgba(255,220,0,0.2),
                            20px -20px 0 4px rgba(255,220,0,0.2),
                            -20px  20px 0 4px rgba(255,220,0,0.2),
                            20px  20px 0 4px rgba(255,220,0,0.2);
                        animation: rayPulse 2s ease-in-out infinite alternate;
                    }

                    @keyframes rayPulse {
                        from { opacity: 0.6; transform: rotate(0deg); }
                        to   { opacity: 1;   transform: rotate(22.5deg); }
                    }

                    /* ─── MOON ─── */
                    .camping-moon {
                        position: absolute;
                        width: 55px;
                        height: 55px;
                        border-radius: 50%;
                        background: radial-gradient(circle at 35% 35%, #fffde7, #f0e68c 60%, #d4c560);
                        box-shadow: 0 0 40px 15px #f0e68c, 0 0 80px 30px rgba(240,230,140,0.3);
                        animation: moonDrop var(--cycle) ease-in-out infinite;
                        will-change: transform, opacity;
                    }

                    .camping-moon::after {
                        content: '';
                        position: absolute;
                        width: 42px;
                        height: 42px;
                        background: #1a1840;
                        border-radius: 50%;
                        top: -5px;
                        left: 10px;
                        opacity: 0.7;
                    }

                    @keyframes moonDrop {
                        0%   { left: 72%; top: 2%;  opacity: 0; }
                        77%  { left: 72%; top: 2%;  opacity: 0; }
                        78%  { left: 72%; top: 2%;  opacity: 1; }
                        88%  { left: 73%; top: 45%; opacity: 1; }
                        95%  { left: 74%; top: 88%; opacity: 0.6; }
                        96%  { left: 74%; top: 96%; opacity: 0; }
                        100% { left: 74%; top: 96%; opacity: 0; }
                    }

                    /* ─── STARS ─── */
                    .camping-stars {
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                    }

                    .camping-star {
                        position: absolute;
                        width: 2px;
                        height: 2px;
                        background: white;
                        border-radius: 50%;
                        animation: twinkle var(--t, 3s) ease-in-out infinite;
                        animation-delay: var(--d, 0s);
                        opacity: 0;
                    }

                    @keyframes twinkle {
                        0%,100% { opacity: 0;   transform: scale(0.5); }
                        50%     { opacity: 1;   transform: scale(1.5); }
                    }

                    /* ─── PANELS ─── */
                    .camping-panel {
                        position: absolute;
                        top: 8%;
                        padding: 20px 24px;
                        border-radius: 12px;
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        max-width: 260px;
                    }
                    .camping-panel-oath {
                        position: absolute;
                        top: 8%;
                        padding: 20px 24px;
                        border-radius: 12px;
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                        max-width: 750px;
                    }
                    .camping-panel-day {
                        left: 3%;
                        background: rgba(255,255,255,0.22);
                        border: 1px solid rgba(255,255,255,0.4);
                        color: #1a2e0d;
                    }

                    .camping-panel-day h1 {
                        font-family: 'Cinzel', serif;
                        font-size: 1.5rem;
                        font-weight: 900;
                        letter-spacing: 0.05em;
                        line-height: 1.2;
                        color: #1a3a08;
                        text-shadow: 0 1px 3px rgba(255,255,255,0.6);
                        margin-bottom: 6px;
                    }

                    .camping-panel-day p {
                        font-size: 0.95rem;
                        line-height: 1.5;
                        color: #2a4a10;
                        font-style: italic;
                    }

                    .camping-panel-night {
                        right: 0.5%;
                        width: 24%;
                        background: rgba(0,0,20,0.45);
                        border: 1px solid rgba(255,255,255,0.12);
                        color: #e8e0ff;
                        top: 6%;
                    }

                    .camping-panel-night h2 {
                        font-family: 'Cinzel', serif;
                        font-size: 1.1rem;
                        font-weight: 700;
                        color: #f0e68c;
                        margin-bottom: 6px;
                        letter-spacing: 0.08em;
                    }

                    .camping-panel-night p {
                        font-size: 0.85rem;
                        line-height: 1.5;
                        color: #ccc8ee;
                        font-style: italic;
                    }

                    .camping-badge {
                        display: inline-block;
                        margin-top: 10px;
                        padding: 4px 12px;
                        background: rgba(255,200,50,0.15);
                        border: 1px solid rgba(255,200,50,0.5);
                        border-radius: 20px;
                        font-family: 'Cinzel', serif;
                        font-size: 0.7rem;
                        letter-spacing: 0.12em;
                        color: #ffe77a;
                    }

                    /* ─── TWILIGHT BAND ─── */
                    .camping-twilight-band {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 72%;
                        width: 8%;
                        background: linear-gradient(to right, transparent, rgba(100,80,180,0.08), transparent);
                        pointer-events: none;
                    }

                    .camping-svg {
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                    }

                    /* ─── MOBILE & TABLET RESPONSIVE ─── */
                    @media (max-width: 768px) {
                        .camping-panel-day {
                            left: 2%;
                            max-width: 140px;
                        }

                        .camping-panel-day h1 {
                            font-size: 1rem;
                        }

                        .camping-panel-day p {
                            font-size: 0.8rem;
                        }

                        .camping-panel-night {
                            right: 2%;
                            width: 130px;
                            max-width: 130px;
                            top: 10%;
                        }

                        .camping-panel-night h2 {
                            font-size: 0.9rem;
                        }

                        .camping-panel-night p {
                            font-size: 0.7rem;
                        }

                        .camping-sun {
                            width: 50px;
                            height: 50px;
                            box-shadow: 0 0 40px 15px #ffa500, 0 0 80px 25px rgba(255,165,0,0.3);
                        }

                        .camping-moon {
                            width: 40px;
                            height: 40px;
                        }

                        .camping-moon::after {
                            width: 30px;
                            height: 30px;
                        }

                        .camping-star {
                            width: 1px;
                            height: 1px;
                        }

                        .camping-panel-oath {
                            max-width: 90vw;
                            padding: 15px 18px;
                            top: 15%;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }

                    @media (max-width: 480px) {
                        .camping-panel-day {
                            display: none;
                        }

                        .camping-panel-night {
                            display: none;
                        }

                        .camping-sun {
                            width: 40px;
                            height: 40px;
                        }

                        .camping-moon {
                            width: 30px;
                            height: 30px;
                        }

                        .camping-panel-oath {
                            max-width: 85vw;
                            padding: 12px 15px;
                            top: 20%;
                        }
                    }
                `}</style>

                <div className="camping-container">
                    <div className="camping-scene">
                        {/* Sky */}
                        <div className="camping-sky"></div>

                        {/* Stars */}
                        <div className="camping-stars" id="camping-stars"></div>

                        {/* Twilight Band */}
                        <div className="camping-twilight-band"></div>

                        {/* Sun */}
                        <div className="camping-sun"></div>

                        {/* Moon */}
                        <div className="camping-moon"></div>

                        {/* SVG Scenery Layer */}
                        <svg
                            className="camping-svg"
                            viewBox="0 0 1440 800"
                            preserveAspectRatio="xMidYMax meet"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Gradients and Filters */}
                            <defs>
                                <linearGradient id="groundDay" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#5a9e38" />
                                    <stop offset="50%" stopColor="#3a6e20" />
                                    <stop offset="100%" stopColor="#22430f" />
                                </linearGradient>
                                <linearGradient id="groundNight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#1a2e0e" />
                                    <stop offset="60%" stopColor="#0c1808" />
                                    <stop offset="100%" stopColor="#050c03" />
                                </linearGradient>
                                <radialGradient id="fireGlow" cx="50%" cy="100%" r="50%">
                                    <stop offset="0%" stopColor="rgba(255,140,0,0.8)" />
                                    <stop offset="100%" stopColor="rgba(255,140,0,0)" />
                                </radialGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="softGlow">
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <radialGradient id="tentLight" cx="50%" cy="80%" r="60%">
                                    <stop offset="0%" stopColor="rgba(255,200,80,0.9)" />
                                    <stop offset="100%" stopColor="rgba(255,200,80,0)" />
                                </radialGradient>
                            </defs>

                            {/* Ground */}
                            <path d="M0,660 Q80,640 160,650 Q240,640 320,648 Q400,636 480,644 Q560,634 640,642 Q720,632 800,640 Q880,632 960,638 Q1040,630 1080,635 L1080,800 L0,800 Z" fill="url(#groundDay)" />
                            <path d="M1060,640 Q1120,632 1180,638 Q1240,630 1300,636 Q1360,630 1440,636 L1440,800 L1060,800 Z" fill="url(#groundNight)" />

                            {/* Clouds */}
                            <g fill="white" opacity="0.82">
                                <g>
                                    <ellipse cx="320" cy="130" rx="55" ry="28" />
                                    <ellipse cx="360" cy="118" rx="42" ry="30" />
                                    <ellipse cx="380" cy="132" rx="38" ry="24" />
                                    <ellipse cx="295" cy="138" rx="30" ry="20" />
                                    <animateTransform attributeName="transform" type="translate" values="0,0; 30,0; 0,0" dur="35s" repeatCount="indefinite" />
                                </g>
                                <g opacity="0.65">
                                    <ellipse cx="150" cy="95" rx="40" ry="20" />
                                    <ellipse cx="180" cy="85" rx="32" ry="22" />
                                    <ellipse cx="200" cy="97" rx="28" ry="16" />
                                    <animateTransform attributeName="transform" type="translate" values="0,0; 20,-5; 0,0" dur="28s" repeatCount="indefinite" />
                                </g>
                            </g>

                            {/* Day Trees */}
                            <g transform="translate(60,640)">
                                <rect x="-6" y="-20" width="12" height="28" fill="#5c3d1e" />
                                <polygon points="0,-130 -45,-30 45,-30" fill="#2d7a1f" />
                                <polygon points="0,-105 -38,-15 38,-15" fill="#38922a" />
                                <polygon points="0,-80 -30,0 30,0" fill="#45a835" />
                            </g>
                            <g transform="translate(135,638)">
                                <rect x="-5" y="-18" width="10" height="25" fill="#5c3d1e" />
                                <polygon points="0,-110 -38,-28 38,-28" fill="#256b18" />
                                <polygon points="0,-88 -32,-12 32,-12" fill="#2e8020" />
                                <polygon points="0,-65 -25,0 25,0" fill="#3a9428" />
                            </g>
                            <g transform="translate(220,635)">
                                <rect x="-7" y="-22" width="14" height="30" fill="#4a3018" />
                                <polygon points="0,-148 -52,-35 52,-35" fill="#1e6012" />
                                <polygon points="0,-118 -44,-18 44,-18" fill="#267518" />
                                <polygon points="0,-88 -36,0 36,0" fill="#30871e" />
                            </g>
                            <g transform="translate(510,636)">
                                <rect x="-6" y="-20" width="12" height="26" fill="#5c3d1e" />
                                <polygon points="0,-128 -44,-30 44,-30" fill="#28721a" />
                                <polygon points="0,-100 -36,-15 36,-15" fill="#32872a" />
                                <polygon points="0,-74 -28,0 28,0" fill="#3c9830" />
                            </g>
                            <g transform="translate(590,638)">
                                <rect x="-5" y="-18" width="10" height="22" fill="#5c3d1e" />
                                <polygon points="0,-105 -36,-25 36,-25" fill="#226015" />
                                <polygon points="0,-82 -30,-10 30,-10" fill="#2a7220" />
                                <polygon points="0,-60 -24,0 24,0" fill="#348428" />
                            </g>

                            {/* Day Tents */}
                            <g transform="translate(330,638)">
                                <polygon points="0,-75 -55,0 55,0" fill="#4a7a30" stroke="#3a6020" strokeWidth="1.5" />
                                <polygon points="0,-75 -20,-10 0,-5" fill="rgba(255,255,255,0.1)" />
                                <path d="M-8,0 Q0,-22 8,0 Z" fill="#2a4a18" />
                                <line x1="0" y1="-75" x2="0" y2="-82" stroke="#8B4513" strokeWidth="2" />
                                <line x1="0" y1="-82" x2="-20" y2="-60" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="3,2" />
                                <line x1="0" y1="-82" x2="20" y2="-60" stroke="#8B4513" strokeWidth="1.5" strokeDasharray="3,2" />
                            </g>
                            <g transform="translate(430,636)">
                                <polygon points="0,-68 -48,0 48,0" fill="#c05a20" stroke="#9a4518" strokeWidth="1.5" />
                                <polygon points="0,-68 -18,-8 2,-4" fill="rgba(255,255,255,0.12)" />
                                <path d="M-7,0 Q0,-20 7,0 Z" fill="#7a3410" />
                                <line x1="0" y1="-68" x2="0" y2="-76" stroke="#8B4513" strokeWidth="2" />
                            </g>

                            {/* Compass Rose */}
                            <g transform="translate(200,490)" filter="url(#glow)">
                                <circle cx="0" cy="0" r="52" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                                <g stroke="rgba(255,255,255,0.6)" strokeWidth="1">
                                    <line x1="0" y1="-48" x2="0" y2="-42" />
                                    <line x1="0" y1="42" x2="0" y2="48" />
                                    <line x1="-48" y1="0" x2="-42" y2="0" />
                                    <line x1="42" y1="0" x2="48" y2="0" />
                                    <line x1="30" y1="-30" x2="34" y2="-34" />
                                    <line x1="-30" y1="-30" x2="-34" y2="-34" />
                                    <line x1="30" y1="30" x2="34" y2="34" />
                                    <line x1="-30" y1="30" x2="-34" y2="34" />
                                </g>
                                <polygon points="0,-40 -7,0 0,-8 7,0" fill="#d9382a" />
                                <polygon points="0,40 -7,0 0,8 7,0" fill="rgba(255,255,255,0.9)" />
                                <polygon points="40,0 0,-6 8,0 0,6" fill="rgba(255,255,255,0.75)" />
                                <polygon points="-40,0 0,-6 -8,0 0,6" fill="rgba(255,255,255,0.75)" />
                                <circle cx="0" cy="0" r="5" fill="white" stroke="#aaa" strokeWidth="1" />
                                <text x="0" y="-56" textAnchor="middle" fill="white" fontFamily="Cinzel,serif" fontSize="12" fontWeight="700">N</text>
                                <text x="0" y="68" textAnchor="middle" fill="white" fontFamily="Cinzel,serif" fontSize="12" fontWeight="700">S</text>
                                <text x="60" y="4" textAnchor="middle" fill="white" fontFamily="Cinzel,serif" fontSize="12" fontWeight="700">E</text>
                                <text x="-60" y="4" textAnchor="middle" fill="white" fontFamily="Cinzel,serif" fontSize="12" fontWeight="700">W</text>
                                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite" additive="sum" />
                            </g>

                            {/* Day Scout */}
                            <g transform="translate(320,638)">
                                <rect x="-8" y="-52" width="16" height="28" rx="4" fill="#4a6a20" />
                                <circle cx="0" cy="-60" r="11" fill="#f5c28a" />
                                <ellipse cx="0" cy="-69" rx="12" ry="4" fill="#5a4020" />
                                <rect x="-7" y="-74" width="14" height="8" rx="3" fill="#6a5025" />
                                <rect x="-8" y="-24" width="7" height="24" rx="3" fill="#4a6a20" />
                                <rect x="1" y="-24" width="7" height="24" rx="3" fill="#4a6a20" />
                                <ellipse cx="-5" cy="0" rx="6" ry="4" fill="#3a2810" />
                                <ellipse cx="5" cy="0" rx="6" ry="4" fill="#3a2810" />
                                <line x1="-8" y1="-44" x2="-32" y2="-52" stroke="#4a6a20" strokeWidth="7" strokeLinecap="round" />
                                <line x1="8" y1="-44" x2="14" y2="-28" stroke="#4a6a20" strokeWidth="7" strokeLinecap="round" />
                                <path d="M-7,-52 Q0,-44 7,-52" fill="none" stroke="#e85820" strokeWidth="4" />
                            </g>

                            {/* Deer */}
                            <g>
                                <g transform="translate(560,638)">
                                    <animateTransform attributeName="transform" type="translate" values="560,638; 640,638; 560,638" dur="12s" repeatCount="indefinite" additive="replace" />
                                    <ellipse cx="0" cy="-18" rx="24" ry="14" fill="#b5763a" />
                                    <rect x="-4" y="-35" width="10" height="18" rx="4" fill="#b5763a" />
                                    <ellipse cx="4" cy="-40" rx="10" ry="8" fill="#c4884a" />
                                    <ellipse cx="12" cy="-38" rx="5" ry="4" fill="#d49a5a" />
                                    <circle cx="8" cy="-42" r="2" fill="#1a1008" />
                                    <polygon points="0,-44 -8,-54 2,-46" fill="#b5763a" />
                                    <line x1="-2" y1="-48" x2="-10" y2="-62" stroke="#8B4513" strokeWidth="2.5" />
                                    <line x1="-10" y1="-62" x2="-4" y2="-70" stroke="#8B4513" strokeWidth="2" />
                                    <line x1="-10" y1="-62" x2="-16" y2="-68" stroke="#8B4513" strokeWidth="2" />
                                    <line x1="2" y1="-47" x2="10" y2="-60" stroke="#8B4513" strokeWidth="2.5" />
                                    <line x1="10" y1="-60" x2="16" y2="-68" stroke="#8B4513" strokeWidth="2" />
                                    <line x1="10" y1="-60" x2="4" y2="-67" stroke="#8B4513" strokeWidth="2" />
                                    <line x1="-14" y1="-8" x2="-16" y2="0" stroke="#9a6030" strokeWidth="5" strokeLinecap="round" />
                                    <line x1="-6" y1="-6" x2="-6" y2="0" stroke="#9a6030" strokeWidth="5" strokeLinecap="round" />
                                    <line x1="6" y1="-6" x2="7" y2="0" stroke="#9a6030" strokeWidth="5" strokeLinecap="round" />
                                    <line x1="14" y1="-8" x2="16" y2="0" stroke="#9a6030" strokeWidth="5" strokeLinecap="round" />
                                    <ellipse cx="-24" cy="-18" rx="5" ry="7" fill="white" />
                                </g>
                            </g>

                            {/* Night Trees */}
                            <g transform="translate(1120,636)">
                                <rect x="-5" y="-18" width="10" height="24" fill="#2a1e0e" />
                                <polygon points="0,-120 -38,-28 38,-28" fill="#0e2808" />
                                <polygon points="0,-95 -32,-12 32,-12" fill="#102e0a" />
                                <polygon points="0,-70 -26,0 26,0" fill="#123410" />
                            </g>
                            <g transform="translate(1210,635)">
                                <rect x="-6" y="-20" width="12" height="28" fill="#2a1e0e" />
                                <polygon points="0,-138 -48,-32 48,-32" fill="#0a2206" />
                                <polygon points="0,-108 -40,-16 40,-16" fill="#0e2a08" />
                                <polygon points="0,-78 -32,0 32,0" fill="#12300c" />
                            </g>
                            <g transform="translate(1320,636)">
                                <rect x="-5" y="-18" width="10" height="22" fill="#2a1e0e" />
                                <polygon points="0,-112 -40,-28 40,-28" fill="#0c2607" />
                                <polygon points="0,-88 -34,-12 34,-12" fill="#102e0a" />
                                <polygon points="0,-65 -28,0 28,0" fill="#143210" />
                            </g>

                            {/* Night Tents */}
                            <g transform="translate(1160,636)">
                                <polygon points="0,-70 -50,0 50,0" fill="#1a2e10" stroke="#101e08" strokeWidth="1.5" />
                                <ellipse cx="0" cy="0" rx="30" ry="12" fill="url(#tentLight)" opacity="0.8" />
                                <path d="M-8,0 Q0,-22 8,0 Z" fill="#a06010" />
                                <path d="M-6,0 Q0,-18 6,0 Z" fill="#ffaa30" opacity="0.7" />
                            </g>
                            <g transform="translate(1280,635)">
                                <polygon points="0,-65 -46,0 46,0" fill="#182808" stroke="#0e1e06" strokeWidth="1.5" />
                                <ellipse cx="0" cy="0" rx="28" ry="10" fill="url(#tentLight)" opacity="0.7" />
                                <path d="M-7,0 Q0,-20 7,0 Z" fill="#ff9020" opacity="0.65" />
                            </g>

                            {/* Campfire */}
                            <g transform="translate(1230,636)">
                                <line x1="-18" y1="0" x2="0" y2="-8" stroke="#6b3f1a" strokeWidth="5" strokeLinecap="round" />
                                <line x1="18" y1="0" x2="0" y2="-8" stroke="#6b3f1a" strokeWidth="5" strokeLinecap="round" />
                                <line x1="-14" y1="0" x2="14" y2="0" stroke="#5a3015" strokeWidth="5" strokeLinecap="round" />
                                <ellipse cx="0" cy="2" rx="22" ry="6" fill="rgba(255,120,0,0.3)">
                                    <animate attributeName="rx" values="22;26;20;24;22" dur="0.9s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.3;0.5;0.25;0.4;0.3" dur="0.9s" repeatCount="indefinite" />
                                </ellipse>
                                <g filter="url(#softGlow)">
                                    <path d="M0,-8 Q-8,-22 0,-36 Q6,-22 4,-12 Q8,-18 5,-28 Q10,-18 8,-8 Z" fill="#ff8800">
                                        <animate attributeName="d" values="M0,-8 Q-8,-22 0,-36 Q6,-22 4,-12 Q8,-18 5,-28 Q10,-18 8,-8 Z;M0,-8 Q-10,-24 0,-38 Q8,-20 3,-14 Q6,-20 6,-30 Q12,-16 8,-8 Z;M0,-8 Q-6,-20 0,-34 Q5,-24 3,-10 Q9,-20 4,-26 Q8,-20 8,-8 Z;M0,-8 Q-8,-22 0,-36 Q6,-22 4,-12 Q8,-18 5,-28 Q10,-18 8,-8 Z" dur="0.8s" repeatCount="indefinite" />
                                    </path>
                                    <path d="M-2,-8 Q-10,-18 -4,-28 Q0,-20 0,-12 Z" fill="#ffcc00" opacity="0.8">
                                        <animate attributeName="d" values="M-2,-8 Q-10,-18 -4,-28 Q0,-20 0,-12 Z;M-2,-8 Q-12,-20 -6,-30 Q2,-18 0,-12 Z;M-2,-8 Q-8,-16 -3,-26 Q0,-22 0,-12 Z;M-2,-8 Q-10,-18 -4,-28 Q0,-20 0,-12 Z" dur="0.7s" repeatCount="indefinite" />
                                    </path>
                                </g>
                            </g>

                            {/* Night Scouts */}
                            <g transform="translate(1370,638)">
                                <rect x="-7" y="-50" width="14" height="26" rx="3" fill="#1a2e10" />
                                <circle cx="0" cy="-58" r="10" fill="#c4884a" />
                                <ellipse cx="1" cy="-63" rx="10" ry="5" fill="#1a1008" />
                                <line x1="7" y1="-44" x2="22" y2="-72" stroke="#1a2e10" strokeWidth="7" strokeLinecap="round" />
                                <line x1="-7" y1="-44" x2="-10" y2="-25" stroke="#1a2e10" strokeWidth="7" strokeLinecap="round" />
                                <rect x="-7" y="-24" width="6" height="24" rx="3" fill="#1a2e10" />
                                <rect x="1" y="-24" width="6" height="24" rx="3" fill="#1a2e10" />
                            </g>
                            <g transform="translate(1400,638)">
                                <rect x="-6" y="-48" width="13" height="24" rx="3" fill="#182a0e" />
                                <circle cx="0" cy="-56" r="9" fill="#c4884a" />
                                <ellipse cx="0" cy="-62" rx="9" ry="4.5" fill="#12200a" />
                                <line x1="-6" y1="-42" x2="-8" y2="-24" stroke="#182a0e" strokeWidth="6" strokeLinecap="round" />
                                <line x1="6" y1="-42" x2="18" y2="-68" stroke="#182a0e" strokeWidth="6" strokeLinecap="round" />
                                <rect x="-6" y="-24" width="5" height="24" rx="3" fill="#182a0e" />
                                <rect x="1" y="-24" width="5" height="24" rx="3" fill="#182a0e" />
                            </g>

                            {/* Shooting Star */}
                            <line x1="1350" y1="80" x2="1180" y2="200" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0">
                                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0.8;0" dur="12s" repeatCount="indefinite" begin="6s" />
                            </line>

                            {/* Birds */}
                            <g fill="none" stroke="#2a4a10" strokeWidth="1.8" strokeLinecap="round">
                                <path d="M280,180 Q285,175 290,180">
                                    <animateTransform attributeName="transform" type="translate" values="0,0; 60,-20; 0,0" dur="18s" repeatCount="indefinite" />
                                </path>
                                <path d="M295,182 Q300,177 305,182">
                                    <animateTransform attributeName="transform" type="translate" values="0,0; 60,-20; 0,0" dur="18s" repeatCount="indefinite" />
                                </path>
                                <path d="M180,220 Q186,214 192,220">
                                    <animateTransform attributeName="transform" type="translate" values="0,0; 80,-15; 0,0" dur="22s" repeatCount="indefinite" />
                                </path>
                            </g>
                        </svg>

                        {/* Day Panel */}
                        <div className="camping-panel camping-panel-day">
                            <h1>BSA TROOP 242</h1>
                            <p>Into the wild, under the sky — learn to navigate by sun and stars.</p>
                            <span className="camping-badge">⊕ Camp La-NO-Che 2026</span>
                        </div>

                        {/* Scout Oath Panel */}
                        <div className="camping-panel-oath" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '500px', background: oathStyle.bg, border: `1px solid ${oathStyle.border}`, color: oathStyle.textColor, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '20px 24px', borderRadius: '12px', transition: 'all 0.3s ease' }}>
                                
                            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.95rem', fontWeight: 700, color: oathStyle.titleColor, marginBottom: '8px', letterSpacing: '0.08em', textAlign: 'center', transition: 'color 0.3s ease' }}>SCOUT OATH</h2>
                            <p style={{ fontSize: '1.85rem', lineHeight: '1.5', color: oathStyle.textColor, textAlign: 'center', transition: 'color 0.3s ease' }}>
                                On my honor I will do my best to do my duty to God and my country and to obey the Scout Law; To help other people at all times; To keep myself physically strong, mentally awake and morally straight.
                            </p>
                        </div>

                        {/* Night Panel */}
                        <div className="camping-panel camping-panel-night">
                            <h2>NIGHT WATCH</h2>
                            <p>Stargazing merit badge session — Milky Way visible tonight at 21:00.</p>
                            <span className="camping-badge" style={{ color: '#a0c4ff', borderColor: 'rgba(160,196,255,0.4)', background: 'rgba(80,100,200,0.15)' }}>★ ASTRONOMY BADGE</span>
                        </div>
                    </div>
                </div>

                {/* Scout Law Section */}
                <section className="scout-law-section">
                    <div className="scout-law-section-container">
                        <h2 className="scout-law-section-title">Scout Law :</h2>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#40916c' }}>
                            A Scout is Trustworthy, Loyal, Helpful, Friendly, Courteous, Kind, Obedient, Cheerful, Thrifty, Brave, Clean, and Reverent.
                        </h2>

                        <div className="scout-law-grid">
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
                                <div key={idx} className="scout-law-card">
                                    <h3>{law.point}</h3>
                                    <p>{law.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Outdoor Law Section */}
                <section className="outdoor-law-section">
                    <div className="outdoor-law-container">
                        <h2 className="outdoor-law-title">The Outdoor Code :</h2>
                        <h2 className="outdoor-code-intro">As an American, I will do my best to -</h2>
                        <h2 className="outdoor-code-intro">Be clean in my outdoor manners</h2>
                        <h2 className="outdoor-code-intro">Be careful with fire</h2>
                        <h2 className="outdoor-code-intro">Be considerate in the outdoors, and</h2>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'left', marginBottom: '3rem', color: '#77684a' }}>Be conservation minded.</h2>
                        <div className="outdoor-law-cards">
                            {[
                                {
                                    title: 'Leave No Trace',
                                    desc: 'Scouts minimize their environmental impact. We pack out what we pack in, stay on established trails, and restore campsites to their natural state.',
                                    color: '#40916c'
                                },
                                {
                                    title: 'Respect Wildlife',
                                    desc: 'Observe wildlife from a distance without disturbing them. Never feed animals and understand that they are living in their natural habitat.',
                                    color: '#52b788'
                                },
                                {
                                    title: 'Fire Safety',
                                    desc: 'Build campfires responsibly. Always fully extinguish fires, never leave them unattended, and follow all local fire restrictions and regulations.',
                                    color: '#d4a853'
                                },
                                {
                                    title: 'Water Conservation',
                                    desc: 'Use water wisely and keep natural water sources clean. Always camp at least 200 feet away from water sources to protect aquatic ecosystems.',
                                    color: '#52b788'
                                },
                                {
                                    title: 'Responsible Camping',
                                    desc: 'Camp only in designated areas. Use established campsites when available and camp on durable surfaces to prevent vegetation damage.',
                                    color: '#40916c'
                                }
                            ].map((law, idx) => (
                                <div key={idx} className="outdoor-law-card" style={{ borderLeftColor: law.color }}>
                                    <h3 style={{ color: law.color }}>{law.title}</h3>
                                    <p>{law.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
