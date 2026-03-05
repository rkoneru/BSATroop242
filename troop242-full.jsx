
import { useState, useEffect } from "react";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const EVENTS = [
  { name: "Spring Campout", date: "2026-03-19T08:00:00", location: "Key West, Florida Keys" },
  { name: "Merit Badge Day", date: "2026-06-06T09:00:00", location: "Camp Flastacowo" },
  { name: "Eagle Court of Honor", date: "2026-06-20T18:00:00", location: "Troop Meeting Hall" },
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
      display:"flex", flexDirection:"column", alignItems:"center",
      background:"rgba(255,184,60,0.08)", backdropFilter:"blur(10px)",
      border:"1px solid rgba(255,184,60,0.35)", borderRadius:14,
      padding:"16px 22px", minWidth:72,
    }}>
      <span style={{
        fontFamily:"'Oswald',sans-serif", fontSize:42, fontWeight:700,
        color:"#ffb83c", lineHeight:1, textShadow:"0 0 24px rgba(255,184,60,0.5)"
      }}>{String(val ?? 0).padStart(2,"0")}</span>
      <span style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",marginTop:5}}>{label}</span>
    </div>
  );
}

function Firefly({ cx, cy, delay, dur }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={2.2} fill="#ffe060">
        <animate attributeName="opacity" values="0;1;0.3;1;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
        <animate attributeName="r" values="1.5;2.8;1.5" dur={`${dur*0.7}s`} begin={`${delay}s`} repeatCount="indefinite"/>
      </circle>
      <circle cx={cx} cy={cy} r={7} fill="#ffe060" opacity="0">
        <animate attributeName="opacity" values="0;0.14;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
      </circle>
    </g>
  );
}

/* ─── CAMPFIRE KEY WEST ILLUSTRATION ─────────────────────────── */
function CampfireScene() {
  return (
    <svg viewBox="0 0 900 480" style={{width:"100%",maxWidth:900,display:"block",margin:"0 auto"}}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Ground */}
        <radialGradient id="groundGlow" cx="50%" cy="100%" r="55%">
          <stop offset="0%" stopColor="#3d1a00" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0a0510" stopOpacity="0"/>
        </radialGradient>
        {/* Fire glow */}
        <radialGradient id="fireGlow" cx="50%" cy="80%" r="60%">
          <stop offset="0%"  stopColor="#ff8c00" stopOpacity="0.75"/>
          <stop offset="40%" stopColor="#cc4400" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
        {/* Sky glow bottom */}
        <radialGradient id="skyBottom" cx="50%" cy="100%" r="70%">
          <stop offset="0%"  stopColor="#1a0832" stopOpacity="1"/>
          <stop offset="100%" stopColor="#080318" stopOpacity="1"/>
        </radialGradient>
        {/* Scout 1 body */}
        <linearGradient id="s1body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8c30"/>
          <stop offset="100%" stopColor="#6040c0"/>
        </linearGradient>
        {/* Scout 2 body */}
        <linearGradient id="s2body" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4090d0"/>
          <stop offset="100%" stopColor="#cc4020"/>
        </linearGradient>
        {/* Skin */}
        <linearGradient id="skin1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c87040"/>
          <stop offset="100%" stopColor="#8a4820"/>
        </linearGradient>
        {/* Tent */}
        <linearGradient id="tentG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a6080"/>
          <stop offset="50%" stopColor="#1a4060"/>
          <stop offset="100%" stopColor="#0e2035"/>
        </linearGradient>
        <linearGradient id="tentHL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,200,100,0.25)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        {/* Palm */}
        <linearGradient id="palmG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2010"/>
          <stop offset="100%" stopColor="#1a0c08"/>
        </linearGradient>
        {/* Water */}
        <linearGradient id="waterKW" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a6878"/>
          <stop offset="100%" stopColor="#0a3040"/>
        </linearGradient>
        {/* Fire inner */}
        <radialGradient id="fireInner" cx="50%" cy="90%" r="50%">
          <stop offset="0%"  stopColor="#fff8c0"/>
          <stop offset="30%" stopColor="#ffcc00"/>
          <stop offset="60%" stopColor="#ff6600"/>
          <stop offset="100%" stopColor="#cc2200" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* BACKGROUND */}
      <rect width="900" height="480" fill="#080318"/>
      <rect width="900" height="480" fill="url(#skyBottom)"/>

      {/* STARS */}
      {[[60,30],[140,18],[230,40],[320,15],[410,32],[500,20],[590,38],[680,14],[770,28],[840,42],
        [100,70],[280,58],[460,65],[640,52],[810,68],[180,90],[520,85],[720,95]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={0.7+Math.random()*0.8} fill="white" opacity={0.4+Math.random()*0.5}>
          <animate attributeName="opacity" values={`${0.2};${0.8+Math.random()*0.2};${0.2}`}
            dur={`${2+Math.random()*3}s`} begin={`${Math.random()*3}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* KEY WEST OCEAN HORIZON */}
      <rect x="0" y="280" width="900" height="60" fill="url(#waterKW)" opacity="0.7"/>
      {/* Water shimmer */}
      <rect x="200" y="290" width="500" height="6" rx="3" fill="#40d0e8" opacity="0.18">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite"/>
      </rect>
      <rect x="350" y="300" width="300" height="4" rx="2" fill="#80e8f8" opacity="0.12">
        <animate attributeName="opacity" values="0.08;0.22;0.08" dur="4s" begin="1s" repeatCount="indefinite"/>
      </rect>

      {/* DISTANT KEYS / MANGROVES silhouette */}
      <ellipse cx="150" cy="295" rx="180" ry="22" fill="#0e2818" opacity="0.9"/>
      <ellipse cx="700" cy="292" rx="160" ry="18" fill="#0e2818" opacity="0.9"/>
      <ellipse cx="450" cy="298" rx="120" ry="14" fill="#0e2818" opacity="0.85"/>

      {/* Mangrove tree squiggles on keys */}
      {[80,120,155,185,218,650,680,715,748,780].map((x,i)=>(
        <g key={i}>
          <rect x={x-2} y={268+(i%3)*4} width="4" height={20+(i%4)*5} fill="#0a1e10" opacity="0.9"/>
          <ellipse cx={x} cy={268+(i%3)*4} rx={10+(i%3)*4} ry={8+(i%2)*3} fill="#0c2214" opacity="0.9"/>
        </g>
      ))}

      {/* GROUND */}
      <ellipse cx="450" cy="430" rx="420" ry="60" fill="#1a0830" opacity="0.95"/>
      <rect x="0" y="400" width="900" height="80" fill="#100620"/>
      <ellipse cx="450" cy="400" rx="380" ry="28" fill="url(#groundGlow)"/>

      {/* FIRE GLOW on ground */}
      <ellipse cx="450" cy="400" rx="180" ry="40" fill="url(#fireGlow)">
        <animate attributeName="rx" values="160;200;170;195;160" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;1;0.8;1;0.7" dur="2.5s" repeatCount="indefinite"/>
      </ellipse>

      {/* TENT (back right) */}
      <g transform="translate(620,270)">
        {/* Main tent body */}
        <polygon points="0,160 80,40 160,160" fill="url(#tentG)"/>
        <polygon points="0,160 80,40 160,160" fill="url(#tentHL)" opacity="0.5"/>
        {/* Tent shadow side */}
        <polygon points="80,40 160,160 180,165 100,40" fill="rgba(0,0,0,0.3)"/>
        {/* Tent extension / flysheet */}
        <polygon points="160,160 180,165 200,160 175,80 160,40" fill="#1a3a50" opacity="0.7"/>
        {/* Door opening (dark) */}
        <ellipse cx="62" cy="145" rx="22" ry="30" fill="#05080e" opacity="0.85"/>
        {/* Tent line/guy rope */}
        <line x1="80" y1="40" x2="50" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <line x1="80" y1="40" x2="110" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        {/* Orange firelight warmth on tent face */}
        <polygon points="0,160 80,40 160,160" fill="rgba(255,140,40,0.08)">
          <animate attributeName="opacity" values="0.05;0.14;0.06;0.12;0.05" dur="2.8s" repeatCount="indefinite"/>
        </polygon>
        {/* Tent stake markers */}
        <circle cx="0"   cy="162" r="3" fill="#2a5070"/>
        <circle cx="160" cy="162" r="3" fill="#2a5070"/>
      </g>

      {/* PALM TREE LEFT */}
      <g transform="translate(55,180)">
        <path d="M0,240 Q-6,190 -8,130 Q-5,70 0,30 Q5,70 8,130 Q6,190 0,240" fill="url(#palmG)"/>
        <g fill="#0e1e08" opacity="0.88">
          <path d="M0,30 Q-55,-30 -90,-10 Q-58,-5 -25,18 Z"/>
          <path d="M0,30 Q-60,0 -80,30 Q-50,18 -18,28 Z"/>
          <path d="M0,30 Q-38,30 -52,58 Q-26,38 -5,38 Z"/>
          <path d="M0,30 Q55,-30 90,-10 Q58,-5 25,18 Z"/>
          <path d="M0,30 Q60,0 80,30 Q50,18 18,28 Z"/>
          <path d="M0,30 Q38,30 52,58 Q26,38 5,38 Z"/>
          <path d="M0,30 Q0,-40 0,-68 Q4,-34 4,30 Z"/>
        </g>
      </g>

      {/* PALM TREE RIGHT */}
      <g transform="translate(858,195)">
        <path d="M0,230 Q5,180 6,120 Q4,62 0,25 Q-4,62 -6,120 Q-5,180 0,230" fill="url(#palmG)"/>
        <g fill="#0e1e08" opacity="0.88">
          <path d="M0,25 Q-52,-32 -88,-12 Q-56,-6 -22,15 Z"/>
          <path d="M0,25 Q-58,2 -78,28 Q-48,16 -16,26 Z"/>
          <path d="M0,25 Q-36,28 -50,54 Q-24,35 -4,35 Z"/>
          <path d="M0,25 Q52,-32 88,-12 Q56,-6 22,15 Z"/>
          <path d="M0,25 Q58,2 78,28 Q48,16 16,26 Z"/>
          <path d="M0,25 Q36,28 50,54 Q24,35 4,35 Z"/>
        </g>
      </g>

      {/* ── SCOUT 1 (left, sitting hugging knees, facing fire) ── */}
      <g transform="translate(180,250)">
        {/* Backpack */}
        <rect x="-55" y="30" width="48" height="65" rx="10" fill="#5040b0"/>
        <rect x="-52" y="35" width="42" height="55" rx="8" fill="#6050c8"/>
        {/* Pack details – diamond patches */}
        <polygon points="-35,42 -28,48 -35,54 -42,48" fill="rgba(255,255,255,0.25)"/>
        <polygon points="-35,62 -28,68 -35,74 -42,68" fill="rgba(255,255,255,0.2)"/>
        {/* Horizontal strap */}
        <rect x="-54" y="57" width="46" height="6" rx="3" fill="#c03020"/>
        {/* Body torso */}
        <ellipse cx="0" cy="50" rx="40" ry="44" fill="#6040c0"/>
        {/* Shirt highlight (fire warmth) */}
        <ellipse cx="12" cy="42" rx="22" ry="28" fill="rgba(255,140,40,0.28)"/>
        {/* Knees/legs drawn up */}
        <ellipse cx="-8" cy="90" rx="35" ry="22" fill="#7858c0"/>
        <ellipse cx="18" cy="85" rx="28" ry="18" fill="#7858c0"/>
        {/* Boots */}
        <ellipse cx="-18" cy="108" rx="18" ry="10" fill="#8090c0"/>
        <ellipse cx="28" cy="104" rx="16" ry="9"  fill="#8090c0"/>
        {/* Neckerchief */}
        <polygon points="-6,10 12,10 4,36" fill="#cc3020"/>
        <polygon points="-6,10 12,10 4,36" fill="rgba(255,180,60,0.3)"/>
        {/* Head */}
        <ellipse cx="8" cy="-8" rx="26" ry="28" fill="url(#skin1)"/>
        {/* Hair */}
        <ellipse cx="8" cy="-26" rx="26" ry="14" fill="#1a0808"/>
        <ellipse cx="-14" cy="-20" rx="10" ry="18" fill="#1a0808"/>
        {/* Scout hat */}
        <ellipse cx="8" cy="-28" rx="30" ry="8" fill="#4a3010"/>
        <ellipse cx="8" cy="-34" rx="20" ry="14" fill="#5a3c14"/>
        {/* Face highlight (fire side) */}
        <ellipse cx="16" cy="-5" rx="12" ry="14" fill="rgba(255,140,40,0.22)"/>
        {/* Eye */}
        <circle cx="18" cy="-8" r="3" fill="#1a0808"/>
        <circle cx="19" cy="-9" r="1" fill="white" opacity="0.6"/>
        {/* Arm */}
        <path d="M30,30 Q50,50 38,80" stroke="#5030a0" strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="38" cy="82" rx="12" ry="8" fill="url(#skin1)"/>
        {/* Merit badge sash glimpse */}
        <rect x="-4" y="12" width="14" height="28" rx="3" fill="rgba(255,220,80,0.5)"/>
        {/* Cup on ground */}
        <rect x="30" y="110" width="18" height="14" rx="4" fill="#5060a0"/>
        <rect x="29" y="110" width="20" height="4"  rx="2" fill="#6070b0"/>
      </g>

      {/* ── SCOUT 2 (right, sitting on log, reading map/handbook) ── */}
      <g transform="translate(620,265)">
        {/* Log seat */}
        <ellipse cx="15" cy="128" rx="38" ry="12" fill="#3a2010"/>
        <rect x="-22" y="118" width="76" height="14" rx="7" fill="#4a2c14"/>
        {/* Body */}
        <ellipse cx="0" cy="55" rx="36" ry="42" fill="#3a90c8"/>
        {/* Fire warmth on left side */}
        <ellipse cx="-16" cy="44" rx="20" ry="26" fill="rgba(255,140,40,0.3)"/>
        {/* Legs */}
        <rect x="-28" y="85" width="24" height="40" rx="10" fill="#5a4020"/>
        <rect x="8"  y="88" width="22" height="36" rx="10" fill="#5a4020"/>
        {/* Crossed leg top */}
        <ellipse cx="22" cy="88" rx="26" ry="14" fill="#6a5030"/>
        {/* Shoes */}
        <ellipse cx="-16" cy="124" rx="16" ry="8" fill="#d08020"/>
        <ellipse cx="30"  cy="120" rx="14" ry="7" fill="#d08020"/>
        {/* Neckerchief */}
        <polygon points="-5,14 10,14 2,38" fill="#cc3020"/>
        {/* Head */}
        <ellipse cx="2" cy="-5" rx="25" ry="27" fill="url(#skin1)"/>
        {/* Hair – short */}
        <ellipse cx="2" cy="-22" rx="25" ry="12" fill="#1a0808"/>
        {/* Scout hat brim */}
        <ellipse cx="2" cy="-28" rx="28" ry="7" fill="#4a3010"/>
        <ellipse cx="2" cy="-34" rx="18" ry="12" fill="#5a3c14"/>
        {/* Head looking down at book */}
        <ellipse cx="6" cy="-2" rx="10" ry="12" fill="rgba(255,140,40,0.2)"/>
        {/* Eyes – looking down */}
        <ellipse cx="10" cy="-2" rx="4" ry="2" fill="#1a0808"/>
        <ellipse cx="-4" cy="-2" rx="3" ry="2" fill="#1a0808"/>
        {/* Arms holding book */}
        <path d="M-28,30 Q-42,55 -30,75" stroke="#2a78a8" strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M28,30 Q42,55 30,75" stroke="#2a78a8" strokeWidth="16" strokeLinecap="round" fill="none"/>
        {/* Hands */}
        <ellipse cx="-30" cy="77" rx="10" ry="7" fill="url(#skin1)"/>
        <ellipse cx="30"  cy="77" rx="10" ry="7" fill="url(#skin1)"/>
        {/* SCOUT HANDBOOK / MAP */}
        <rect x="-32" y="55" width="64" height="45" rx="4" fill="#3050a0"/>
        <rect x="-32" y="55" width="64" height="45" rx="4" fill="rgba(255,255,255,0.05)"/>
        {/* Book pages */}
        <line x1="-2" y1="57" x2="-2" y2="98" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Map lines on book */}
        <line x1="-28" y1="68" x2="-6"  y2="68" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="-28" y1="74" x2="-6"  y2="74" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="-28" y1="80" x2="-6"  y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <line x1="4"  y1="68" x2="28"  y2="68" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <line x1="4"  y1="74" x2="28"  y2="74" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        {/* BSA logo on cover */}
        <circle cx="15" cy="75" r="8" fill="rgba(255,220,60,0.35)" stroke="rgba(255,220,60,0.5)" strokeWidth="1"/>
        {/* Cup on ground */}
        <rect x="38" y="112" width="16" height="13" rx="4" fill="#5060a0"/>
        <rect x="37" y="112" width="18" height="4"  rx="2" fill="#6070b0"/>
        {/* Thermos/kettle */}
        <rect x="-12" y="100" width="18" height="30" rx="6" fill="#c04050"/>
        <ellipse cx="-3" cy="100" rx="9" ry="4" fill="#d05060"/>
        <rect x="-5" y="96" width="5" height="6" rx="2" fill="#b03040"/>
      </g>

      {/* ROCKS around fire */}
      {[[390,398,28,14],[420,406,18,10],[448,412,22,11],[472,408,16,9],[498,402,24,12],
        [355,408,20,11],[522,405,18,10],[340,418,26,13],[535,415,20,10]].map(([cx,cy,rx,ry],i)=>(
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
          fill={`hsl(${18+i*5},${55+i*2}%,${22+i*3}%)`}/>
      ))}

      {/* FIRE */}
      {/* Logs */}
      <ellipse cx="445" cy="408" rx="42" ry="8" fill="#2a1008" transform="rotate(-20 445 408)"/>
      <ellipse cx="455" cy="408" rx="42" ry="8" fill="#2a1008" transform="rotate(20 455 408)"/>
      {/* Ember base */}
      <ellipse cx="450" cy="403" rx="30" ry="10" fill="#ff4400" opacity="0.8">
        <animate attributeName="opacity" values="0.6;0.9;0.7;0.95;0.6" dur="1.8s" repeatCount="indefinite"/>
      </ellipse>
      {/* Main flame layers */}
      <path d="M430,403 Q428,370 435,345 Q440,320 450,305 Q460,320 465,345 Q472,370 470,403 Z"
        fill="#ff6600">
        <animate attributeName="d"
          values="M430,403 Q428,370 435,345 Q440,320 450,305 Q460,320 465,345 Q472,370 470,403 Z;
                  M432,403 Q425,365 432,338 Q438,312 450,300 Q462,312 468,338 Q475,365 468,403 Z;
                  M429,403 Q430,372 437,348 Q442,325 450,308 Q458,325 463,348 Q470,372 471,403 Z;
                  M430,403 Q428,370 435,345 Q440,320 450,305 Q460,320 465,345 Q472,370 470,403 Z"
          dur="0.8s" repeatCount="indefinite"/>
      </path>
      <path d="M436,403 Q434,378 440,358 Q445,338 450,325 Q455,338 460,358 Q466,378 464,403 Z"
        fill="#ffaa00">
        <animate attributeName="d"
          values="M436,403 Q434,378 440,358 Q445,338 450,325 Q455,338 460,358 Q466,378 464,403 Z;
                  M438,403 Q432,372 438,350 Q444,330 450,318 Q456,330 462,350 Q468,372 462,403 Z;
                  M435,403 Q436,380 442,360 Q447,342 450,328 Q453,342 458,360 Q464,380 465,403 Z;
                  M436,403 Q434,378 440,358 Q445,338 450,325 Q455,338 460,358 Q466,378 464,403 Z"
          dur="0.7s" repeatCount="indefinite"/>
      </path>
      <path d="M442,403 Q440,385 445,368 Q448,352 450,342 Q452,352 455,368 Q460,385 458,403 Z"
        fill="#ffee00">
        <animate attributeName="d"
          values="M442,403 Q440,385 445,368 Q448,352 450,342 Q452,352 455,368 Q460,385 458,403 Z;
                  M444,403 Q438,382 443,362 Q447,345 450,336 Q453,345 457,362 Q462,382 456,403 Z;
                  M441,403 Q442,387 447,370 Q449,355 450,345 Q451,355 453,370 Q458,387 459,403 Z;
                  M442,403 Q440,385 445,368 Q448,352 450,342 Q452,352 455,368 Q460,385 458,403 Z"
          dur="0.6s" repeatCount="indefinite"/>
      </path>
      {/* Inner white core */}
      <ellipse cx="450" cy="380" rx="5" ry="12" fill="#fffff0" opacity="0.85">
        <animate attributeName="ry" values="10;16;11;14;10" dur="0.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.95;0.75;0.9;0.7" dur="0.6s" repeatCount="indefinite"/>
      </ellipse>
      {/* Sparks */}
      {[[445,355],[452,340],[438,360],[458,350],[448,330],[442,345],[455,335]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={1.5} fill="#ffcc00">
          <animate attributeName="cy" values={`${y};${y-35};${y-60}`} dur={`${1+i*0.2}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;1;0.8;0" dur={`${1+i*0.2}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
          <animate attributeName="cx" values={`${x};${x+(i%2?8:-8)};${x+(i%2?14:-14)}`} dur={`${1+i*0.2}s`} begin={`${i*0.3}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* FIREFLIES */}
      {[[200,340,0,4.2],[250,360,1.1,3.8],[310,350,2.3,5.1],[560,345,0.6,4.6],[610,358,1.8,3.5],[660,340,3.0,4.9]].map((f,i)=>(
        <circle key={i} cx={f[0]} cy={f[1]} r={1.8} fill="#ffe060">
          <animate attributeName="opacity" values="0;1;0.3;1;0" dur={`${f[3]}s`} begin={`${f[2]}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* GROUND scatter rocks (foreground) */}
      {[[150,440,36,16],[300,445,28,12],[600,443,30,14],[740,440,32,15],[850,442,24,11]].map(([cx,cy,rx,ry],i)=>(
        <ellipse key={`gr${i}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={`hsl(${20+i*8},45%,${18+i*4}%)`} opacity="0.8"/>
      ))}

      {/* KEY WEST LIGHTHOUSE (small, distant right) */}
      <g transform="translate(820,245)" opacity="0.55">
        <rect x="-5" y="0" width="10" height="45" fill="#e8e0d0"/>
        <polygon points="-8,0 8,0 5,-12 -5,-12" fill="#c84020"/>
        <rect x="-7" y="2" width="14" height="4" fill="#888"/>
        <rect x="-7" y="12" width="14" height="4" fill="#888"/>
        <rect x="-7" y="22" width="14" height="4" fill="#888"/>
        {/* Light beacon */}
        <circle cx="0" cy="-14" r="5" fill="#ffffc0" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <ellipse cx="0" cy="-14" rx="18" ry="8" fill="#ffffc0" opacity="0.2">
          <animate attributeName="opacity" values="0;0.3;0" dur="2s" repeatCount="indefinite"/>
        </ellipse>
        <rect x="-8" y="42" width="16" height="8" rx="2" fill="#c0b090"/>
      </g>

      {/* KEY WEST BUOY (water) */}
      <g transform="translate(300,310)" opacity="0.6">
        <ellipse cx="0" cy="0" rx="8" ry="12" fill="#cc2020"/>
        <ellipse cx="0" cy="-10" rx="5" ry="4" fill="#ffcc00"/>
        <line x1="0" y1="-14" x2="0" y2="-22" stroke="#888" strokeWidth="1.5"/>
        <circle cx="0" cy="-24" r="2" fill="#ff8800"/>
      </g>

      {/* "TROOP 242" banner on tent */}
      <g transform="translate(655,348)">
        <rect x="-28" y="0" width="56" height="16" rx="4" fill="rgba(255,184,60,0.85)"/>
        <text x="0" y="12" textAnchor="middle"
          style={{fontFamily:"'Oswald',sans-serif", fontSize:"10px", fontWeight:"700", fill:"#1a0800", letterSpacing:1}}>
          TROOP 242
        </text>
      </g>

      {/* AMBIENT light rim on scouts from fire */}
      <ellipse cx="240" cy="350" rx="80" ry="100" fill="rgba(255,120,20,0.05)">
        <animate attributeName="opacity" values="0.03;0.08;0.04;0.07;0.03" dur="2.2s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="640" cy="340" rx="70" ry="90" fill="rgba(255,120,20,0.05)">
        <animate attributeName="opacity" values="0.04;0.09;0.03;0.08;0.04" dur="1.9s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  );
}

/* ─── MAIN APP ────────────────────────────────────────────────── */
export default function Troop242() {
  const [activeEvent, setActiveEvent] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const countdown = useCountdown(EVENTS[activeEvent].date);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fireflies = [
    {cx:420,cy:615,delay:0,   dur:4.2},{cx:530,cy:630,delay:1.1,dur:3.8},
    {cx:650,cy:608,delay:2.3,dur:5.1},{cx:780,cy:625,delay:0.6,dur:4.6},
    {cx:880,cy:612,delay:1.8,dur:3.5},{cx:980,cy:628,delay:3.0,dur:4.9},
    {cx:310,cy:638,delay:0.4,dur:5.5},{cx:1080,cy:618,delay:2.1,dur:4.0},
    {cx:1150,cy:635,delay:1.4,dur:3.7},{cx:480,cy:648,delay:3.6,dur:4.3},
    {cx:720,cy:645,delay:0.9,dur:5.2},
  ];

  return (
    <>
      <Header />
      <div style={{fontFamily:"'Open Sans',sans-serif",background:"#0e0820",minHeight:"100vh"}}>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet"/>

      {/* ── NAV ── */}
     {/*  <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"18px 48px",
        background: headerScrolled?"rgba(14,8,32,0.94)":"linear-gradient(to bottom,rgba(0,0,0,0.4),transparent)",
        backdropFilter: headerScrolled?"blur(18px)":"none",
        borderBottom: headerScrolled?"1px solid rgba(255,184,60,0.12)":"none",
        transition:"all 0.4s ease",
      }}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontWeight:700,fontSize:18,color:"#fff",letterSpacing:3}}>
          TROOP <span style={{color:"#ffb83c"}}>242</span>
        </div>
        <div style={{display:"flex",gap:32}}>
          {["Home","About","Events","Gallery","Join Us"].map(l=>(
            <a key={l} href="#" style={{color:"rgba(255,255,255,0.75)",textDecoration:"none",fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#ffb83c"}
              onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.75)"}
            >{l}</a>
          ))}
        </div>
        <button style={{padding:"9px 22px",borderRadius:50,border:"1.5px solid #ffb83c",background:"transparent",color:"#ffb83c",fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",transition:"all 0.2s"}}
          onMouseEnter={e=>{e.target.style.background="#ffb83c";e.target.style.color="#1a0800";}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#ffb83c";}}
        >Join Us</button>
      </nav> */}

      {/* ── HERO ── */}
      <section style={{position:"relative",width:"100%",height:"100vh",minHeight:640,overflow:"hidden"}}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
          style={{position:"absolute",inset:0,width:"100%",height:"100%"}}
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0e0820"/><stop offset="35%" stopColor="#2e1a5a"/>
              <stop offset="68%"  stopColor="#6b3d96"/><stop offset="100%" stopColor="#b86ed4"/>
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="78%" r="40%">
              <stop offset="0%"  stopColor="#ff8c1a" stopOpacity="0.65"/>
              <stop offset="45%" stopColor="#c93080" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#4ab8cc"/><stop offset="50%" stopColor="#2a7a90"/>
              <stop offset="100%" stopColor="#b8ccd8"/>
            </linearGradient>
            <linearGradient id="shimmerG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="transparent"/>
              <stop offset="45%"  stopColor="#ffd060" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="rockLG" x1="0.1" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#ff9a2e"/><stop offset="45%" stopColor="#d0601a"/>
              <stop offset="100%" stopColor="#4a2268"/>
            </linearGradient>
            <linearGradient id="rockRG" x1="0.9" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#ffaa3c"/><stop offset="48%" stopColor="#c05010"/>
              <stop offset="100%" stopColor="#3e1a58"/>
            </linearGradient>
            <linearGradient id="rockCG" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#ff8c20"/><stop offset="55%" stopColor="#b03c0e"/>
              <stop offset="100%" stopColor="#35185a"/>
            </linearGradient>
            <linearGradient id="hillG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5030a0"/><stop offset="100%" stopColor="#2a1450"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="900" fill="url(#skyG)"/>
          <rect width="1440" height="900" fill="url(#sunGlow)"/>
          {[[120,60],[280,42],[390,88],[540,35],[680,55],[820,28],[960,72],[1100,45],[1250,80],[1380,32],[200,110],[760,98],[1320,115],[450,70],[630,48],[1000,90],[1170,62]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={0.8+Math.random()*0.8} fill="white" opacity={0.5+Math.random()*0.4}>
              <animate attributeName="opacity" values={`${0.3};${0.8};${0.3}`} dur={`${2+Math.random()*3}s`} begin={`${Math.random()*4}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          <g opacity="0.55">
            <animateTransform attributeName="transform" type="translate" from="-300 0" to="1800 0" dur="90s" repeatCount="indefinite"/>
            <ellipse cx="380" cy="128" rx="115" ry="42" fill="#e0c0f8" style={{filter:"blur(8px)"}}/>
            <ellipse cx="460" cy="112" rx="78"  ry="30" fill="#f0d8ff" style={{filter:"blur(6px)"}}/>
          </g>
          <g opacity="0.42">
            <animateTransform attributeName="transform" type="translate" from="0 0" to="1900 0" dur="120s" repeatCount="indefinite"/>
            <ellipse cx="900" cy="94" rx="135" ry="40" fill="#f0ceff" style={{filter:"blur(9px)"}}/>
            <ellipse cx="990" cy="78" rx="92"  ry="30" fill="#fce8ff" style={{filter:"blur(7px)"}}/>
          </g>
          <g opacity="0.45">
            <animateTransform attributeName="transform" type="translate" from="-150 0" to="1750 0" dur="75s" begin="-25s" repeatCount="indefinite"/>
            <ellipse cx="640" cy="195" rx="58" ry="18" fill="#ff90c0" style={{filter:"blur(7px)"}}/>
          </g>
          {/* Cliffs */}
          <polygon points="-10,530 55,350 115,285 158,255 205,235 265,208 318,218 356,262 390,318 425,390 452,492 440,610 395,710 -10,710" fill="url(#rockLG)"/>
          <polygon points="158,255 205,235 255,258 285,322 264,408 198,490 145,565 95,605 58,582 78,482 118,378 138,298" fill="rgba(70,20,95,0.38)"/>
          <polygon points="1450,395 1392,308 1342,258 1282,218 1242,212 1182,218 1132,248 1102,288 1082,342 1072,425 1092,535 1125,648 1165,710 1450,710" fill="url(#rockRG)"/>
          <polygon points="1282,218 1242,212 1202,238 1172,298 1192,382 1244,442 1294,382 1315,290" fill="rgba(70,20,95,0.38)"/>
          <polygon points="545,510 598,422 650,368 712,328 762,308 815,308 875,332 924,382 965,438 995,518 982,610 955,710 548,710" fill="url(#rockCG)"/>
          <polygon points="-10,585 95,532 195,512 348,502 502,525 655,565 722,572 802,562 955,532 1105,512 1255,524 1385,538 1450,555 1450,710 -10,710" fill="url(#hillG)" opacity="0.92"/>
          <rect x="-10" y="580" width="1460" height="88" fill="rgba(22,8,48,0.55)"/>
          {/* Trees */}
          <g fill="#180840" opacity="0.94">
            {[[-10,710,38,568],[42,710,94,532],[125,710,180,518],[212,710,268,506],[582,710,624,538],[642,710,685,525],[702,710,745,515],[762,710,805,532],[1102,710,1154,508],[1182,710,1236,522],[1268,710,1320,538],[1354,710,1405,555]].map(([x1,y1,x2,y2],i)=>(
              <polygon key={`f${i}`} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
            {[[118,652,142,538],[153,648,178,522],[198,654,226,518],[248,644,276,515],[295,650,324,512],[342,647,370,520],[1058,648,1083,520],[1104,653,1130,512],[1155,644,1182,515],[1200,650,1228,518]].map(([x1,y1,x2,y2],i)=>(
              <polygon key={`m${i}`} points={`${x1},${y1} ${(x1+x2)/2},${y2} ${x2},${y1}`}/>
            ))}
          </g>
          {/* Palms */}
          <g transform="translate(88,572)" fill="#140832" opacity="0.92">
            <path d="M0,128 Q-4,85 -7,42 Q-5,10 0,-12 Q5,10 7,42 Q4,85 0,128"/>
            <path d="M0,-12 Q-42,-36 -72,-22 Q-46,-16 -20,2 Z"/><path d="M0,-12 Q-52,-18 -68,14 Q-40,5 -14,8 Z"/>
            <path d="M0,-12 Q-32,14 -46,40 Q-20,20 -5,16 Z"/><path d="M0,-12 Q42,-36 72,-22 Q46,-16 20,2 Z"/>
            <path d="M0,-12 Q52,-18 68,14 Q40,5 14,8 Z"/><path d="M0,-12 Q32,14 46,40 Q20,20 5,16 Z"/>
          </g>
          <g transform="translate(1352,568)" fill="#140832" opacity="0.92">
            <path d="M0,132 Q4,88 6,40 Q4,8 0,-14 Q-4,8 -6,40 Q-4,88 0,132"/>
            <path d="M0,-14 Q-40,-38 -70,-24 Q-44,-18 -18,0 Z"/><path d="M0,-14 Q-50,-20 -66,12 Q-38,4 -12,6 Z"/>
            <path d="M0,-14 Q-30,12 -44,38 Q-18,18 -4,14 Z"/><path d="M0,-14 Q40,-38 70,-24 Q44,-18 18,0 Z"/>
            <path d="M0,-14 Q50,-20 66,12 Q38,4 12,6 Z"/><path d="M0,-14 Q30,12 44,38 Q18,18 4,14 Z"/>
          </g>
          {/* Water */}
          <polygon points="-10,742 1450,722 1450,900 -10,900" fill="url(#waterG)"/>
          <rect x="280" y="748" width="590" height="16" rx="8" fill="url(#shimmerG)" opacity="0.65">
            <animate attributeName="opacity" values="0.35;0.75;0.35" dur="3.2s" repeatCount="indefinite"/>
          </rect>
          <rect x="540" y="762" width="420" height="10" rx="5" fill="#ffcc44" opacity="0.42">
            <animate attributeName="opacity" values="0.25;0.55;0.25" dur="2.8s" begin="0.8s" repeatCount="indefinite"/>
          </rect>
          <polygon points="-10,882 400,848 700,836 1000,844 1305,854 1450,862 1450,900 -10,900" fill="#ccdce8" opacity="0.48"/>
          {/* Fireflies */}
          {fireflies.map((f,i)=><Firefly key={i} {...f}/>)}
          <ellipse cx="720" cy="685" rx="400" ry="42" fill="rgba(255,118,18,0.14)">
            <animate attributeName="ry" values="36;48;36" dur="5.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.08;0.18;0.08" dur="5.5s" repeatCount="indefinite"/>
          </ellipse>
        </svg>

        {/* HERO CONTENT */}
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"20px",zIndex:20,paddingTop:80}}>
          <div style={{width:88,height:88,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(10px)",border:"2px solid rgba(255,184,60,0.4)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18,animation:"pulse 3s ease-in-out infinite"}}>
            <svg width="48" height="56" viewBox="0 0 52 60" fill="none">
              <path d="M26 4C26 4 17 15 17 25C17 31 21 35 26 37C31 35 35 31 35 25C35 15 26 4 26 4Z" fill="#ffb83c"/>
              <line x1="26" y1="37" x2="26" y2="56" stroke="#ffb83c" strokeWidth="3" strokeLinecap="round"/>
              <line x1="18" y1="46" x2="34" y2="46" stroke="#ffb83c" strokeWidth="3" strokeLinecap="round"/>
              <path d="M9 31C9 31 3 27 5 20C7 13 14 13 18 18" stroke="#ffb83c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M43 31C43 31 49 27 47 20C45 13 38 13 34 18" stroke="#ffb83c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="26" cy="24" r="4" fill="#fff8e8"/>
            </svg>
          </div>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(11px,1.4vw,13px)",fontWeight:600,letterSpacing:5,textTransform:"uppercase",color:"#ffd87a",marginBottom:10,animation:"fadeUp 0.8s 0.3s both"}}>Central Florida · Boy Scouts of America</p>
          <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(48px,9vw,108px)",fontWeight:700,color:"#fff",lineHeight:0.95,letterSpacing:"-2px",textShadow:"0 4px 40px rgba(0,0,0,0.55)",animation:"fadeUp 0.9s 0.5s both"}}>
            TROOP <span style={{color:"#ffb83c",display:"block"}}>242</span>
          </h1>
          <p style={{fontSize:"clamp(13px,1.6vw,16px)",color:"rgba(255,255,255,0.72)",marginTop:14,letterSpacing:1,maxWidth:480,lineHeight:1.7,animation:"fadeUp 1s 0.75s both"}}>
            Adventure. Brotherhood. Service.<br/>Building tomorrow's leaders — one campfire at a time.
          </p>
          <div style={{display:"flex",gap:14,marginTop:28,animation:"fadeUp 1s 0.95s both"}}>
            <button style={{padding:"13px 32px",borderRadius:50,background:"linear-gradient(135deg,#ffb83c,#ff8c1a)",color:"#1a0800",border:"none",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:600,letterSpacing:2,textTransform:"uppercase",boxShadow:"0 6px 24px rgba(255,140,26,0.45)",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
            >Join Our Troop</button>
            <button style={{padding:"13px 32px",borderRadius:50,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(12px)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.35)",cursor:"pointer",fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:600,letterSpacing:2,textTransform:"uppercase",transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
            >View Events</button>
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",zIndex:25,display:"flex",flexDirection:"column",alignItems:"center",gap:6,animation:"fadeUp 1s 1.5s both"}}>
          <div style={{width:22,height:36,border:"2px solid rgba(255,255,255,0.35)",borderRadius:11,display:"flex",justifyContent:"center",paddingTop:6}}>
            <div style={{width:3,height:7,background:"rgba(255,255,255,0.55)",borderRadius:2,animation:"scrollDot 1.6s ease-in-out infinite"}}/>
          </div>
          <span style={{fontSize:9,letterSpacing:3,color:"rgba(255,255,255,0.4)",textTransform:"uppercase"}}>Scroll</span>
        </div>
        <style>{`
          @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{box-shadow:0 0 24px rgba(255,184,60,0.22);transform:scale(1)}50%{box-shadow:0 0 44px rgba(255,184,60,0.48);transform:scale(1.06)}}
          @keyframes scrollDot{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(10px)}}
        `}</style>
      </section>

      {/* ── SPRING CAMPOUT FEATURE SECTION ── */}
      <section style={{background:"#0a0618",borderTop:"1px solid rgba(255,184,60,0.1)",padding:"80px 32px 60px",display:"flex",flexDirection:"column",alignItems:"center"}}>

        {/* EYEBROW */}
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#ffb83c"}}>Featured Event</p>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
        </div>

        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:6,textAlign:"center",letterSpacing:1}}>
          🏕️ Spring Campout
        </h2>
        <p style={{color:"rgba(255,255,255,0.45)",fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>
          📍 Key West, Florida Keys · April 18, 2026
        </p>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:15,maxWidth:560,textAlign:"center",lineHeight:1.7,marginBottom:48}}>
          Pack your gear and join Troop 242 for an unforgettable overnight adventure among the mangroves and crystal-clear waters of Key West. Fishing, kayaking, stargazing, and campfire stories await.
        </p>

        {/* COUNTDOWN */}
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:16}}>Countdown to Departure</p>
        <div style={{display:"flex",gap:12,marginBottom:56}}>
          <CountdownBox val={countdown.d} label="Days"/>
          <CountdownBox val={countdown.h} label="Hours"/>
          <CountdownBox val={countdown.m} label="Mins"/>
          <CountdownBox val={countdown.s} label="Secs"/>
        </div>

        {/* CAMPFIRE ILLUSTRATION */}
        <div style={{
          width:"100%", maxWidth:900,
          background:"#08041a",
          borderRadius:24,
          border:"1px solid rgba(255,184,60,0.12)",
          overflow:"hidden",
          boxShadow:"0 0 80px rgba(255,100,20,0.12), 0 32px 80px rgba(0,0,0,0.6)",
          marginBottom:40,
          position:"relative",
        }}>
          {/* Gradient overlay at bottom */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:48,background:"linear-gradient(to top,#08041a,transparent)",zIndex:2,pointerEvents:"none"}}/>
          <CampfireScene/>
        </div>

        {/* EVENT DETAILS CARDS */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginBottom:56}}>
          {[
            {icon:"🎣",label:"Fishing",desc:"Florida Keys deep sea experience"},
            {icon:"🛶",label:"Kayaking",desc:"Mangrove tunnel exploration"},
            {icon:"⭐",label:"Stargazing",desc:"Merit badge astronomy night"},
            {icon:"🔥",label:"Campfire",desc:"S'mores & scout stories"},
          ].map(c=>(
            <div key={c.label} style={{
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:16, padding:"20px 24px",
              display:"flex",flexDirection:"column",alignItems:"center",gap:8,
              minWidth:130,
              transition:"all 0.2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,184,60,0.08)";e.currentTarget.style.borderColor="rgba(255,184,60,0.25)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}
            >
              <span style={{fontSize:28}}>{c.icon}</span>
              <span style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:600,color:"#fff",letterSpacing:1}}>{c.label}</span>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.4)",textAlign:"center",lineHeight:1.4}}>{c.desc}</span>
            </div>
          ))}
        </div>

        {/* REGISTER BTN */}
        <button style={{
          padding:"15px 48px",borderRadius:50,
          background:"linear-gradient(135deg,#ffb83c,#ff7c14)",
          color:"#1a0800",border:"none",cursor:"pointer",
          fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,
          letterSpacing:3,textTransform:"uppercase",
          boxShadow:"0 8px 32px rgba(255,140,20,0.4)",
          transition:"all 0.25s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(255,140,20,0.55)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 32px rgba(255,140,20,0.4)";}}
        >Register for Campout →</button>
      </section>

      {/* ── OTHER EVENTS ── */}
      <section style={{background:"#0e0820",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"60px 32px 80px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:32}}>More Upcoming Events</p>
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",marginBottom:56}}>
          {EVENTS.map((e,i)=>(
            <button key={i} onClick={()=>setActiveEvent(i)} style={{
              padding:"12px 28px",borderRadius:50,cursor:"pointer",
              fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",
              border: i===activeEvent?"1.5px solid #ffb83c":"1.5px solid rgba(255,255,255,0.18)",
              background: i===activeEvent?"rgba(255,184,60,0.12)":"transparent",
              color: i===activeEvent?"#ffb83c":"rgba(255,255,255,0.5)",
              transition:"all 0.25s",
            }}>{e.name}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:48,flexWrap:"wrap",justifyContent:"center",borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:48}}>
          {[["48","Active Scouts"],["12","Eagle Scouts"],["30+","Years Active"],["200+","Merit Badges"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:44,fontWeight:700,color:"#ffb83c",lineHeight:1,textShadow:"0 0 24px rgba(255,184,60,0.3)"}}>{n}</div>
              <div style={{fontSize:11,letterSpacing:3,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",marginTop:6}}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RANK PROGRESSION ── */}
      <section style={{background:"#0a0618",borderTop:"1px solid rgba(255,184,60,0.1)",padding:"80px 32px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#ffb83c"}}>Scout Ranks</p>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
        </div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:32,textAlign:"center"}}>
          Progress Your Scouting Journey
        </h2>

        <div style={{width:"100%",maxWidth:1000,overflowX:"auto",paddingBottom:20,marginBottom:48}}>
          <div style={{display:"flex",gap:20,justifyContent:"space-between",minWidth:800,paddingX:16}}>
            {[
              {icon:"🦅",rank:"Scout",emoji:"👦"},
              {icon:"🔥",rank:"Tenderfoot",emoji:"👨"},
              {icon:"⛺",rank:"2nd Class",emoji:"🚴"},
              {icon:"🧭",rank:"1st Class",emoji:"🏕️"},
              {icon:"⭐",rank:"Star",emoji:"🌟"},
              {icon:"🎖️",rank:"Life",emoji:"👨‍💼"},
              {icon:"🦅",rank:"Eagle",emoji:"🏆"},
            ].map((item,i)=>(
              <div key={i} style={{
                display:"flex",flexDirection:"column",alignItems:"center",gap:12,
                background:"rgba(255,184,60,0.08)",border:"1px solid rgba(255,184,60,0.3)",
                borderRadius:16,padding:24,minWidth:140,
                transition:"all 0.3s",
              }}>
                <div style={{
                  width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,184,60,0.4),rgba(255,100,20,0.2))",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,
                  border:"2px solid rgba(255,184,60,0.5)",
                }}>
                  {item.emoji}
                </div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:600,color:"#ffb83c",letterSpacing:1}}>{item.rank}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,textAlign:"center",maxWidth:560,lineHeight:1.7}}>
          Each rank builds leadership, outdoor skills, and community service. Scouts advance through requirements, merit badges, and personal growth — earning recognition at every milestone.
        </p>
      </section>

      {/* ── MERIT BADGES TIMELINE ── */}
      <section style={{background:"#0e0820",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"80px 32px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:48,textAlign:"center"}}>
          Merit Badges Earned
        </h2>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:24,width:"100%",maxWidth:1000,marginBottom:48}}>
          {[
            {year:"2025",count:47,color:"#ffb83c"},
            {year:"2024",count:54,color:"#ff8c1a"},
            {year:"2023",count:42,color:"#ff6600"},
            {year:"2022",count:38,color:"#cc5500"},
          ].map((item,i)=>(
            <div key={i} style={{
              background:"linear-gradient(135deg,rgba(255,184,60,0.1),rgba(255,100,20,0.05))",
              border:"1px solid rgba(255,184,60,0.25)",
              borderRadius:16,padding:28,textAlign:"center",
              transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(255,184,60,0.15),rgba(255,100,20,0.1))";e.currentTarget.style.borderColor="rgba(255,184,60,0.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(255,184,60,0.1),rgba(255,100,20,0.05))";e.currentTarget.style.borderColor="rgba(255,184,60,0.25)";}}
            >
              <div style={{fontSize:32,marginBottom:12}}>🏅</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:"rgba(255,255,255,0.5)",letterSpacing:2,marginBottom:8}}>YEAR</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:700,color:item.color,marginBottom:12}}>{item.year}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:600,color:"#fff"}}>{item.count}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:6}}>Badges Earned</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EAGLE SCOUTS ── */}
      <section style={{background:"#0a0618",borderTop:"1px solid rgba(255,184,60,0.1)",padding:"80px 32px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
          <p style={{fontFamily:"'Oswald',sans-serif",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"#ffb83c"}}>Hall of Honor</p>
          <div style={{height:1,width:48,background:"rgba(255,184,60,0.4)"}}/>
        </div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:12,textAlign:"center"}}>
          🦅 Eagle Scouts
        </h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:48,textAlign:"center"}}>Scouts who reached the highest rank</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:20,width:"100%",maxWidth:900}}>
          {[
            {name:"Marcus Johnson",year:"2024"},
            {name:"Tyler Rodriguez",year:"2023"},
            {name:"Joshua Chen",year:"2023"},
            {name:"Brandon Lee",year:"2022"},
            {name:"Nathan Williams",year:"2022"},
            {name:"David Martinez",year:"2021"},
            {name:"Christopher Hall",year:"2021"},
            {name:"Matthew Thompson",year:"2020"},
            {name:"Andrew Jackson",year:"2020"},
            {name:"Kevin Davis",year:"2019"},
            {name:"Ryan Murphy",year:"2019"},
            {name:"Justin Harris",year:"2018"},
          ].map((eagle,i)=>(
            <div key={i} style={{
              background:"rgba(255,184,60,0.08)",border:"1px solid rgba(255,184,60,0.3)",
              borderRadius:12,padding:20,textAlign:"center",
              transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,184,60,0.15)";e.currentTarget.style.borderColor="rgba(255,184,60,0.5)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,184,60,0.08)";e.currentTarget.style.borderColor="rgba(255,184,60,0.3)";e.currentTarget.style.transform="translateY(0)";}}
            >
              <div style={{fontSize:28,marginBottom:8}}>🦅</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:600,color:"#fff",marginBottom:6}}>{eagle.name}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{eagle.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADULT LEADERS ── */}
      <section style={{background:"#0e0820",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"80px 32px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:12,textAlign:"center"}}>
          🎯 Leadership Team
        </h2>
        <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,marginBottom:48,textAlign:"center"}}>Dedicated adults mentoring the next generation of leaders</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:24,width:"100%",maxWidth:1000}}>
          {[
            {name:"Robert Schmidt",role:"Scoutmaster",icon:"👨‍🏫"},
            {name:"Jennifer Davis",role:"Assistant Scoutmaster",icon:"👩‍🏫"},
            {name:"Michael Torres",role:"Advancement Chair",icon:"📚"},
            {name:"Sarah Johnson",role:"Outdoor Skills",icon:"🏕️"},
            {name:"David Park",role:"Activities Lead",icon:"⛺"},
            {name:"Lisa Anderson",role:"Troop Coordinator",icon:"📋"},
          ].map((leader,i)=>(
            <div key={i} style={{
              background:"linear-gradient(135deg,rgba(255,100,20,0.15),rgba(255,184,60,0.08))",
              border:"1px solid rgba(255,184,60,0.25)",
              borderRadius:16,padding:28,textAlign:"center",
              transition:"all 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(255,100,20,0.25),rgba(255,184,60,0.15))";e.currentTarget.style.borderColor="rgba(255,184,60,0.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,rgba(255,100,20,0.15),rgba(255,184,60,0.08))";e.currentTarget.style.borderColor="rgba(255,184,60,0.25)";}}
            >
              <div style={{fontSize:40,marginBottom:12}}>{leader.icon}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:600,color:"#fff",marginBottom:6}}>{leader.name}</div>
              <div style={{fontSize:12,color:"#ffb83c",letterSpacing:1,textTransform:"uppercase"}}>{leader.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOIN US FORM ── */}
      <section style={{background:"linear-gradient(135deg,rgba(255,184,60,0.12),rgba(255,100,20,0.06))",borderTop:"1px solid rgba(255,184,60,0.2)",borderBottom:"1px solid rgba(255,184,60,0.2)",padding:"80px 32px",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:"clamp(30px,5vw,52px)",fontWeight:700,color:"#fff",marginBottom:12,textAlign:"center"}}>
          Ready to Join Us?
        </h2>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:14,marginBottom:48,textAlign:"center",maxWidth:560}}>
          Weekly meetings every Tuesday at 7:00 PM in Sanford, FL. Get in touch to learn more about Troop 242.
        </p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:24,width:"100%",maxWidth:900,marginBottom:48}}>
          {[
            {icon:"📧",label:"Email Us",value:"troop242sanford@gmail.com"},
            {icon:"📍",label:"Meeting Location",value:"Sanford, FL • Central Florida"},
            {icon:"🕖",label:"Meeting Time",value:"Tuesday 7:00 PM"},
          ].map((item,i)=>(
            <div key={i} style={{
              background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,184,60,0.25)",
              borderRadius:16,padding:24,textAlign:"center",
            }}>
              <div style={{fontSize:32,marginBottom:12}}>{item.icon}</div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:"rgba(255,255,255,0.5)",letterSpacing:1,marginBottom:6,textTransform:"uppercase"}}>
                {item.label}
              </div>
              <div style={{fontSize:14,color:"#fff",fontWeight:600}}>{item.value}</div>
            </div>
          ))}
        </div>

        <button style={{
          padding:"15px 48px",borderRadius:50,
          background:"linear-gradient(135deg,#ffb83c,#ff7c14)",
          color:"#1a0800",border:"none",cursor:"pointer",
          fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:700,
          letterSpacing:3,textTransform:"uppercase",
          boxShadow:"0 8px 32px rgba(255,140,20,0.4)",
          transition:"all 0.25s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(255,140,20,0.55)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 32px rgba(255,140,20,0.4)";}}
        >Contact Us Today →</button>
      </section>
    </div>
      <Footer />
    </>
  );
}
