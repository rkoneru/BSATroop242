
import { useState, useEffect, useRef } from "react";

const EVENTS = [
  { name: "Spring Campout", date: "2025-04-12T08:00:00", location: "Ocala National Forest" },
  { name: "Merit Badge Day", date: "2025-05-03T09:00:00", location: "Camp Flastacowo" },
  { name: "Eagle Court of Honor", date: "2025-05-17T18:00:00", location: "Troop Meeting Hall" },
];

function useCountdown(targetDateStr) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(targetDateStr) - new Date());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);
  return time;
}

function CountdownBox({ val, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,184,60,0.3)", borderRadius: 12,
      padding: "14px 18px", minWidth: 64,
    }}>
      <span style={{
        fontFamily: "'Oswald', sans-serif", fontSize: 36, fontWeight: 700,
        color: "#ffb83c", lineHeight: 1, textShadow: "0 0 20px rgba(255,184,60,0.5)"
      }}>{String(val).padStart(2, "0")}</span>
      <span style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 4 }}>{label}</span>
    </div>
  );
}

// Firefly component
function Firefly({ cx, cy, delay, dur }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={2.2} fill="#ffe060">
        <animate attributeName="opacity" values="0;1;0.3;1;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="r" values="1.5;2.8;1.5" dur={`${dur * 0.7}s`} begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={6} fill="#ffe060" opacity={0}>
        <animate attributeName="opacity" values="0;0.15;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

export default function Troop242Hero() {
  const countdown = useCountdown(EVENTS[0].date);
  const [activeEvent, setActiveEvent] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const countdownEvent = useCountdown(EVENTS[activeEvent].date);

  const fireflies = [
    { cx: 420, cy: 615, delay: 0,   dur: 4.2 },
    { cx: 530, cy: 630, delay: 1.1, dur: 3.8 },
    { cx: 650, cy: 608, delay: 2.3, dur: 5.1 },
    { cx: 780, cy: 625, delay: 0.6, dur: 4.6 },
    { cx: 880, cy: 612, delay: 1.8, dur: 3.5 },
    { cx: 980, cy: 628, delay: 3.0, dur: 4.9 },
    { cx: 310, cy: 638, delay: 0.4, dur: 5.5 },
    { cx: 1080,cy: 618, delay: 2.1, dur: 4.0 },
    { cx: 1150,cy: 635, delay: 1.4, dur: 3.7 },
    { cx: 480, cy: 648, delay: 3.6, dur: 4.3 },
    { cx: 720, cy: 645, delay: 0.9, dur: 5.2 },
  ];

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: "#0e0820", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 48px",
        background: headerScrolled ? "rgba(14,8,32,0.92)" : "linear-gradient(to bottom,rgba(0,0,0,0.4),transparent)",
        backdropFilter: headerScrolled ? "blur(16px)" : "none",
        borderBottom: headerScrolled ? "1px solid rgba(255,184,60,0.12)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: 3 }}>
          TROOP <span style={{ color: "#ffb83c" }}>242</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Home","About","Events","Gallery","Join Us"].map(l => (
            <a key={l} href="#" style={{
              color: "rgba(255,255,255,0.75)", textDecoration: "none",
              fontSize: 12, fontWeight: 600, letterSpacing: 2,
              textTransform: "uppercase", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#ffb83c"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
            >{l}</a>
          ))}
        </div>
        <button style={{
          padding: "9px 22px", borderRadius: 50, border: "1.5px solid #ffb83c",
          background: "transparent", color: "#ffb83c", fontFamily: "'Oswald',sans-serif",
          fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.target.style.background="#ffb83c"; e.target.style.color="#1a0800"; }}
          onMouseLeave={e => { e.target.style.background="transparent"; e.target.style.color="#ffb83c"; }}
        >Join Us</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 640, overflow: "hidden" }}>

        {/* ── ANIMATED SVG SCENE ── */}
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0e0820"/>
              <stop offset="35%"  stopColor="#2e1a5a"/>
              <stop offset="68%"  stopColor="#6b3d96"/>
              <stop offset="100%" stopColor="#b86ed4"/>
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="78%" r="40%">
              <stop offset="0%"  stopColor="#ff8c1a" stopOpacity="0.65"/>
              <stop offset="45%" stopColor="#c93080" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4ab8cc"/>
              <stop offset="50%"  stopColor="#2a7a90"/>
              <stop offset="100%" stopColor="#b8ccd8"/>
            </linearGradient>
            <linearGradient id="shimmerG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="transparent"/>
              <stop offset="45%"  stopColor="#ffd060" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="rockLG" x1="0.1" y1="0" x2="0.7" y2="1">
              <stop offset="0%"   stopColor="#ff9a2e"/>
              <stop offset="45%"  stopColor="#d0601a"/>
              <stop offset="100%" stopColor="#4a2268"/>
            </linearGradient>
            <linearGradient id="rockRG" x1="0.9" y1="0" x2="0.3" y2="1">
              <stop offset="0%"   stopColor="#ffaa3c"/>
              <stop offset="48%"  stopColor="#c05010"/>
              <stop offset="100%" stopColor="#3e1a58"/>
            </linearGradient>
            <linearGradient id="rockCG" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%"   stopColor="#ff8c20"/>
              <stop offset="55%"  stopColor="#b03c0e"/>
              <stop offset="100%" stopColor="#35185a"/>
            </linearGradient>
            <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#5030a0"/>
              <stop offset="100%" stopColor="#2a1450"/>
            </linearGradient>
            <filter id="treeShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* SKY */}
          <rect width="1440" height="900" fill="url(#skyG)"/>
          <rect width="1440" height="900" fill="url(#sunGlow)"/>

          {/* STARS */}
          {[[120,60],[280,42],[390,88],[540,35],[680,55],[820,28],[960,72],[1100,45],[1250,80],[1380,32],[200,110],[760,98],[1320,115],[450,70],[630,48],[1000,90],[1170,62]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={0.8+Math.random()*0.8} fill="white" opacity={0.6+Math.random()*0.4}>
              <animate attributeName="opacity" values={`${0.3+Math.random()*0.4};1;${0.3+Math.random()*0.4}`} dur={`${2+Math.random()*3}s`} begin={`${Math.random()*4}s`} repeatCount="indefinite"/>
            </circle>
          ))}

          {/* CLOUDS */}
          <g opacity="0.55">
            <animateTransform attributeName="transform" type="translate" from="-300 0" to="1800 0" dur="90s" repeatCount="indefinite"/>
            <ellipse cx="380" cy="128" rx="115" ry="42" fill="#e0c0f8" style={{filter:"blur(8px)"}}/>
            <ellipse cx="460" cy="112" rx="78"  ry="30" fill="#f0d8ff" style={{filter:"blur(6px)"}}/>
            <ellipse cx="308" cy="142" rx="68"  ry="26" fill="#d4b0ee" style={{filter:"blur(7px)"}}/>
          </g>
          <g opacity="0.42">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="1900 0" dur="120s" repeatCount="indefinite"/>
            <ellipse cx="900" cy="94"  rx="135" ry="40" fill="#f0ceff" style={{filter:"blur(9px)"}}/>
            <ellipse cx="990" cy="78"  rx="92"  ry="30" fill="#fce8ff" style={{filter:"blur(7px)"}}/>
            <ellipse cx="815" cy="110" rx="82"  ry="28" fill="#e0c0f2" style={{filter:"blur(8px)"}}/>
          </g>
          {/* Pink accent */}
          <g opacity="0.5">
            <animateTransform attributeName="transform" type="translate" from="-150 0" to="1750 0" dur="75s" begin="-25s" repeatCount="indefinite"/>
            <ellipse cx="640" cy="195" rx="58" ry="18" fill="#ff90c0" style={{filter:"blur(7px)"}}/>
            <ellipse cx="695" cy="186" rx="42" ry="14" fill="#ffb8d0" style={{filter:"blur(5px)"}}/>
          </g>

          {/* LEFT CLIFF */}
          <polygon points="-10,530 55,350 115,285 158,255 205,235 265,208 318,218 356,262 390,318 425,390 452,492 440,610 395,710 -10,710"
            fill="url(#rockLG)"/>
          <polygon points="158,255 205,235 255,258 285,322 264,408 198,490 145,565 95,605 58,582 78,482 118,378 138,298"
            fill="rgba(70,20,95,0.38)"/>
          <polygon points="318,218 356,262 390,318 365,408 324,468 292,382 302,288"
            fill="rgba(50,15,75,0.28)"/>
          <polyline points="115,285 158,255 205,235 265,208" fill="none" stroke="rgba(255,200,100,0.22)" strokeWidth="2.5"/>

          {/* RIGHT CLIFF */}
          <polygon points="1450,395 1392,308 1342,258 1282,218 1242,212 1182,218 1132,248 1102,288 1082,342 1072,425 1092,535 1125,648 1165,710 1450,710"
            fill="url(#rockRG)"/>
          <polygon points="1282,218 1242,212 1202,238 1172,298 1192,382 1244,442 1294,382 1315,290"
            fill="rgba(70,20,95,0.38)"/>
          <polygon points="1102,288 1082,342 1072,425 1104,505 1144,442 1155,348 1122,288"
            fill="rgba(50,15,75,0.3)"/>
          <polyline points="1392,308 1342,258 1282,218 1242,212" fill="none" stroke="rgba(255,200,100,0.18)" strokeWidth="2.5"/>

          {/* CENTRE ROCK */}
          <polygon points="545,510 598,422 650,368 712,328 762,308 815,308 875,332 924,382 965,438 995,518 982,610 955,710 548,710"
            fill="url(#rockCG)"/>
          <polygon points="712,328 762,308 815,308 826,362 795,425 742,455 700,415 678,362"
            fill="rgba(70,20,95,0.32)"/>

          {/* MIDDLE HILLS */}
          <polygon points="-10,585 95,532 195,512 348,502 502,525 655,565 722,572 802,562 955,532 1105,512 1255,524 1385,538 1450,555 1450,710 -10,710"
            fill="url(#hillG)" opacity="0.92"/>

          {/* DARK TREE BAND */}
          <rect x="-10" y="580" width="1460" height="88" fill="rgba(22,8,48,0.55)"/>

          {/* CYPRESS TREES */}
          <g fill="#180840" opacity="0.94">
            {/* BG small */}
            {[[372,580,382,508],[403,577,415,500],[432,582,445,496],[468,575,480,506],[502,579,515,503],
              [538,576,550,496],[572,582,584,508],[608,577,620,498],[642,579,654,503],[678,575,690,506],
              [712,579,724,500],[748,577,760,504],[782,581,796,505],[818,577,831,498],[858,575,870,500],
              [892,579,905,504],[928,577,941,498],[963,579,975,506],[998,575,1010,500],[1032,581,1046,503],[1062,577,1075,498]
            ].map(([x1,y1,x2,y2],i)=>(
              <polygon key={i} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
            {/* MID */}
            {[[118,652,142,538],[153,648,178,522],[198,654,226,518],[248,644,276,515],[295,650,324,512],[342,647,370,520]].map(([x1,y1,x2,y2],i)=>(
              <polygon key={`m${i}`} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
            {[[1058,648,1083,520],[1104,653,1130,512],[1155,644,1182,515],[1200,650,1228,518],[1250,647,1278,522],[1296,652,1324,538]].map(([x1,y1,x2,y2],i)=>(
              <polygon key={`mr${i}`} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
            {/* FOREGROUND big */}
            {[[-10,710,38,568],[42,710,94,532],[125,710,180,518],[212,710,268,506],
              [582,710,624,538],[642,710,685,525],[702,710,745,515],[762,710,805,532],
              [1102,710,1154,508],[1182,710,1236,522],[1268,710,1320,538],[1354,710,1405,555]].map(([x1,y1,x2,y2],i)=>(
              <polygon key={`f${i}`} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
          </g>

          {/* PALM TREES */}
          {/* Left palm */}
          <g transform="translate(88,572)" fill="#140832" opacity="0.92">
            <path d="M0,128 Q-4,85 -7,42 Q-5,10 0,-12 Q5,10 7,42 Q4,85 0,128"/>
            <path d="M0,-12 Q-42,-36 -72,-22 Q-46,-16 -20,2 Z"/>
            <path d="M0,-12 Q-52,-18 -68,14 Q-40,5 -14,8 Z"/>
            <path d="M0,-12 Q-32,14 -46,40 Q-20,20 -5,16 Z"/>
            <path d="M0,-12 Q42,-36 72,-22 Q46,-16 20,2 Z"/>
            <path d="M0,-12 Q52,-18 68,14 Q40,5 14,8 Z"/>
            <path d="M0,-12 Q32,14 46,40 Q20,20 5,16 Z"/>
            <path d="M0,-12 Q0,-48 0,-78 Q4,-44 4,-12 Z"/>
          </g>
          {/* Right palm */}
          <g transform="translate(1352,568)" fill="#140832" opacity="0.92">
            <path d="M0,132 Q4,88 6,40 Q4,8 0,-14 Q-4,8 -6,40 Q-4,88 0,132"/>
            <path d="M0,-14 Q-40,-38 -70,-24 Q-44,-18 -18,0 Z"/>
            <path d="M0,-14 Q-50,-20 -66,12 Q-38,4 -12,6 Z"/>
            <path d="M0,-14 Q-30,12 -44,38 Q-18,18 -4,14 Z"/>
            <path d="M0,-14 Q40,-38 70,-24 Q44,-18 18,0 Z"/>
            <path d="M0,-14 Q50,-20 66,12 Q38,4 12,6 Z"/>
            <path d="M0,-14 Q30,12 44,38 Q18,18 4,14 Z"/>
            <path d="M0,-14 Q0,-50 0,-80 Q4,-46 4,-14 Z"/>
          </g>

          {/* WATER */}
          <polygon points="-10,742 1450,722 1450,900 -10,900" fill="url(#waterG)"/>
          {/* Shimmer stripes */}
          <rect x="280" y="748" width="590" height="16" rx="8" fill="url(#shimmerG)" opacity="0.65">
            <animate attributeName="opacity" values="0.35;0.75;0.35" dur="3.2s" repeatCount="indefinite"/>
            <animate attributeName="y" values="748;752;748" dur="4s" repeatCount="indefinite"/>
          </rect>
          <rect x="540" y="762" width="420" height="10" rx="5" fill="#ffcc44" opacity="0.42">
            <animate attributeName="opacity" values="0.25;0.55;0.25" dur="2.8s" begin="0.8s" repeatCount="indefinite"/>
          </rect>
          <rect x="100" y="775" width="820" height="8" rx="4" fill="#88dde8" opacity="0.32">
            <animate attributeName="opacity" values="0.18;0.42;0.18" dur="4.5s" begin="1.2s" repeatCount="indefinite"/>
          </rect>
          {[{x1:180,y1:812,x2:465,y2:810},{x1:580,y1:828,x2:890,y2:825},{x1:920,y1:818,x2:1210,y2:814}].map((l,i)=>(
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5">
              <animate attributeName="opacity" values="0.08;0.28;0.08" dur={`${3.5+i}s`} begin={`${i*0.7}s`} repeatCount="indefinite"/>
            </line>
          ))}
          <polygon points="-10,882 400,848 700,836 1000,844 1305,854 1450,862 1450,900 -10,900" fill="#ccdce8" opacity="0.48"/>
          <polygon points="-10,900 300,878 700,864 1100,872 1450,882 1450,900" fill="#e0eef5" opacity="0.38"/>

          {/* HORIZON GLOW PULSE */}
          <ellipse cx="720" cy="685" rx="400" ry="42" fill="rgba(255,118,18,0.14)">
            <animate attributeName="ry" values="36;48;36" dur="5.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.08;0.18;0.08" dur="5.5s" repeatCount="indefinite"/>
          </ellipse>

          {/* FIREFLIES */}
          {fireflies.map((f,i)=><Firefly key={i} {...f}/>)}

        </svg>

        {/* ── HERO TEXT ── */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "20px", zIndex: 20,
          paddingTop: 80,
        }}>
          {/* Badge */}
          <div style={{
            width: 88, height: 88,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,184,60,0.4)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 18,
            boxShadow: "0 0 36px rgba(255,184,60,0.28)",
            animation: "pulse 3s ease-in-out infinite",
          }}>
            <svg width="48" height="56" viewBox="0 0 52 60" fill="none">
              <path d="M26 4C26 4 17 15 17 25C17 31 21 35 26 37C31 35 35 31 35 25C35 15 26 4 26 4Z" fill="#ffb83c"/>
              <line x1="26" y1="37" x2="26" y2="56" stroke="#ffb83c" strokeWidth="3" strokeLinecap="round"/>
              <line x1="18" y1="46" x2="34" y2="46" stroke="#ffb83c" strokeWidth="3" strokeLinecap="round"/>
              <path d="M9 31C9 31 3 27 5 20C7 13 14 13 18 18" stroke="#ffb83c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M43 31C43 31 49 27 47 20C45 13 38 13 34 18" stroke="#ffb83c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="26" cy="24" r="4" fill="#fff8e8"/>
            </svg>
          </div>

          <p style={{
            fontFamily:"'Oswald',sans-serif", fontSize:"clamp(11px,1.4vw,13px)",
            fontWeight:600, letterSpacing:5, textTransform:"uppercase",
            color:"#ffd87a", marginBottom:10,
            animation: "fadeUp 0.8s 0.3s both",
          }}>Central Florida · Boy Scouts of America</p>

          <h1 style={{
            fontFamily:"'Oswald',sans-serif",
            fontSize:"clamp(48px,9vw,108px)",
            fontWeight:700, color:"#fff", lineHeight:0.95,
            letterSpacing:"-2px",
            textShadow:"0 4px 40px rgba(0,0,0,0.55)",
            animation:"fadeUp 0.9s 0.5s both",
          }}>
            TROOP <span style={{color:"#ffb83c",display:"block"}}>242</span>
          </h1>

          <p style={{
            fontSize:"clamp(13px,1.6vw,16px)",
            color:"rgba(255,255,255,0.72)",
            marginTop:14, letterSpacing:1, maxWidth:480, lineHeight:1.7,
            animation:"fadeUp 1s 0.75s both",
          }}>
            Adventure. Brotherhood. Service.<br/>
            Building tomorrow's leaders — one campfire at a time.
          </p>

          <div style={{ display:"flex", gap:14, marginTop:28, animation:"fadeUp 1s 0.95s both" }}>
            <button style={{
              padding:"13px 32px", borderRadius:50,
              background:"linear-gradient(135deg,#ffb83c,#ff8c1a)",
              color:"#1a0800", border:"none", cursor:"pointer",
              fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600,
              letterSpacing:2, textTransform:"uppercase",
              boxShadow:"0 6px 24px rgba(255,140,26,0.45)",
              transition:"all 0.2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
            >Join Our Troop</button>
            <button style={{
              padding:"13px 32px", borderRadius:50,
              background:"rgba(255,255,255,0.08)",
              backdropFilter:"blur(12px)",
              color:"#fff", border:"1.5px solid rgba(255,255,255,0.35)",
              cursor:"pointer",
              fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:600,
              letterSpacing:2, textTransform:"uppercase",
              transition:"all 0.2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
            >View Events</button>
          </div>
        </div>

        {/* SCROLL HINT */}
        <div style={{
          position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
          zIndex:25, display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          animation:"fadeUp 1s 1.5s both",
        }}>
          <div style={{
            width:22, height:36, border:"2px solid rgba(255,255,255,0.35)",
            borderRadius:11, display:"flex", justifyContent:"center", paddingTop:6,
          }}>
            <div style={{
              width:3, height:7, background:"rgba(255,255,255,0.55)", borderRadius:2,
              animation:"scrollDot 1.6s ease-in-out infinite",
            }}/>
          </div>
          <span style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.4)",textTransform:"uppercase"}}>Scroll</span>
        </div>

        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes pulse { 0%,100%{box-shadow:0 0 24px rgba(255,184,60,0.22);transform:scale(1)} 50%{box-shadow:0 0 44px rgba(255,184,60,0.48);transform:scale(1.06)} }
          @keyframes scrollDot { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(10px)} }
        `}</style>
      </section>

      {/* ── COUNTDOWN + EVENTS SECTION ── */}
      <section style={{
        background:"#0e0820",
        borderTop:"1px solid rgba(255,184,60,0.12)",
        padding:"72px 48px 80px",
        display:"flex", flexDirection:"column", alignItems:"center",
      }}>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:12,letterSpacing:5,textTransform:"uppercase",color:"#ffb83c",marginBottom:8}}>Next Adventure</p>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:700,color:"#fff",marginBottom:6,textAlign:"center"}}>
          {EVENTS[activeEvent].name}
        </h2>
        <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,letterSpacing:2,marginBottom:36,textTransform:"uppercase"}}>
          📍 {EVENTS[activeEvent].location}
        </p>

        {/* COUNTDOWN */}
        <div style={{display:"flex",gap:12,marginBottom:48}}>
          <CountdownBox val={countdownEvent.d} label="Days"/>
          <CountdownBox val={countdownEvent.h} label="Hours"/>
          <CountdownBox val={countdownEvent.m} label="Mins"/>
          <CountdownBox val={countdownEvent.s} label="Secs"/>
        </div>

        {/* EVENT TABS */}
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:40}}>
          {EVENTS.map((e,i)=>(
            <button key={i} onClick={()=>setActiveEvent(i)} style={{
              padding:"10px 24px", borderRadius:50, cursor:"pointer",
              fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase",
              border: i===activeEvent ? "1.5px solid #ffb83c" : "1.5px solid rgba(255,255,255,0.2)",
              background: i===activeEvent ? "rgba(255,184,60,0.12)" : "transparent",
              color: i===activeEvent ? "#ffb83c" : "rgba(255,255,255,0.55)",
              transition:"all 0.25s",
            }}>{e.name}</button>
          ))}
        </div>

        {/* STATS */}
        <div style={{display:"flex",gap:48,flexWrap:"wrap",justifyContent:"center",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:48}}>
          {[["48","Active Scouts"],["12","Eagle Scouts"],["30+","Years Active"],["200+","Merit Badges"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:44,fontWeight:700,color:"#ffb83c",lineHeight:1,textShadow:"0 0 24px rgba(255,184,60,0.3)"}}>{n}</div>
              <div style={{fontSize:11,letterSpacing:3,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",marginTop:6}}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
