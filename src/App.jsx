import { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// Custom SVG Icons Component to keep code self-contained and clean
const Icons = {
  Home: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  Analytics: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Safety: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Devices: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ShieldAlert: () => (
    <svg className="w-8 h-8 text-red-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Central: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Control: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  )
};

// Floating Particles background component
function BackgroundParticles() {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 2}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 10 + 6}s`,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map(p => (
        <span 
          key={p.id}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0) 70%)',
            borderRadius: '50%',
            animation: 'floatParticle 12s infinite linear',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        />
      ))}
    </div>
  );
}

// Render LPG Cylinder SVG Component with wave/level animation and state-based colors
function LPGCylinder({ level, status }) {
  const isEmergency = status === 'danger';
  const glowClass = isEmergency ? 'animate-pulse-glow-danger' : 'animate-pulse-glow';
  const themeColor = isEmergency ? '#EF4444' : '#06B6D4';

  return (
    <div className="relative flex items-center justify-center p-6 select-none w-full max-w-[360px]">
      
      {/* Telemetry Rings Layer 1 (behind cylinder) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
        <svg width="340" height="400" viewBox="0 0 340 400" className="absolute overflow-visible">
          {/* Ring 1 */}
          <ellipse 
            cx="170" cy="180" rx="120" ry="24" 
            fill="none" 
            stroke="url(#ring-grad-1)" 
            strokeWidth="1.5" 
            strokeDasharray="6 8"
            className="animate-telemetry-ring-1" 
          />
          {/* Ring 2 */}
          <ellipse 
            cx="170" cy="205" rx="140" ry="28" 
            fill="none" 
            stroke="url(#ring-grad-2)" 
            strokeWidth="1" 
            strokeDasharray="4 12"
            className="animate-telemetry-ring-2" 
          />
          
          <defs>
            <linearGradient id="ring-grad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ring-grad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
              <stop offset="50%" stopColor={themeColor} stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* SVG Cylinder */}
      <svg width="240" height="320" viewBox="0 0 260 340" className={`relative overflow-visible ${glowClass}`}>
        <defs>
          {/* 3D Cylinder Body Metallic Shading */}
          <linearGradient id="cylinder-3d-shading" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0A0F1D" />
            <stop offset="15%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="65%" stopColor="#334155" />
            <stop offset="85%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>

          {/* Core Level fluid indicators */}
          <linearGradient id="fluid-level-safe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#2563EB" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.95} />
          </linearGradient>
          
          <linearGradient id="fluid-level-warning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
            <stop offset="60%" stopColor="#D97706" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#92400E" stopOpacity={0.95} />
          </linearGradient>
          
          <linearGradient id="fluid-level-danger" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
            <stop offset="60%" stopColor="#DC2626" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#991B1B" stopOpacity={1} />
          </linearGradient>

          {/* Fluid mask matching the inner chamber display window */}
          <mask id="chamber-window-mask">
            <rect x="105" y="100" width="50" height="180" rx="6" fill="white" />
          </mask>

          {/* Ambient drop shadow */}
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Cylinder Handle Collar (Premium 3D Curved) */}
        <path d="M75,70 C75,25 185,25 185,70" fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" filter="url(#shadow)" />
        <path d="M75,70 C75,30 185,30 185,70" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        
        {/* Support braces for collar */}
        <path d="M100,50 L100,70" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <path d="M160,50 L160,70" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
        <path d="M100,50 L100,70" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <path d="M160,50 L160,70" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

        {/* Smart Valve Assembly */}
        <rect x="120" y="42" width="20" height="28" rx="2" fill="#94A3B8" />
        <rect x="123" y="45" width="14" height="22" rx="1" fill="#475569" />
        <circle cx="130" cy="38" r="12" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        <circle cx="130" cy="38" r="4" fill="#F59E0B" />
        <rect x="122" y="28" width="16" height="5" rx="1" fill="#1E293B" />

        {/* Main 3D Cylinder Shell */}
        <rect x="50" y="70" width="160" height="230" rx="36" fill="url(#cylinder-3d-shading)" stroke="#334155" strokeWidth="2" filter="url(#shadow)" />
        
        {/* Sleek Horizontal Metal Ridges */}
        <path d="M 52,130 Q 130,140 208,130" fill="none" stroke="#1E293B" strokeWidth="3" opacity="0.6" />
        <path d="M 52,130 Q 130,140 208,130" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.2" />

        <path d="M 52,220 Q 130,230 208,220" fill="none" stroke="#1E293B" strokeWidth="3" opacity="0.6" />
        <path d="M 52,220 Q 130,230 208,220" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.2" />

        {/* Level Indicator Glass Window Core */}
        <rect x="102" y="97" width="56" height="186" rx="9" fill="#0A0F1D" stroke="#334155" strokeWidth="2" />
        <rect x="105" y="100" width="50" height="180" rx="6" fill="#020617" />
        
        {/* Dynamic Glowing Fluid level representation */}
        <rect 
          x="105" 
          y={280 - (180 * level / 100)} 
          width="50" 
          height={180 * level / 100} 
          fill={`url(#fluid-level-${status === 'safe' ? 'safe' : (status === 'warning' ? 'warning' : 'danger')})`} 
          mask="url(#chamber-window-mask)" 
          className="transition-all duration-1000 ease-in-out"
        />

        {/* Subtle glass reflection overlay on the window */}
        <rect x="105" y="100" width="12" height="180" rx="0" fill="#FFFFFF" opacity="0.04" />
        <line x1="105" y1="100" x2="105" y2="280" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />

        {/* Measurement dashes on glass side */}
        <line x1="148" y1="118" x2="152" y2="118" stroke="#64748B" strokeWidth="1.5" />
        <line x1="148" y1="136" x2="152" y2="136" stroke="#64748B" strokeWidth="1.5" />
        <line x1="145" y1="154" x2="152" y2="154" stroke="#64748B" strokeWidth="2" />
        <line x1="148" y1="172" x2="152" y2="172" stroke="#64748B" strokeWidth="1.5" />
        <line x1="148" y1="190" x2="152" y2="190" stroke="#64748B" strokeWidth="1.5" />
        <line x1="145" y1="208" x2="152" y2="208" stroke="#64748B" strokeWidth="2" />
        <line x1="148" y1="226" x2="152" y2="226" stroke="#64748B" strokeWidth="1.5" />
        <line x1="148" y1="244" x2="152" y2="244" stroke="#64748B" strokeWidth="1.5" />
        <line x1="145" y1="262" x2="152" y2="262" stroke="#64748B" strokeWidth="2" />

        {/* Specular and shadow overlay on outer shell */}
        <rect x="54" y="74" width="10" height="222" rx="5" fill="#FFFFFF" opacity="0.05" />
        <rect x="196" y="74" width="10" height="222" rx="5" fill="#000000" opacity="0.2" />

        {/* Cylinder Bottom Rim Base */}
        <rect x="70" y="295" width="120" height="18" rx="6" fill="url(#cylinder-3d-shading)" stroke="#334155" strokeWidth="2" filter="url(#shadow)" />
        <rect x="75" y="297" width="110" height="6" fill="#020617" opacity="0.5" />

        {/* Dotted Node Connector Laser Lines */}
        {/* Line 1: MQ-2 Gas Node (Top) to Left */}
        <path d="M 130,55 L 20,40" stroke={isEmergency ? '#EF4444' : '#06B6D4'} strokeWidth="1" strokeDasharray="3, 3" opacity="0.6" />
        {/* Line 2: Temperature Node (Middle) to Right */}
        <path d="M 70,180 L 240,160" stroke="#2563EB" strokeWidth="1" strokeDasharray="3, 3" opacity="0.6" />
        {/* Line 3: Weight Node (Bottom) to Left */}
        <path d="M 130,305 L 20,320" stroke="#22C55E" strokeWidth="1" strokeDasharray="3, 3" opacity="0.6" />

        {/* Glowing IoT Sensor Nodes */}
        {/* Node 1: Gas Sensor MQ-2 (Valve Area) */}
        <g>
          <circle cx="130" cy="55" r="8" fill={isEmergency ? '#EF4444' : '#06B6D4'} fillOpacity="0.25" />
          <circle cx="130" cy="55" r="15" fill="none" stroke={isEmergency ? '#EF4444' : '#06B6D4'} className="animate-sensor-pulse" />
          <circle cx="130" cy="55" r="4" fill={isEmergency ? '#EF4444' : '#06B6D4'} />
        </g>

        {/* Node 2: Temperature Sensor MCU (Middle Side) */}
        <g>
          <circle cx="70" cy="180" r="8" fill="#2563EB" fillOpacity="0.25" />
          <circle cx="70" cy="180" r="15" fill="none" stroke="#2563EB" className="animate-sensor-pulse" />
          <circle cx="70" cy="180" r="4" fill="#2563EB" />
        </g>

        {/* Node 3: Load Cell Weight Sensor (Bottom Rim Area) */}
        <g>
          <circle cx="130" cy="305" r="8" fill="#22C55E" fillOpacity="0.25" />
          <circle cx="130" cy="305" r="15" fill="none" stroke="#22C55E" className="animate-sensor-pulse" />
          <circle cx="130" cy="305" r="4" fill="#22C55E" />
        </g>
      </svg>

      {/* Floating Metric Card 1: MQ-2 (Top-Left) */}
      <div className="absolute top-[20px] left-[-20px] sm:left-[-10px] animate-float-1 glass-card p-2 rounded-lg border border-[#06B6D4]/30 shadow-lg max-w-[110px] text-left">
        <p className="text-[7px] text-[#06B6D4] font-bold uppercase tracking-wider">MQ-2 SENSOR</p>
        <p className="text-[10px] font-bold text-white">Gas Density</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`w-1 h-1 rounded-full ${isEmergency ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
          <span className="text-[7px] text-slate-400">Live Telemetry</span>
        </div>
      </div>

      {/* Floating Metric Card 2: Temperature (Middle-Right) */}
      <div className="absolute top-[135px] right-[-20px] sm:right-[-10px] animate-float-2 glass-card p-2 rounded-lg border border-blue-500/30 shadow-lg max-w-[110px] text-left">
        <p className="text-[7px] text-blue-400 font-bold uppercase tracking-wider">TEMP NODE</p>
        <p className="text-[10px] font-bold text-white">MCU Core Temp</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-1 h-1 rounded-full bg-emerald-500" />
          <span className="text-[7px] text-slate-400">Calibrated ✅</span>
        </div>
      </div>

      {/* Floating Metric Card 3: Weight Load Cell (Bottom-Left) */}
      <div className="absolute bottom-[10px] left-[-20px] sm:left-[-10px] animate-float-3 glass-card p-2 rounded-lg border border-[#22C55E]/30 shadow-lg max-w-[110px] text-left">
        <p className="text-[7px] text-emerald-400 font-bold uppercase tracking-wider">LOAD CELL</p>
        <p className="text-[10px] font-bold text-white">Precise Weight</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[7px] text-slate-400">Syncing Load</span>
        </div>
      </div>

    </div>
  );
}

const INITIAL_CYLINDERS = [
  // Hotel Chennai (8 cylinders)
  { id: 'LPG-MAA-01', hotel: 'Hotel Chennai', location: 'Kitchen A', gasLevel: 75.2, weight: 10.8, temperature: 28.1, humidity: 55, ppm: 175, smoke: 12, battery: 92, wifiSignal: -44, leakRisk: 8, remainingDays: 19, status: 'safe' },
  { id: 'LPG-MAA-02', hotel: 'Hotel Chennai', location: 'Kitchen A', gasLevel: 68.4, weight: 9.8, temperature: 27.9, humidity: 56, ppm: 180, smoke: 14, battery: 89, wifiSignal: -48, leakRisk: 10, remainingDays: 17, status: 'safe' },
  { id: 'LPG-MAA-03', hotel: 'Hotel Chennai', location: 'Kitchen B', gasLevel: 72.1, weight: 10.4, temperature: 28.5, humidity: 54, ppm: 172, smoke: 11, battery: 95, wifiSignal: -42, leakRisk: 7, remainingDays: 18, status: 'safe' },
  { id: 'LPG-MAA-04', hotel: 'Hotel Chennai', location: 'Restaurant', gasLevel: 82.5, weight: 11.9, temperature: 26.8, humidity: 50, ppm: 165, smoke: 8, battery: 91, wifiSignal: -52, leakRisk: 5, remainingDays: 22, status: 'safe' },
  { id: 'LPG-MAA-05', hotel: 'Hotel Chennai', location: 'Bakery', gasLevel: 15.4, weight: 2.2, temperature: 29.4, humidity: 58, ppm: 190, smoke: 15, battery: 84, wifiSignal: -50, leakRisk: 12, remainingDays: 3, status: 'low_gas' },
  { id: 'LPG-MAA-06', hotel: 'Hotel Chennai', location: 'Food Court', gasLevel: 70.0, weight: 10.1, temperature: 27.2, humidity: 52, ppm: 176, smoke: 10, battery: 88, wifiSignal: -46, leakRisk: 9, remainingDays: 18, status: 'safe' },
  { id: 'LPG-MAA-07', hotel: 'Hotel Chennai', location: 'Outdoor Kitchen', gasLevel: 64.2, weight: 9.2, temperature: 31.2, humidity: 62, ppm: 195, smoke: 18, battery: 90, wifiSignal: -58, leakRisk: 14, remainingDays: 16, status: 'safe' },
  { id: 'LPG-MAA-08', hotel: 'Hotel Chennai', location: 'Storage Room', gasLevel: 89.0, weight: 12.8, temperature: 25.4, humidity: 48, ppm: 155, smoke: 5, battery: 97, wifiSignal: -38, leakRisk: 3, remainingDays: 24, status: 'safe' },

  // Hotel Bangalore (8 cylinders)
  { id: 'LPG-BLR-01', hotel: 'Hotel Bangalore', location: 'Kitchen A', gasLevel: 71.5, weight: 10.3, temperature: 24.2, humidity: 60, ppm: 160, smoke: 9, battery: 93, wifiSignal: -45, leakRisk: 6, remainingDays: 18, status: 'safe' },
  { id: 'LPG-BLR-02', hotel: 'Hotel Bangalore', location: 'Kitchen B', gasLevel: 78.0, weight: 11.2, temperature: 24.5, humidity: 61, ppm: 162, smoke: 11, battery: 94, wifiSignal: -47, leakRisk: 7, remainingDays: 20, status: 'safe' },
  { id: 'LPG-BLR-03', hotel: 'Hotel Bangalore', location: 'Restaurant', gasLevel: 69.8, weight: 10.0, temperature: 23.8, humidity: 58, ppm: 158, smoke: 7, battery: 87, wifiSignal: -51, leakRisk: 5, remainingDays: 18, status: 'safe' },
  { id: 'LPG-BLR-04', hotel: 'Hotel Bangalore', location: 'Bakery', gasLevel: 73.4, weight: 10.6, temperature: 25.1, humidity: 63, ppm: 170, smoke: 13, battery: 90, wifiSignal: -49, leakRisk: 8, remainingDays: 19, status: 'safe' },
  { id: 'LPG-BLR-05', hotel: 'Hotel Bangalore', location: 'Food Court', gasLevel: 12.8, weight: 1.8, temperature: 25.5, humidity: 64, ppm: 182, smoke: 14, battery: 85, wifiSignal: -53, leakRisk: 11, remainingDays: 2, status: 'low_gas' },
  { id: 'LPG-BLR-06', hotel: 'Hotel Bangalore', location: 'Outdoor Kitchen', gasLevel: 67.5, weight: 9.7, temperature: 26.8, humidity: 68, ppm: 178, smoke: 16, battery: 88, wifiSignal: -55, leakRisk: 13, remainingDays: 17, status: 'safe' },
  { id: 'LPG-BLR-07', hotel: 'Hotel Bangalore', location: 'Storage Room', gasLevel: 84.1, weight: 12.1, temperature: 22.9, humidity: 55, ppm: 150, smoke: 6, battery: 96, wifiSignal: -40, leakRisk: 4, remainingDays: 23, status: 'safe' },
  { id: 'LPG-BLR-08', hotel: 'Hotel Bangalore', location: 'Kitchen A', gasLevel: 76.3, weight: 11.0, temperature: 24.1, humidity: 59, ppm: 164, smoke: 10, battery: 91, wifiSignal: -44, leakRisk: 7, remainingDays: 19, status: 'safe' },

  // Hotel Hyderabad (8 cylinders)
  { id: 'LPG-HYD-01', hotel: 'Hotel Hyderabad', location: 'Kitchen A', gasLevel: 74.5, weight: 10.7, temperature: 29.5, humidity: 50, ppm: 182, smoke: 13, battery: 91, wifiSignal: -46, leakRisk: 9, remainingDays: 19, status: 'safe' },
  { id: 'LPG-HYD-02', hotel: 'Hotel Hyderabad', location: 'Kitchen B', gasLevel: 66.2, weight: 9.5, temperature: 29.8, humidity: 52, ppm: 188, smoke: 15, battery: 86, wifiSignal: -50, leakRisk: 11, remainingDays: 17, status: 'safe' },
  { id: 'LPG-HYD-03', hotel: 'Hotel Hyderabad', location: 'Restaurant', gasLevel: 73.0, weight: 10.5, temperature: 28.7, humidity: 48, ppm: 174, smoke: 10, battery: 92, wifiSignal: -48, leakRisk: 8, remainingDays: 18, status: 'safe' },
  { id: 'LPG-HYD-04', hotel: 'Hotel Hyderabad', location: 'Bakery', gasLevel: 80.1, weight: 11.5, temperature: 30.2, humidity: 54, ppm: 185, smoke: 14, battery: 89, wifiSignal: -52, leakRisk: 10, remainingDays: 21, status: 'safe' },
  { id: 'LPG-HYD-05', hotel: 'Hotel Hyderabad', location: 'Food Court', gasLevel: 69.4, weight: 10.0, temperature: 28.9, humidity: 51, ppm: 180, smoke: 12, battery: 87, wifiSignal: -49, leakRisk: 9, remainingDays: 18, status: 'safe' },
  { id: 'LPG-HYD-06', hotel: 'Hotel Hyderabad', location: 'Outdoor Kitchen', gasLevel: 61.8, weight: 8.9, temperature: 32.5, humidity: 56, ppm: 205, smoke: 19, battery: 84, wifiSignal: -60, leakRisk: 16, remainingDays: 15, status: 'safe' },
  { id: 'LPG-HYD-07', hotel: 'Hotel Hyderabad', location: 'Storage Room', gasLevel: 86.7, weight: 12.5, temperature: 26.5, humidity: 45, ppm: 160, smoke: 7, battery: 95, wifiSignal: -42, leakRisk: 5, remainingDays: 23, status: 'safe' },
  { id: 'LPG-HYD-08', hotel: 'Hotel Hyderabad', location: 'Kitchen A', gasLevel: 72.8, weight: 10.5, temperature: 29.4, humidity: 49, ppm: 179, smoke: 11, battery: 90, wifiSignal: -45, leakRisk: 8, remainingDays: 18, status: 'safe' }
];

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [simulationMode, setSimulationMode] = useState('normal'); // 'normal' | 'leak' | 'low_gas'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [hotelFilter, setHotelFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  // Enterprise IoT Cylinder State
  const [cylinders, setCylinders] = useState(INITIAL_CYLINDERS);
  const [selectedCylinderId, setSelectedCylinderId] = useState('LPG-MAA-01');
  const [timelineStep, setTimelineStep] = useState(0); // 0: Normal, 1: Gas Increasing, 2: Anomaly, 3: Prediction, 4: Alert, 5: Restored
  const [emergencyChecklist, setEmergencyChecklist] = useState({
    alarm: false,
    sms: false,
    manager: false,
    valve: false,
    fan: false,
    team: false
  });

  const [lastSyncSeconds, setLastSyncSeconds] = useState(0);
  const [aiLastAnalyzed, setAiLastAnalyzed] = useState(2);
  const [realTimeData, setRealTimeData] = useState([]);
  const [syncLogs, setSyncLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Memoized current active cylinder
  const selectedCylinder = useMemo(() => {
    return cylinders.find(c => c.id === selectedCylinderId) || cylinders[0];
  }, [cylinders, selectedCylinderId]);

  // Legacy mappings for page integration
  const gasLevel = selectedCylinder.gasLevel;
  const ppm = selectedCylinder.ppm;
  const temperature = selectedCylinder.temperature;
  const weight = selectedCylinder.weight;
  const leakRisk = selectedCylinder.leakRisk;
  const remainingDays = selectedCylinder.remainingDays;
  const systemStatus = selectedCylinder.status;

  // Toast Notifier
  const triggerToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Notification Logger
  const addNotificationLog = (text, type = 'info') => {
    setNotifications(prev => [
      { id: Date.now(), text, time: 'Just now', type },
      ...prev.slice(0, 10)
    ]);
  };

  // Initialize charts and notifications logs
  useEffect(() => {
    const initialData = [];
    const baseLevel = 75.2;
    for (let i = 9; i >= 0; i--) {
      const timeStr = new Date(Date.now() - i * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      initialData.push({
        time: timeStr,
        level: Number((baseLevel + (Math.random() - 0.5) * 1.2).toFixed(1))
      });
    }
    setRealTimeData(initialData);

    setNotifications([
      { id: 1, type: 'success', text: 'All cylinder telemetry sync online', time: '2 min ago' },
      { id: 2, type: 'success', text: 'Hotel Chennai nodes registered successfully', time: '2 hrs ago' },
      { id: 3, type: 'warning', text: 'Bakery LPG level low (Cylinder LPG-MAA-05)', time: '1 day ago' },
      { id: 4, type: 'info', text: 'TLS 1.3 encryption handshake successful', time: '1 day ago' },
    ]);

    setSyncLogs([
      { id: 101, time: '22:09:50', status: 'success', msg: 'Sensors sync complete. Payload: PPM=175, Weight=10.8kg, Temp=28.1°C' },
      { id: 102, time: '22:09:52', status: 'success', msg: 'Sensors sync complete. Payload: PPM=178, Weight=10.8kg, Temp=28.0°C' },
      { id: 103, time: '22:09:54', status: 'success', msg: 'Sensors sync complete. Payload: PPM=175, Weight=10.8kg, Temp=28.0°C' },
      { id: 104, time: '22:09:56', status: 'success', msg: 'Sensors sync complete. Payload: PPM=180, Weight=10.7kg, Temp=28.1°C' },
      { id: 105, time: '22:09:58', status: 'success', msg: 'Sensors sync complete. Payload: PPM=175, Weight=10.8kg, Temp=28.1°C' },
    ]);
  }, []);

  // Tick clock
  useEffect(() => {
    const ticker = setInterval(() => {
      setLastSyncSeconds(prev => prev + 1);
      setAiLastAnalyzed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // Central simulation engine: 2s update loop
  useEffect(() => {
    const updater = setInterval(() => {
      setLastSyncSeconds(0);
      setAiLastAnalyzed(0);

      // Trigger automatic timeline increment in leak mode
      if (simulationMode === 'leak') {
        setTimelineStep(prev => {
          const next = prev < 4 ? prev + 1 : 4;
          setEmergencyChecklist({
            alarm: next >= 1,
            sms: next >= 1,
            manager: next >= 2,
            valve: next >= 3,
            fan: next >= 3,
            team: next >= 4
          });
          return next;
        });
      }

      setCylinders(prevCylinders => {
        const updatedCylinders = prevCylinders.map(c => {
          const updated = { ...c };

          if (simulationMode === 'normal') {
            const levelDiff = (Math.random() - 0.5) * 0.15;
            const baseLevel = INITIAL_CYLINDERS.find(ic => ic.id === c.id).gasLevel;
            updated.gasLevel = Number(Math.max(baseLevel - 3, Math.min(baseLevel + 3, c.gasLevel + levelDiff)).toFixed(1));
            updated.ppm = Math.floor(165 + Math.random() * 20);
            updated.temperature = Number((c.temperature + (Math.random() - 0.5) * 0.2).toFixed(1));
            updated.humidity = Math.floor(Math.max(40, Math.min(70, c.humidity + (Math.random() - 0.5) * 2)));
            updated.smoke = Math.floor(Math.max(5, Math.min(25, c.smoke + (Math.random() - 0.5) * 1.5)));
            updated.leakRisk = Math.floor(Math.max(3, Math.min(18, c.leakRisk + (Math.random() - 0.5) * 2)));
            updated.remainingDays = c.gasLevel < 20 ? 3 : Math.max(5, Math.round(c.gasLevel * 0.25));
            updated.status = updated.gasLevel < 20 ? 'low_gas' : 'safe';
          } 
          else if (simulationMode === 'leak') {
            if (c.id === 'LPG-MAA-02') {
              updated.ppm = Math.min(760, c.ppm + 65);
              updated.gasLevel = Number(Math.max(8.0, c.gasLevel - 1.8).toFixed(1));
              updated.leakRisk = Math.min(99, 82 + timelineStep * 4);
              updated.status = 'danger';
              updated.temperature = Number((c.temperature + (Math.random() - 0.5) * 0.3 + 0.1).toFixed(1));
              updated.smoke = Math.min(85, c.smoke + 8);
              updated.remainingDays = Math.max(1, Math.round(updated.gasLevel * 0.25));
            } else {
              const levelDiff = (Math.random() - 0.5) * 0.1;
              const baseLevel = INITIAL_CYLINDERS.find(ic => ic.id === c.id).gasLevel;
              updated.gasLevel = Number(Math.max(baseLevel - 3, Math.min(baseLevel + 3, c.gasLevel + levelDiff)).toFixed(1));
              updated.ppm = Math.floor(165 + Math.random() * 20);
              updated.temperature = Number((c.temperature + (Math.random() - 0.5) * 0.2).toFixed(1));
              updated.humidity = Math.floor(Math.max(40, Math.min(70, c.humidity + (Math.random() - 0.5) * 2)));
              updated.smoke = Math.floor(Math.max(5, Math.min(25, c.smoke + (Math.random() - 0.5) * 1.5)));
              updated.leakRisk = Math.floor(Math.max(3, Math.min(18, c.leakRisk + (Math.random() - 0.5) * 2)));
              updated.remainingDays = c.gasLevel < 20 ? 3 : Math.max(5, Math.round(c.gasLevel * 0.25));
              updated.status = updated.gasLevel < 20 ? 'low_gas' : 'safe';
            }
          } 
          else if (simulationMode === 'low_gas') {
            if (c.id === 'LPG-BLR-03') {
              updated.gasLevel = 13.8;
              updated.status = 'low_gas';
              updated.ppm = Math.floor(165 + Math.random() * 20);
              updated.leakRisk = Math.floor(8 + Math.random() * 4);
              updated.remainingDays = 2;
            } else {
              const levelDiff = (Math.random() - 0.5) * 0.1;
              const baseLevel = INITIAL_CYLINDERS.find(ic => ic.id === c.id).gasLevel;
              updated.gasLevel = Number(Math.max(baseLevel - 3, Math.min(baseLevel + 3, c.gasLevel + levelDiff)).toFixed(1));
              updated.ppm = Math.floor(165 + Math.random() * 20);
              updated.temperature = Number((c.temperature + (Math.random() - 0.5) * 0.2).toFixed(1));
              updated.humidity = Math.floor(Math.max(40, Math.min(70, c.humidity + (Math.random() - 0.5) * 2)));
              updated.smoke = Math.floor(Math.max(5, Math.min(25, c.smoke + (Math.random() - 0.5) * 1.5)));
              updated.leakRisk = Math.floor(Math.max(3, Math.min(18, c.leakRisk + (Math.random() - 0.5) * 2)));
              updated.remainingDays = c.gasLevel < 20 ? 3 : Math.max(5, Math.round(c.gasLevel * 0.25));
              updated.status = updated.gasLevel < 20 ? 'low_gas' : 'safe';
            }
          }

          updated.weight = Number((updated.gasLevel * 14.44 / 100).toFixed(1));
          return updated;
        });

        // Resolve current selected cylinder telemetry streams
        const curSelected = updatedCylinders.find(c => c.id === selectedCylinderId) || updatedCylinders[0];

        // Update Recharts Area Chart
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setRealTimeData(prev => {
          const copy = [...prev.slice(1)];
          copy.push({ time: timeStr, level: curSelected.gasLevel });
          return copy;
        });

        // Update ESP32 sync logs
        setSyncLogs(prev => {
          const copy = [...prev.slice(1)];
          copy.push({
            id: Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            status: curSelected.status,
            msg: `Sync complete. Node ${curSelected.id} @ ${curSelected.location} -> MQ-2: ${curSelected.ppm} ppm, Load: ${curSelected.weight} kg, Temp: ${curSelected.temperature}°C`
          });
          return copy;
        });

        return updatedCylinders;
      });
    }, 2000);

    return () => clearInterval(updater);
  }, [simulationMode, selectedCylinderId, timelineStep]);

  // Handle simulation changes and push notification cards
  const triggerSimulation = (mode) => {
    setSimulationMode(mode);
    if (mode === 'leak') {
      triggerToast('🚨 GAS LEAK SIMULATION: LPG-MAA-02 (Chennai Kitchen A) anomaly detected!', 'danger');
      addNotificationLog('🚨 CRITICAL: Active Gas Leak in Chennai Kitchen A! (PPM exceeding 500)', 'danger');
      setTimelineStep(1);
      setEmergencyChecklist({ alarm: true, sms: true, manager: false, valve: false, fan: false, team: false });
    } else if (mode === 'low_gas') {
      triggerToast('⚠️ LOW GAS SIMULATION: LPG-BLR-03 (Bangalore Restaurant) dropped below 20%.', 'warning');
      addNotificationLog('⚠️ WARNING: LPG-BLR-03 level is low (13.8%)', 'warning');
      setCylinders(prev => prev.map(c => {
        if (c.id === 'LPG-BLR-03') {
          return { ...c, gasLevel: 13.8, status: 'low_gas', weight: Number((13.8 * 14.44 / 100).toFixed(1)) };
        }
        if (c.id === 'LPG-MAA-02') {
          return { ...INITIAL_CYLINDERS.find(ic => ic.id === 'LPG-MAA-02') };
        }
        return c;
      }));
      setTimelineStep(0);
      setEmergencyChecklist({ alarm: false, sms: false, manager: false, valve: false, fan: false, team: false });
    } else {
      triggerToast('🟢 System reset: All cylinders restored to nominal parameters.', 'success');
      addNotificationLog('🟢 INFO: LPG System restored to normal state', 'success');
      setCylinders(INITIAL_CYLINDERS.map(c => ({ ...c })));
      setTimelineStep(5);
      setTimeout(() => {
        setTimelineStep(0);
      }, 3000);
      setEmergencyChecklist({ alarm: false, sms: false, manager: false, valve: false, fan: false, team: false });
    }
  };

  const handleActionClick = (actionName, toastMsg, type) => {
    triggerToast(toastMsg, type);
    addNotificationLog(`⚡ Event: ${actionName} triggered by user.`, type === 'danger' ? 'danger' : 'info');
  };

  // Nav items configuration
  const navItems = [
    { id: 'landing', name: 'Landing Page', icon: <Icons.Home /> },
    { id: 'central', name: 'Central Monitoring', icon: <Icons.Central /> },
    { id: 'control', name: 'Control Center', icon: <Icons.Control /> },
    { id: 'dashboard', name: 'Cylinder Dashboard', icon: <Icons.Dashboard /> },
    { id: 'analytics', name: 'Usage Analytics', icon: <Icons.Analytics /> },
    { id: 'safety', name: 'Safety Center', icon: <Icons.Safety /> },
    { id: 'devices', name: 'Connected Devices', icon: <Icons.Devices /> },
  ];

  // Static stats for landing page
  const features = [
    { title: 'Live Monitoring', text: 'Real-time telemetry measuring gas volume, load weight, temperature, and environment PPM.', emoji: '📊' },
    { title: 'AI Leak Detection', text: 'Advanced pattern-matching algorithms to forecast gas leaks before standard threshold breaks.', emoji: '🧠' },
    { title: 'Refill Prediction', text: 'Linear regression models mapping user consumption to calculate empty states with 94%+ accuracy.', emoji: '📅' },
    { title: 'Smart Alerts', text: 'Instant SMS, push, and hardware notification triggers when gas level or gas density anomalies emerge.', emoji: '🔔' },
    { title: 'Usage Analytics', text: 'Full historical usage records tracking peak cooking hours, monthly loads, and telemetry efficiency.', emoji: '📈' },
  ];

  // Weekly usage chart static data
  const weeklyUsageData = [
    { day: 'Mon', usage: 3.2 },
    { day: 'Tue', usage: 4.1 },
    { day: 'Wed', usage: 2.8 },
    { day: 'Thu', usage: 3.9 },
    { day: 'Fri', usage: 3.5 },
    { day: 'Sat', usage: 4.8 },
    { day: 'Sun', usage: 4.0 },
  ];

  // Monthly usage static data
  const monthlyUsageData = [
    { name: 'Jan', consumption: 92.4 },
    { name: 'Feb', consumption: 95.8 },
    { name: 'Mar', consumption: 104.2 },
    { name: 'Apr', consumption: 98.1 },
    { name: 'May', consumption: 112.5 },
    { name: 'Jun', consumption: 105.2 },
    { name: 'Jul', consumption: 114.8 },
    { name: 'Aug', consumption: 117.9 },
    { name: 'Sep', consumption: 92.0 },
    { name: 'Oct', consumption: 102.3 },
    { name: 'Nov', consumption: 109.6 },
    { name: 'Dec', consumption: 121.4 },
  ];

  // Hourly static data for 24-hr peaks
  const hourlyUsageData = [
    { hour: '00:00', usage: 0.04 },
    { hour: '02:00', usage: 0.01 },
    { hour: '04:00', usage: 0.02 },
    { hour: '06:00', usage: 0.18 },
    { hour: '07:00', usage: 0.59 }, // morning peak
    { hour: '08:00', usage: 0.64 }, // morning peak
    { hour: '09:00', usage: 0.38 },
    { hour: '11:00', usage: 0.12 },
    { hour: '13:00', usage: 0.29 },
    { hour: '15:00', usage: 0.15 },
    { hour: '17:00', usage: 0.35 },
    { hour: '18:00', usage: 0.68 }, // evening peak
    { hour: '19:00', usage: 0.76 }, // evening peak
    { hour: '20:00', usage: 0.54 },
    { hour: '22:00', usage: 0.08 },
  ];

  // Anomaly log table static data
  const anomalyLogs = [
    { date: '2026-06-10 18:45', event: 'Unusual rapid level drop detected', severity: 'Medium' },
    { date: '2026-06-08 07:12', event: 'ESP32 Wi-Fi disconnected brief', severity: 'Low' },
    { date: '2026-06-04 12:30', event: 'Gas level reset (Cylinder changed)', severity: 'Info' },
    { date: '2026-05-28 19:22', event: 'Sensor temperature warning (34°C)', severity: 'Low' },
  ];

  // Safety Tips
  const safetyTips = [
    { id: 1, title: 'Keep Ventilated', text: 'Ensure proper ventilation in the cooking area. Do not cover the lower parts of the kitchen cabinets.' },
    { id: 2, title: 'Check Soap Bubbles', text: 'Check cylinder tube connections for leaks regularly using a soap-water bubble test. Bubbles reveal small gas exits.' },
    { id: 3, title: 'Keep Flammable Items Away', text: 'Store aerosols, thinners, papers, and oils at least 1.5 meters away from the gas cylinder.' },
  ];

  // Dynamic Refill date calculation
  const calculatedRefillDate = useMemo(() => {
    if (simulationMode === 'low_gas') {
      return 'June 14, 2026';
    }
    return 'June 28, 2026';
  }, [simulationMode]);

  return (
    <div className="min-h-screen bg-[#050B1F] text-[#E2E8F0] flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Dynamic Floating particles */}
      <BackgroundParticles />

      {/* Toast Alert Drawer */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border flex items-center justify-between shadow-2xl backdrop-blur-md transform transition-all duration-300 translate-y-0
              ${toast.type === 'danger' ? 'bg-red-950/70 border-red-500/40 text-red-100 shadow-red-500/5' : ''}
              ${toast.type === 'warning' ? 'bg-amber-950/70 border-amber-500/40 text-amber-100 shadow-amber-500/5' : ''}
              ${toast.type === 'success' ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-100 shadow-emerald-500/5' : ''}
              ${toast.type === 'info' || toast.type === 'primary' ? 'bg-blue-950/70 border-blue-500/40 text-blue-100 shadow-blue-500/5' : ''}
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {toast.type === 'danger' && '🚨'}
                {toast.type === 'warning' && '⚠️'}
                {toast.type === 'success' && '✅'}
                {(toast.type === 'info' || toast.type === 'primary') && '💡'}
              </span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
              className="text-slate-400 hover:text-white ml-2 text-lg focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Main Top Header Bar */}
      <header className="bg-slate-950/40 border-b border-cyan-500/10 sticky top-0 z-40 px-4 py-3 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#06B6D4]/45 transition-colors cursor-pointer"
          >
            <Icons.Menu />
          </button>
          
          {/* Logo brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-[#06B6D4] flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              🔥
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-wide">SmartLPG <span className="text-[#06B6D4] font-bold">AI</span></span>
              <p className="text-[9px] text-[#94A3B8] font-medium tracking-wider -mt-1 hidden sm:block">PREDICTING DANGER BEFORE IT HAPPENS</p>
            </div>
          </div>
        </div>

        {/* Header telemetry and indicators */}
        <div className="flex items-center gap-4">
          
          {/* Quick status dots for quick glance */}
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-slate-400 bg-slate-950/50 backdrop-blur-sm py-1.5 px-4 rounded-full border border-cyan-500/10">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${systemStatus === 'danger' ? 'bg-red-500 animate-ping' : (systemStatus === 'warning' ? 'bg-amber-500' : 'bg-emerald-500')}`} />
              System: <span className={systemStatus === 'danger' ? 'text-red-400 font-bold' : (systemStatus === 'warning' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold')}>{systemStatus.toUpperCase()}</span>
            </span>
            <span className="w-px h-3 bg-slate-800" />
            <span>MQ-2: <span className="text-[#E2E8F0] font-bold">{ppm} ppm</span></span>
            <span className="w-px h-3 bg-slate-800" />
            <span>LPG: <span className="text-[#E2E8F0] font-bold">{gasLevel}%</span></span>
          </div>

          {/* Interactive Notifications bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-colors relative cursor-pointer"
            >
              <Icons.Bell />
              <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full bg-blue-600 border border-[#050B1F] text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {notifications.filter(n => n.type === 'danger' || n.type === 'warning').length || 2}
              </span>
            </button>

            {showNotificationsDropdown && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-900/95 border border-cyan-500/20 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden z-50">
                <div className="p-3 bg-slate-800/80 border-b border-cyan-500/10 flex justify-between items-center">
                  <span className="font-bold text-sm text-white">Notifications Alert Box</span>
                  <button onClick={() => setNotifications([])} className="text-xs text-slate-400 hover:text-white">Clear All</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">No new logs. System is quiet.</div>
                  ) : (
                    notifications.map(item => (
                      <div key={item.id} className="p-3 border-b border-slate-800/60 hover:bg-slate-800/20 flex items-start gap-2 text-xs">
                        <span className="mt-0.5">
                          {item.type === 'danger' && '🔴'}
                          {item.type === 'warning' && '🟡'}
                          {item.type === 'success' && '🟢'}
                          {item.type === 'info' && '🔵'}
                        </span>
                        <div className="flex-1 text-left">
                          <p className="text-slate-200 font-medium">{item.text}</p>
                          <span className="text-[10px] text-slate-500">{item.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 bg-slate-850 text-center border-t border-cyan-500/10">
                  <button onClick={() => { setActiveTab('dashboard'); setShowNotificationsDropdown(false); }} className="text-xs text-[#06B6D4] hover:text-[#06B6D4]/80 font-semibold transition-colors">Open Live Panel</button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-850 border-2 border-cyan-500 flex items-center justify-center overflow-hidden cursor-pointer shadow-lg shadow-cyan-500/10">
              <span className="font-bold text-xs text-white">OP</span>
            </div>
            <span className="text-sm font-semibold text-slate-300 hidden md:block">Operator</span>
          </div>

        </div>
      </header>

      {/* Main Body Shell */}
      <div className="flex-1 flex relative">
        
        {/* Navigation Sidebar Drawer */}
        {/* Desktop Sidebar */}
        <aside className={`glass-sidebar min-h-full transition-all duration-300 flex-shrink-0 flex flex-col justify-between hidden md:flex
          ${isSidebarOpen ? 'w-64' : 'w-20'}
        `}>
          <div className="p-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer group
                  ${activeTab === item.id 
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/10 border border-[#06B6D4]/30 text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-white border border-transparent'
                  }
                `}
              >
                <div className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110 text-[#06B6D4]' : 'group-hover:scale-110 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                {isSidebarOpen && <span className="truncate text-left">{item.name}</span>}
              </button>
            ))}
          </div>

          {/* Sidebar footer telemetry panel */}
          {isSidebarOpen && (
            <div className="p-4 bg-slate-950/60 border border-cyan-500/5 m-3 rounded-xl text-xs space-y-2 text-left">
              <p className="font-bold text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Device Details
              </p>
              <div className="flex justify-between">
                <span className="text-slate-500">Firmware:</span>
                <span className="text-slate-300 font-mono">v2.3.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">WiFi RSSI:</span>
                <span className="text-green-400 font-semibold">-45 dBm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sync In:</span>
                <span className="text-blue-400 font-semibold">{2 - (lastSyncSeconds % 2)}s</span>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile slide out sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            
            {/* Sidebar drawer content */}
            <aside className="relative w-64 bg-[#0B1220]/95 border-r border-[#06B6D4]/15 flex flex-col justify-between p-4 z-40 animate-slide-in backdrop-blur-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-[#06B6D4] text-sm tracking-wide">NAVIGATION MENU</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                    <Icons.Close />
                  </button>
                </div>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer
                        ${activeTab === item.id 
                          ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/10 border border-[#06B6D4]/35 text-[#06B6D4] shadow-md' 
                          : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'
                        }
                      `}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-xs space-y-1 text-left">
                <p className="font-semibold text-slate-300">SmartLPG ESP32 Node</p>
                <p className="text-slate-500 font-mono">IP: 192.168.1.105</p>
              </div>
            </aside>
          </div>
        )}

        {/* PAGE VIEWS CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">

          {/* PAGE 1 — LANDING PAGE */}
          {activeTab === 'landing' && (
            <div className="space-y-12 animate-fade-in relative">
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-140px)]">
                
                {/* Left Content column */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-950/40 to-cyan-950/40 border border-cyan-500/30 py-1.5 px-4 rounded-full text-xs font-semibold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    AI Model v2.4 Active & Calibrating
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                    AI-Powered Smart LPG <br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-[#06B6D4] text-neon-cyan font-black">Monitoring & Safety</span> Platform
                  </h1>
                  
                  <p className="text-base md:text-lg text-[#94A3B8] max-w-xl leading-relaxed">
                    Real-time LPG monitoring, predictive leakage analysis, refill forecasting, and automated hazard controls. High-performance safety analytics for modern environments.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 hover:scale-[1.03] transition-all cursor-pointer"
                    >
                      View Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        triggerSimulation('leak');
                        setActiveTab('dashboard');
                      }}
                      className="px-6 py-3 bg-transparent border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/30 text-slate-300 hover:text-white font-bold rounded-lg transition-all hover:scale-[1.03] cursor-pointer"
                    >
                      Live Demo (Simulate Leak)
                    </button>
                  </div>
                </div>

                {/* Right Interactive Cylinder column */}
                <div className="lg:col-span-5 flex items-center justify-center relative">
                  
                  {/* Glowing background halo */}
                  <div className={`absolute w-72 h-72 rounded-full blur-[90px] opacity-20 -z-10 transition-all duration-1000
                    ${systemStatus === 'danger' ? 'bg-red-500 shadow-[0_0_120px_rgba(239,68,68,0.5)]' : 'bg-cyan-500 shadow-[0_0_120px_rgba(6,182,212,0.4)]'}
                  `} />

                  {/* Upgraded 3D Cylinder Component */}
                  <LPGCylinder level={gasLevel} status={systemStatus} />

                </div>

              </div>

              {/* Stats Bar */}
              <div className="glass-card rounded-2xl py-6 px-4 md:px-8 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/60">
                  <div className="p-2">
                    <p className="text-2xl md:text-3xl font-extrabold text-blue-500 text-neon-blue">10,000+</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-[10px]">Households Protected</p>
                  </div>
                  <div className="p-2 pt-6 md:pt-2">
                    <p className="text-2xl md:text-3xl font-extrabold text-emerald-500">99.8%</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-[10px]">System Uptime</p>
                  </div>
                  <div className="p-2 pt-6 md:pt-2">
                    <p className="text-2xl md:text-3xl font-extrabold text-[#06B6D4] text-neon-cyan">&lt; 2.0s</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-[10px]">Alert Response</p>
                  </div>
                  <div className="p-2 pt-6 md:pt-2">
                    <p className="text-2xl md:text-3xl font-extrabold text-purple-500">94%</p>
                    <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider text-[10px]">Prediction Accuracy</p>
                  </div>
                </div>
              </div>

              {/* Features section grid */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Advanced Platform Features</h2>
                  <p className="text-slate-400 text-sm max-w-lg mx-auto">Hardware telemetry coupled with machine learning architectures delivers full control and security over your gas utilities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {features.map((feat, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        if (feat.title.includes('Monitoring') || feat.title.includes('Alerts')) setActiveTab('dashboard');
                        else if (feat.title.includes('Leak') || feat.title.includes('Safety')) setActiveTab('safety');
                        else setActiveTab('analytics');
                      }}
                      className="glass-card glass-card-hover p-5 rounded-2xl text-left cursor-pointer group"
                    >
                      <span className="text-3xl bg-slate-900/60 border border-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">{feat.emoji}</span>
                      <h3 className="font-bold text-white text-base group-hover:text-[#06B6D4] transition-colors">{feat.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{feat.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* NEW PAGE: CENTRAL MONITORING */}
          {activeTab === 'central' && (() => {
            // Aggregate statistics per hotel
            const chennaiCyls = cylinders.filter(c => c.hotel === 'Hotel Chennai');
            const chennaiLow = chennaiCyls.filter(c => c.status === 'low_gas').length;
            const chennaiLeak = chennaiCyls.filter(c => c.status === 'danger').length;
            const chennaiAvg = Number((chennaiCyls.reduce((sum, c) => sum + c.gasLevel, 0) / chennaiCyls.length).toFixed(1));

            const blrCyls = cylinders.filter(c => c.hotel === 'Hotel Bangalore');
            const blrLow = blrCyls.filter(c => c.status === 'low_gas').length;
            const blrLeak = blrCyls.filter(c => c.status === 'danger').length;
            const blrAvg = Number((blrCyls.reduce((sum, c) => sum + c.gasLevel, 0) / blrCyls.length).toFixed(1));

            const hydCyls = cylinders.filter(c => c.hotel === 'Hotel Hyderabad');
            const hydLow = hydCyls.filter(c => c.status === 'low_gas').length;
            const hydLeak = hydCyls.filter(c => c.status === 'danger').length;
            const hydAvg = Number((hydCyls.reduce((sum, c) => sum + c.gasLevel, 0) / hydCyls.length).toFixed(1));

            // Filtering cylinders list
            const filteredCylinders = cylinders.filter(c => {
              const matchesHotel = hotelFilter === 'All' || c.hotel === hotelFilter;
              const matchesLocation = locationFilter === 'All' || c.location === locationFilter;
              
              let matchesStatus = true;
              if (statusFilter === 'Safe') matchesStatus = c.status === 'safe';
              else if (statusFilter === 'Low Gas') matchesStatus = c.status === 'low_gas';
              else if (statusFilter === 'Warning') matchesStatus = c.status === 'warning';
              else if (statusFilter === 'Leak Detected') matchesStatus = c.status === 'danger';
              
              return matchesHotel && matchesLocation && matchesStatus;
            });

            // Find current active hotel for layout display
            const layoutHotelName = hotelFilter === 'All' ? 'Hotel Chennai' : hotelFilter;
            const hotelCylinders = cylinders.filter(c => c.hotel === layoutHotelName);

            const getRoomStatus = (roomName) => {
              const roomCyls = hotelCylinders.filter(c => c.location === roomName);
              if (roomCyls.some(c => c.status === 'danger')) return 'danger';
              if (roomCyls.some(c => c.status === 'low_gas' || c.status === 'warning')) return 'warning';
              return 'safe';
            };

            return (
              <div className="space-y-6 animate-fade-in text-left">
                {/* Page Title Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Central LPG Monitoring Center</h1>
                    <p className="text-[#94A3B8] text-sm">Enterprise Multi-Hotel IoT sensor nodes grid and floor layout monitoring.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setHotelFilter('All'); setLocationFilter('All'); setStatusFilter('All'); }}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* 1. Multi Hotel View Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Hotel Chennai Card */}
                  <div 
                    onClick={() => setHotelFilter(hotelFilter === 'Hotel Chennai' ? 'All' : 'Hotel Chennai')}
                    className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between hover:scale-[1.02]
                      ${hotelFilter === 'Hotel Chennai' 
                        ? 'border-[#06B6D4] bg-[#06B6D4]/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                        : chennaiLeak > 0 ? 'border-red-500/40 bg-red-950/5 shadow-red-500/5' : 'border-cyan-500/10'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Hotel Chennai</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">8 Nodes</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Avg Gas Level:</span>
                        <span className="text-white font-bold">{chennaiAvg}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Status:</span>
                        <span className="font-bold flex items-center gap-1">
                          {chennaiLeak > 0 ? (
                            <span className="text-red-400 font-black animate-pulse flex items-center gap-1">
                              🔴 {chennaiLeak} Leak Detected
                            </span>
                          ) : chennaiLow > 0 ? (
                            <span className="text-amber-400 font-bold">
                              🟡 {chennaiLow} Low Gas
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">🟢 Nominal</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hotel Bangalore Card */}
                  <div 
                    onClick={() => setHotelFilter(hotelFilter === 'Hotel Bangalore' ? 'All' : 'Hotel Bangalore')}
                    className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between hover:scale-[1.02]
                      ${hotelFilter === 'Hotel Bangalore' 
                        ? 'border-[#06B6D4] bg-[#06B6D4]/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                        : blrLeak > 0 ? 'border-red-500/40 bg-red-950/5 shadow-red-500/5' : 'border-cyan-500/10'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Hotel Bangalore</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">8 Nodes</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Avg Gas Level:</span>
                        <span className="text-white font-bold">{blrAvg}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Status:</span>
                        <span className="font-bold flex items-center gap-1">
                          {blrLeak > 0 ? (
                            <span className="text-red-400 font-black animate-pulse flex items-center gap-1">
                              🔴 {blrLeak} Leak Detected
                            </span>
                          ) : blrLow > 0 ? (
                            <span className="text-amber-400 font-bold">
                              🟡 {blrLow} Low Gas
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">🟢 Nominal</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hotel Hyderabad Card */}
                  <div 
                    onClick={() => setHotelFilter(hotelFilter === 'Hotel Hyderabad' ? 'All' : 'Hotel Hyderabad')}
                    className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-300 border text-left flex flex-col justify-between hover:scale-[1.02]
                      ${hotelFilter === 'Hotel Hyderabad' 
                        ? 'border-[#06B6D4] bg-[#06B6D4]/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                        : hydLeak > 0 ? 'border-red-500/40 bg-red-950/5 shadow-red-500/5' : 'border-cyan-500/10'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white uppercase tracking-wider">Hotel Hyderabad</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">8 Nodes</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Avg Gas Level:</span>
                        <span className="text-white font-bold">{hydAvg}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Status:</span>
                        <span className="font-bold flex items-center gap-1">
                          {hydLeak > 0 ? (
                            <span className="text-red-400 font-black animate-pulse flex items-center gap-1">
                              🔴 {hydLeak} Leak Detected
                            </span>
                          ) : hydLow > 0 ? (
                            <span className="text-amber-400 font-bold">
                              🟡 {hydLow} Low Gas
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold">🟢 Nominal</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. Main Floor Layout and Cylinder Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Floor Layout */}
                  <div className="xl:col-span-5 glass-card p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-left">
                      <div>
                        <h3 className="font-bold text-white text-base">Facility Floor Blueprint Layout</h3>
                        <p className="text-xs text-slate-400">Live cylinder status maps. Click a zone to filter the grid list below.</p>
                      </div>
                      <span className="text-xs bg-slate-900 py-1.5 px-3 rounded-lg border border-[#06B6D4]/25 text-[#06B6D4] font-semibold font-mono">
                        {layoutHotelName} Layout
                      </span>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-2">
                      <svg viewBox="0 0 800 400" className="w-full h-auto text-slate-500 select-none">
                        {/* Grid Background */}
                        <defs>
                          <pattern id="layout-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(6, 182, 212, 0.03)" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="800" height="400" fill="url(#layout-grid)" />

                        {/* ROOM 1: Bakery (Top Left) */}
                        {(() => {
                          const status = getRoomStatus('Bakery');
                          const isFiltered = locationFilter === 'Bakery';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Bakery')} className="cursor-pointer group">
                              <rect 
                                x="40" y="40" width="180" height="130" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="55" y="70" className="fill-white font-extrabold text-sm tracking-wide">Bakery</text>
                              <text x="55" y="90" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder Node</text>
                              <circle cx="55" cy="115" r="5" className={status === 'danger' ? 'fill-red-500 animate-ping' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                              <circle cx="55" cy="115" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 2: Kitchen A (Top Middle) */}
                        {(() => {
                          const status = getRoomStatus('Kitchen A');
                          const isFiltered = locationFilter === 'Kitchen A';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Kitchen A')} className="cursor-pointer group">
                              <rect 
                                x="240" y="40" width="240" height="130" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="255" y="70" className="fill-white font-extrabold text-sm tracking-wide">Kitchen A</text>
                              <text x="255" y="90" className="fill-slate-400 font-bold text-[10px] uppercase">2 Cylinder Nodes</text>
                              {/* Draw two dots representing 2 nodes */}
                              <circle cx="255" cy="115" r="4.5" className={status === 'danger' ? 'fill-red-500' : 'fill-emerald-500'} />
                              <circle cx="270" cy="115" r="4.5" className={status === 'danger' ? 'fill-red-500 animate-ping' : 'fill-emerald-500'} />
                              <circle cx="270" cy="115" r="4" className={status === 'danger' ? 'fill-red-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 3: Kitchen B (Top Right) */}
                        {(() => {
                          const status = getRoomStatus('Kitchen B');
                          const isFiltered = locationFilter === 'Kitchen B';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Kitchen B')} className="cursor-pointer group">
                              <rect 
                                x="500" y="40" width="260" height="130" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="515" y="70" className="fill-white font-extrabold text-sm tracking-wide">Kitchen B</text>
                              <text x="515" y="90" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder Node</text>
                              <circle cx="515" cy="115" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 4: Restaurant (Bottom Left) */}
                        {(() => {
                          const status = getRoomStatus('Restaurant');
                          const isFiltered = locationFilter === 'Restaurant';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Restaurant')} className="cursor-pointer group">
                              <rect 
                                x="40" y="190" width="220" height="170" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="55" y="220" className="fill-white font-extrabold text-sm tracking-wide">Restaurant</text>
                              <text x="55" y="240" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder Node</text>
                              <circle cx="55" cy="265" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 5: Food Court (Bottom Middle) */}
                        {(() => {
                          const status = getRoomStatus('Food Court');
                          const isFiltered = locationFilter === 'Food Court';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Food Court')} className="cursor-pointer group">
                              <rect 
                                x="280" y="190" width="200" height="170" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="295" y="220" className="fill-white font-extrabold text-sm tracking-wide">Food Court</text>
                              <text x="295" y="240" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder Node</text>
                              <circle cx="295" cy="265" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 6: Storage Room (Bottom Right) */}
                        {(() => {
                          const status = getRoomStatus('Storage Room');
                          const isFiltered = locationFilter === 'Storage Room';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Storage Room')} className="cursor-pointer group">
                              <rect 
                                x="500" y="190" width="130" height="170" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="515" y="220" className="fill-white font-extrabold text-sm tracking-wide">Storage</text>
                              <text x="515" y="240" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder</text>
                              <circle cx="515" cy="265" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}

                        {/* ROOM 7: Outdoor Kitchen (Far Right Corridor) */}
                        {(() => {
                          const status = getRoomStatus('Outdoor Kitchen');
                          const isFiltered = locationFilter === 'Outdoor Kitchen';
                          return (
                            <g onClick={() => setLocationFilter(isFiltered ? 'All' : 'Outdoor Kitchen')} className="cursor-pointer group">
                              <rect 
                                x="645" y="190" width="115" height="170" rx="8" 
                                fill={status === 'danger' ? 'rgba(239, 68, 68, 0.15)' : status === 'warning' ? 'rgba(245, 158, 11, 0.08)' : isFiltered ? 'rgba(6, 182, 212, 0.1)' : 'rgba(15, 23, 42, 0.4)'} 
                                stroke={status === 'danger' ? '#ef4444' : status === 'warning' ? '#f59e0b' : isFiltered ? '#06B6D4' : 'rgba(6, 182, 212, 0.15)'} 
                                strokeWidth={status === 'danger' ? '3' : '2'}
                                className={status === 'danger' ? 'animate-pulse' : 'transition-colors duration-300 group-hover:fill-slate-800/40'}
                              />
                              <text x="655" y="220" className="fill-white font-extrabold text-sm tracking-wide">Outdoor K.</text>
                              <text x="655" y="240" className="fill-slate-400 font-bold text-[10px] uppercase">1 Cylinder</text>
                              <circle cx="655" cy="265" r="4.5" className={status === 'danger' ? 'fill-red-500' : status === 'warning' ? 'fill-amber-500' : 'fill-emerald-500'} />
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    {/* Floor Plan Legend */}
                    <div className="flex justify-between items-center text-xs text-slate-400 px-1 pt-1">
                      <span>Interactive Plan: Click a room to filter cylinders grid</span>
                      {locationFilter !== 'All' && (
                        <button 
                          onClick={() => setLocationFilter('All')} 
                          className="text-[#06B6D4] font-bold hover:underline"
                        >
                          Clear Room Filter ({locationFilter})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Grid and Filters */}
                  <div className="xl:col-span-7 space-y-4">
                    
                    {/* Status filter bar */}
                    <div className="glass-card p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {['All', 'Safe', 'Low Gas', 'Leak Detected'].map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setStatusFilter(opt)}
                              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer border
                                ${statusFilter === opt
                                  ? 'bg-[#06B6D4] border-[#06B6D4] text-white shadow-md'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                                }
                              `}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs font-mono text-slate-400">
                        Showing <span className="text-[#06B6D4] font-bold">{filteredCylinders.length}</span> of 24 Cylinders
                      </div>
                    </div>

                    {/* Responsive Cylinders Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
                      {filteredCylinders.map(c => {
                        // Card border styling based on cylinder status
                        let borderClass = 'border-cyan-500/10 hover:border-cyan-500/25';
                        let bgGlow = 'rgba(6, 182, 212, 0.05)';
                        let labelEmoji = '🟢';
                        let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                        if (c.status === 'danger') {
                          borderClass = 'border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.1)] animate-pulse';
                          bgGlow = 'rgba(239, 68, 68, 0.1)';
                          labelEmoji = '🔴';
                          badgeStyle = 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
                        } else if (c.status === 'low_gas') {
                          borderClass = 'border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.08)]';
                          bgGlow = 'rgba(245, 158, 11, 0.08)';
                          labelEmoji = '🟠';
                          badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                        } else if (c.status === 'warning') {
                          borderClass = 'border-yellow-500/25';
                          bgGlow = 'rgba(234, 179, 8, 0.05)';
                          labelEmoji = '🟡';
                          badgeStyle = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
                        }

                        return (
                          <div 
                            key={c.id}
                            onClick={() => {
                              setSelectedCylinderId(c.id);
                              setActiveTab('dashboard');
                              triggerToast(`Focused Telemetry: Cylinder ${c.id} loaded in Dashboard`, 'primary');
                            }}
                            className={`glass-card p-4 rounded-xl border flex flex-col justify-between hover:scale-[1.02] cursor-pointer transition-all duration-300`}
                            style={{ background: `rgba(17, 24, 39, 0.45) radial-gradient(circle at top right, ${bgGlow} 0%, transparent 60%)` }}
                          >
                            <div className="space-y-1.5 text-left">
                              {/* Header Title */}
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-white text-xs font-mono">{c.id}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase tracking-wider ${badgeStyle}`}>
                                  {labelEmoji} {c.status === 'danger' ? 'Leak' : c.status === 'low_gas' ? 'Low' : 'Safe'}
                                </span>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Hotel:</span>
                                <span className="text-slate-300 font-semibold">{c.hotel.replace('Hotel ', '')}</span>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Location:</span>
                                <span className="text-slate-300 font-semibold">{c.location}</span>
                              </div>

                              {/* Progress bar level */}
                              <div className="space-y-1 pt-1">
                                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                                  <span>LPG Volume:</span>
                                  <span className="font-mono font-bold text-white">{c.gasLevel}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${c.status === 'danger' ? 'bg-red-500' : c.status === 'low_gas' ? 'bg-amber-500' : 'bg-blue-500'}`}
                                    style={{ width: `${c.gasLevel}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Secondary stats row */}
                            <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-800/80 text-center text-[9px] text-slate-500 font-medium mt-3">
                              <div>
                                <span className="block text-slate-400 font-bold">{c.weight}kg</span>
                                <span>Weight</span>
                              </div>
                              <div>
                                <span className={`block font-bold ${c.status === 'danger' ? 'text-red-400 font-black animate-pulse' : 'text-slate-400'}`}>{c.leakRisk}%</span>
                                <span>Leak Risk</span>
                              </div>
                              <div>
                                <span className="block text-slate-400 font-bold">{c.remainingDays}d</span>
                                <span>Remain</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      {filteredCylinders.length === 0 && (
                        <div className="col-span-full py-8 text-center text-xs text-slate-400">
                          No cylinders found matching active filters.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* NEW PAGE: CONTROL CENTER (SCADA CONTROL ROOM) */}
          {activeTab === 'control' && (() => {
            // General aggregates
            const totalCount = cylinders.length;
            const leakCount = cylinders.filter(c => c.status === 'danger').length;
            const lowCount = cylinders.filter(c => c.status === 'low_gas').length;
            const safeCount = totalCount - leakCount - lowCount;
            
            // Health computations based on overall state
            let systemHealth = 100;
            if (leakCount > 0) systemHealth = 32;
            else if (lowCount > 0) systemHealth = 88;
            
            const netHealth = 97 + Math.random() * 2;
            const cloudHealth = 98 + Math.random() * 1.5;

            // Resolve recommendations
            const isLeakActive = leakCount > 0;
            const leakCyl = cylinders.find(c => c.status === 'danger') || {};

            return (
              <div className="space-y-6 animate-fade-in text-left">
                {/* SCADA Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Industrial SCADA Control room</h1>
                    <p className="text-[#94A3B8] text-sm">Real-time enterprise automation pipeline, security, and smart override console.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#111827]/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-red-500/10 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isLeakActive ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                    <span className={`font-bold uppercase tracking-wider text-[10px] ${isLeakActive ? 'text-red-400 font-black' : 'text-emerald-400'}`}>
                      {isLeakActive ? 'CRITICAL: LEAK DETECTED' : 'SCADA System: Nominal'}
                    </span>
                  </div>
                </div>

                {/* 1. SCADA Stats Overview Deck */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  
                  {/* Gauge Circular Card: System Health */}
                  <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-md">
                    <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block mb-2">System Health</span>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="26" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="5" fill="transparent" />
                        <circle 
                          cx="32" cy="32" r="26" 
                          stroke={systemHealth < 50 ? '#EF4444' : systemHealth < 90 ? '#F59E0B' : '#22C55E'} 
                          strokeWidth="5" fill="transparent" 
                          strokeDasharray={2 * Math.PI * 26}
                          strokeDashoffset={(2 * Math.PI * 26) * (1 - systemHealth / 100)}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <span className={`absolute text-xs font-black ${systemHealth < 50 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{Math.round(systemHealth)}%</span>
                    </div>
                  </div>

                  {/* Stat Card 2: Total Cylinders */}
                  <div className="glass-card p-4 rounded-xl flex flex-col justify-between text-left shadow-md">
                    <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Total Cylinders</span>
                    <p className="text-3xl font-black text-white mt-2 font-mono text-neon-blue">{totalCount}</p>
                    <span className="text-[9px] text-slate-500 font-semibold block">24 IoT active nodes</span>
                  </div>

                  {/* Stat Card 3: Safe Cylinders */}
                  <div className="glass-card p-4 rounded-xl flex flex-col justify-between text-left shadow-md">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Safe Cylinders</span>
                    <p className="text-3xl font-black text-emerald-400 mt-2 font-mono">{safeCount}</p>
                    <span className="text-[9px] text-slate-500 font-semibold block">0% risk verified</span>
                  </div>

                  {/* Stat Card 4: Low Gas Cylinders */}
                  <div className="glass-card p-4 rounded-xl flex flex-col justify-between text-left shadow-md">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Low Gas Cylinders</span>
                    <p className="text-3xl font-black text-amber-500 mt-2 font-mono">{lowCount}</p>
                    <span className="text-[9px] text-slate-500 font-semibold block">Level below 20%</span>
                  </div>

                  {/* Stat Card 5: Leak Detected */}
                  <div className={`glass-card p-4 rounded-xl flex flex-col justify-between text-left shadow-md transition-all duration-300
                    ${isLeakActive ? 'border-red-500/40 shadow-red-500/10' : ''}
                  `}>
                    <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Leaks Detected</span>
                    <p className={`text-3xl font-black mt-2 font-mono ${isLeakActive ? 'text-red-500 animate-pulse text-neon-cyan' : 'text-slate-400'}`}>{leakCount}</p>
                    <span className="text-[9px] text-slate-550 font-semibold block">Requires action</span>
                  </div>

                  {/* Stat Card 6: Network Sync */}
                  <div className="glass-card p-4 rounded-xl flex flex-col justify-between text-left shadow-md">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Cloud Sync Health</span>
                    <p className="text-3xl font-black text-[#06B6D4] mt-2 font-mono">{Number(cloudHealth.toFixed(1))}%</p>
                    <span className="text-[9px] text-slate-550 font-semibold block">Firebase node connection</span>
                  </div>

                </div>

                {/* 2. Main SCADA Panel Matrix */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (8 cols): Node Map, Topology, Timeline, Response Checklist */}
                  <div className="xl:col-span-8 space-y-6">
                    
                    {/* Node Matrix and Multi Sensor Panel combined */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Node Matrix Grid */}
                      <div className="md:col-span-7 glass-card p-5 rounded-2xl space-y-4">
                        <div className="text-left">
                          <h3 className="font-bold text-white text-sm">Live Cylinder Matrix Mapping</h3>
                          <p className="text-xs text-slate-400">24 active node map. Hover to query, click to inspect sensor panel.</p>
                        </div>
                        
                        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 justify-center">
                          {cylinders.map(c => {
                            const isSelected = c.id === selectedCylinderId;
                            let nodeColor = 'bg-emerald-500 shadow-emerald-500/20';
                            if (c.status === 'danger') nodeColor = 'bg-red-500 animate-ping';
                            else if (c.status === 'low_gas') nodeColor = 'bg-amber-500 shadow-amber-500/20';
                            else if (c.status === 'warning') nodeColor = 'bg-yellow-500';

                            return (
                              <div key={c.id} className="relative flex flex-col items-center group">
                                <button
                                  onClick={() => { setSelectedCylinderId(c.id); triggerToast(`Inspecting sensor data: ${c.id}`, 'info'); }}
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-[9px] font-mono border transition-all cursor-pointer relative
                                    ${isSelected 
                                      ? 'border-[#06B6D4] bg-[#06B6D4]/10 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                                    }
                                  `}
                                >
                                  {c.id.substring(c.id.length - 2)}
                                  
                                  {/* Blinking indicator dot */}
                                  <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-950 ${nodeColor}`} />
                                </button>

                                {/* Tooltip details on hover */}
                                <div className="absolute bottom-11 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-950/95 border border-cyan-500/25 p-3 rounded-lg text-[9px] text-slate-300 font-mono w-44 z-50 shadow-2xl backdrop-blur-md pointer-events-none text-left space-y-1">
                                  <p className="font-extrabold text-white text-xs border-b border-slate-800 pb-1 mb-1">{c.id}</p>
                                  <p><span className="text-slate-500">Loc:</span> {c.location} ({c.hotel.replace('Hotel ', '')})</p>
                                  <p><span className="text-slate-500">LPG Level:</span> {c.gasLevel}%</p>
                                  <p><span className="text-slate-500">Weight:</span> {c.weight} kg</p>
                                  <p><span className="text-slate-500">MQ-2:</span> {c.ppm} ppm</p>
                                  <p><span className="text-slate-500">Risk:</span> {c.leakRisk}%</p>
                                  <p><span className="text-slate-500">Status:</span> <span className={c.status === 'danger' ? 'text-red-400 font-bold' : 'text-emerald-400'}>{c.status.toUpperCase()}</span></p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                          <span>Click node to select</span>
                          <span className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Safe</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Low Gas</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" /> Leak</span>
                          </span>
                        </div>
                      </div>

                      {/* Multi Sensor Panel (updates live for selected cylinder) */}
                      <div className="md:col-span-5 glass-card p-5 rounded-2xl space-y-4">
                        <div className="text-left">
                          <h3 className="font-bold text-white text-sm">Multi-Sensor Telemetry Panel</h3>
                          <p className="text-xs text-slate-400">Live feeds for node: <span className="font-mono text-[#06B6D4] font-bold">{selectedCylinder.id}</span></p>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                          
                          {/* Card 1: MQ-2 Gas sensor */}
                          <div className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors
                            ${selectedCylinder.status === 'danger' ? 'border-red-500/40 bg-red-950/15' : 'border-slate-800 bg-slate-900/45'}
                          `}>
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>💨</span> MQ-2 Gas Density
                            </span>
                            <span className={`font-mono font-bold ${selectedCylinder.status === 'danger' ? 'text-red-400 animate-pulse font-extrabold text-sm' : 'text-[#06B6D4]'}`}>
                              {selectedCylinder.ppm} ppm
                            </span>
                          </div>

                          {/* Card 2: MCU Temperature */}
                          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/45 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>🌡️</span> MCU Core Temperature
                            </span>
                            <span className="font-mono font-bold text-white">
                              {selectedCylinder.temperature} °C
                            </span>
                          </div>

                          {/* Card 3: MCU Humidity */}
                          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/45 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>💧</span> Relative Humidity
                            </span>
                            <span className="font-mono font-bold text-white">
                              {selectedCylinder.humidity}%
                            </span>
                          </div>

                          {/* Card 4: Load Cell Weight */}
                          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/45 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>⚖️</span> Cylinder Weight
                            </span>
                            <span className="font-mono font-bold text-emerald-400">
                              {selectedCylinder.weight} kg
                            </span>
                          </div>

                          {/* Card 5: Battery Level */}
                          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/45 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>🔋</span> Node Battery Status
                            </span>
                            <span className="font-mono font-bold text-white">
                              {selectedCylinder.battery}%
                            </span>
                          </div>

                          {/* Card 6: WiFi signal */}
                          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/45 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold flex items-center gap-2">
                              <span>📶</span> Wi-Fi RSSI Signal
                            </span>
                            <span className="font-mono font-bold text-emerald-400">
                              {selectedCylinder.wifiSignal} dBm
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* Network Topology Pipeline (Flowing animated SVG) */}
                    <div className="glass-card p-5 rounded-2xl space-y-4">
                      <div className="text-left">
                        <h3 className="font-bold text-white text-base">IoT Network Topology Pipeline</h3>
                        <p className="text-xs text-slate-400">Real-time data packets architecture sync. Data flows red during leak simulations.</p>
                      </div>

                      <div className="overflow-x-auto bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                        <div className="min-w-[760px] relative">
                          <svg viewBox="0 0 800 120" className="w-full h-auto overflow-visible select-none">
                            {/* Paths Connecting Nodes */}
                            <path id="topo-p1" d="M 50,60 L 150,60" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" />
                            <path id="topo-p2" d="M 150,60 L 250,60" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" />
                            <path id="topo-p3" d="M 250,60 L 350,60" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" />
                            <path id="topo-p4" d="M 350,60 L 460,60" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" />
                            <path id="topo-p5" d="M 460,60 L 580,60" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="3" />
                            <path id="topo-p6" d="M 580,60 C 630,60 630,35 690,35" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2.5" />
                            <path id="topo-p7" d="M 580,60 C 630,60 630,85 690,85" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2.5" />

                            {/* Flowing animated circles / packets */}
                            {/* Packet 1 */}
                            <circle r="4.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'} className={isLeakActive ? 'shadow-lg shadow-red-500' : ''}>
                              <animateMotion dur={isLeakActive ? '0.7s' : '2s'} repeatCount="indefinite" path="M 50,60 L 150,60" />
                            </circle>
                            {/* Packet 2 */}
                            <circle r="4.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.7s' : '2s'} repeatCount="indefinite" path="M 150,60 L 250,60" />
                            </circle>
                            {/* Packet 3 */}
                            <circle r="4.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.7s' : '2s'} repeatCount="indefinite" path="M 250,60 L 350,60" />
                            </circle>
                            {/* Packet 4 */}
                            <circle r="4.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.7s' : '2s'} repeatCount="indefinite" path="M 350,60 L 460,60" />
                            </circle>
                            {/* Packet 5 */}
                            <circle r="4.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.8s' : '2.5s'} repeatCount="indefinite" path="M 460,60 L 580,60" />
                            </circle>
                            {/* Packet 6 - Split 1 */}
                            <circle r="3.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.9s' : '2.8s'} repeatCount="indefinite" path="M 580,60 C 630,60 630,35 690,35" />
                            </circle>
                            {/* Packet 7 - Split 2 */}
                            <circle r="3.5" fill={isLeakActive ? '#EF4444' : '#06B6D4'}>
                              <animateMotion dur={isLeakActive ? '0.9s' : '2.8s'} repeatCount="indefinite" path="M 580,60 C 630,60 630,85 690,85" />
                            </circle>

                            {/* Node Graphic Blocks */}
                            {/* Node 1: Cylinder */}
                            <g transform="translate(15, 40)">
                              <rect width="70" height="40" rx="6" fill="#1E293B" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">CYLINDER</text>
                            </g>

                            {/* Node 2: ESP32 */}
                            <g transform="translate(115, 40)">
                              <rect width="70" height="40" rx="6" fill="#0F172A" stroke="#2563EB" strokeWidth="1.5" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">ESP32 MCU</text>
                            </g>

                            {/* Node 3: WiFi */}
                            <g transform="translate(215, 40)">
                              <rect width="70" height="40" rx="6" fill="#1E293B" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">WIFI NODE</text>
                            </g>

                            {/* Node 4: Router */}
                            <g transform="translate(315, 40)">
                              <rect width="70" height="40" rx="6" fill="#1E293B" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">ROUTER</text>
                            </g>

                            {/* Node 5: Firebase Cloud */}
                            <g transform="translate(425, 40)">
                              <rect width="70" height="40" rx="6" fill="#0F172A" stroke="#D97706" strokeWidth="1.5" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">CLOUD DB</text>
                            </g>

                            {/* Node 6: AI Engine */}
                            <g transform="translate(545, 40)">
                              <rect width="70" height="40" rx="6" fill="#0F172A" stroke="#9333EA" strokeWidth="1.5" />
                              <text x="35" y="24" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontWeight="bold" fontFamily="monospace">AI ENGINE</text>
                            </g>

                            {/* Node 7: Dashboard Operator console */}
                            <g transform="translate(655, 15)">
                              <rect width="70" height="35" rx="5" fill="#111827" stroke="#06B6D4" strokeWidth="1.5" />
                              <text x="35" y="21" textAnchor="middle" fill="#E2E8F0" fontSize="7" fontWeight="bold" fontFamily="monospace">DASHBOARD</text>
                            </g>

                            {/* Node 8: Mobile App */}
                            <g transform="translate(655, 68)">
                              <rect width="70" height="35" rx="5" fill="#111827" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" />
                              <text x="35" y="21" textAnchor="middle" fill="#E2E8F0" fontSize="7" fontWeight="bold" fontFamily="monospace">MOBILE APP</text>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Animation */}
                    <div className="glass-card p-5 rounded-2xl space-y-4">
                      <div className="text-left">
                        <h3 className="font-bold text-white text-base">AI Prediction Telemetry Timeline</h3>
                        <p className="text-xs text-slate-400">Automated sequential forecast logic tracking anomalies during leak simulation.</p>
                      </div>

                      {/* Timeline steps */}
                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 pt-2 relative">
                        {[
                          { title: 'Normal', desc: 'Secure operational state', icon: '🟢', stepIdx: 0 },
                          { title: 'Gas Increasing', desc: 'PPM density rising', icon: '📈', stepIdx: 1 },
                          { title: 'Anomaly Detected', desc: 'Flow pattern breach', icon: '⚠️', stepIdx: 2 },
                          { title: 'Leak Prediction', desc: 'AI forecast: 96% leak', icon: '🧠', stepIdx: 3 },
                          { title: 'Emergency Alert', desc: 'Controls activated', icon: '🚨', stepIdx: 4 },
                          { title: 'Safety Restored', desc: 'Manual reset sync', icon: '✅', stepIdx: 5 },
                        ].map((node) => {
                          const isActive = timelineStep === node.stepIdx;
                          let glowStyle = 'border-slate-800 bg-slate-900 text-slate-400';
                          
                          if (isActive) {
                            if (node.stepIdx === 4) glowStyle = 'border-red-500 bg-red-950/20 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.3)] scale-[1.03]';
                            else if (node.stepIdx === 5) glowStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-200 shadow-[0_0_15px_rgba(34,197,94,0.3)] scale-[1.03]';
                            else glowStyle = 'border-[#06B6D4] bg-[#06B6D4]/10 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.03]';
                          }

                          return (
                            <div key={node.title} className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-all duration-500 ${glowStyle}`}>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-bold">{node.title}</span>
                                <span className="text-base">{node.icon}</span>
                              </div>
                              <p className="text-[9px] text-slate-400 mt-2 leading-tight">{node.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Right Column (4 cols): Security status, Recommendations, Auto Response */}
                  <div className="xl:col-span-4 space-y-6">
                    
                    {/* Security status panel */}
                    <div className="glass-card p-5 rounded-2xl space-y-4 text-left">
                      <h3 className="font-bold text-white text-base">Network Security Status</h3>
                      
                      <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
                        {[
                          { label: 'Connected Devices', value: '24 IoT Nodes', status: 'success' },
                          { label: 'Authenticated Devices', value: '24 / 24 Nodes', status: 'success' },
                          { label: 'TLS Encryption', value: 'TLS 1.3 AES-256 Active', status: 'success' },
                          { label: 'Network Firewall', value: 'Active & Shielding', status: 'success' },
                          { label: 'Suspicious Devices', value: isLeakActive ? '1 Node Blocked' : '0 Anomalies', status: isLeakActive ? 'danger' : 'success' },
                          { label: 'API Gateway Status', value: '200 OK / Live Syncing', status: 'success' },
                          { label: 'Cloud Status', value: 'Firebase Database Connected', status: 'success' },
                          { label: 'Device Firmware Integrity', value: 'Verify Secure Signature ✅', status: 'success' },
                        ].map((sec, idx) => (
                          <div key={idx} className="p-3 bg-slate-950/40 rounded-lg border border-slate-900 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold">{sec.label}</span>
                            <span className={`font-bold font-mono text-[10px] ${sec.status === 'danger' ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
                              {sec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Recommendation Panel */}
                    <div className={`glass-card p-5 rounded-2xl border transition-all duration-300 text-left space-y-3
                      ${isLeakActive ? 'border-red-500/40 bg-red-950/5 shadow-red-500/5 animate-pulse' : 'border-cyan-500/10'}
                    `}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🧠</span>
                        <h3 className="font-bold text-white text-sm">AI Recommendation Engine</h3>
                      </div>
                      
                      <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-lg space-y-1 font-mono text-[10px] text-slate-300">
                        <p><span className="text-slate-500">Leak Probability:</span> <span className={isLeakActive ? 'text-red-400 font-black animate-pulse' : 'text-emerald-400'}>{isLeakActive ? '96%' : '1.2%'}</span></p>
                        <p><span className="text-slate-500">Model Confidence:</span> <span className="text-[#06B6D4]">{isLeakActive ? '98%' : '94%'}</span></p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Recommended Actions:</p>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4 font-semibold">
                          {isLeakActive ? (
                            <>
                              <li className="text-red-400 animate-pulse">Close Emergency Valve for Chennai Kitchen A</li>
                              <li className="text-red-400">Evacuate Chennai Kitchen A and adjacent Food Court</li>
                              <li className="text-[#06B6D4]">Start Ventilation Exhaust Fans at 100% capacity</li>
                              <li>Dispatch Emergency Maintenance team to inspect node LPG-MAA-02</li>
                            </>
                          ) : (
                            <>
                              <li className="text-slate-400 font-medium">Verify cylinder tare weight before replacement</li>
                              <li className="text-slate-400 font-medium">Inspect soap bubble hose joints every 30 days</li>
                              <li className="text-slate-400 font-medium">Maintain ventilation path clearance</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Automatic Emergency Response panel */}
                    <div className="glass-card p-5 rounded-2xl space-y-4 text-left">
                      <div className="text-left border-b border-slate-800 pb-2.5">
                        <h3 className="font-bold text-white text-base">Automatic Emergency Controls</h3>
                        <p className="text-xs text-slate-400">Sequence responses checklist. Checked off automatically during hazards.</p>
                      </div>

                      <div className="space-y-3.5 pt-1">
                        {[
                          { key: 'alarm', label: 'Buzzer Siren Alarm Activated' },
                          { key: 'sms', label: 'Safety SMS Alerts Dispatched' },
                          { key: 'manager', label: 'General Manager & Warden Notified' },
                          { key: 'valve', label: 'Solenoid Shut-off Valve Closed' },
                          { key: 'fan', label: 'Emergency Exhaust Fans Started' },
                          { key: 'team', label: 'LPG Emergency Response Team Dispatched' },
                        ].map((ctrl) => {
                          const checked = emergencyChecklist[ctrl.key];
                          return (
                            <div key={ctrl.key} className="flex items-center justify-between text-xs">
                              <span className={`font-semibold transition-colors duration-300 ${checked ? 'text-white' : 'text-slate-400'}`}>
                                {ctrl.label}
                              </span>
                              <span className={`transition-all duration-500 flex items-center justify-center w-5 h-5 rounded-full border text-[10px] font-black
                                ${checked 
                                  ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                                  : 'border-slate-800 bg-slate-950 text-transparent'
                                }`}
                              >
                                ✓
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })()}
          
          {/* PAGE 2 — DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in relative z-10 text-left">
              
              {/* Header Titles */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">SmartLPG Telemetry Dashboard</h1>
                  <p className="text-[#94A3B8] text-sm">Real-time cylinder sensors stream & machine learning anomaly detection dashboard.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#111827]/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/20 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[#06B6D4] font-bold uppercase tracking-wider text-[10px]">Status: Live Syncing</span>
                </div>
              </div>

              {/* 4 KPI Cards in a Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KPI Card 1: Gas Level */}
                <div className="glass-card glass-card-hover p-5 flex items-center justify-between shadow-md">
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Gas Level</p>
                    <p className="text-3xl font-black text-white text-neon-blue">{gasLevel}%</p>
                    <span className="text-[10px] text-slate-550 font-semibold block">15.3 kg Tare | 29.5 kg Full</span>
                  </div>
                  {/* Progress ring using customizable inline SVG */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="26" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="6" fill="transparent" />
                      <circle 
                        cx="32" cy="32" r="26" 
                        stroke="#2563EB" strokeWidth="6" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 26}
                        strokeDashoffset={(2 * Math.PI * 26) * (1 - gasLevel / 100)}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-extrabold text-[#06B6D4]">{Math.round(gasLevel)}%</span>
                  </div>
                </div>

                {/* KPI Card 2: Weight */}
                <div className="glass-card glass-card-hover p-5 flex items-center justify-between shadow-md">
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Cylinder Weight</p>
                    <p className="text-3xl font-black text-[#22C55E]">{weight} kg</p>
                    <span className="text-[10px] text-slate-550 font-semibold block">Load cell weight sensor</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl text-emerald-450 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    ⚖️
                  </div>
                </div>

                {/* KPI Card 3: Leak Risk Score */}
                <div className={`glass-card glass-card-hover p-5 flex items-center justify-between shadow-md transition-all duration-300
                  ${leakRisk > 50 ? 'border-red-500/40 shadow-red-500/10' : ''}
                `}>
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Leak Risk Score</p>
                    <p className={`text-3xl font-black ${leakRisk > 50 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>{leakRisk}%</p>
                    <div className="pt-0.5">
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border uppercase tracking-wider
                        ${leakRisk > 50 
                          ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' 
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }
                      `}>
                        {leakRisk > 50 ? 'LEAK DETECTED' : 'SAFE'}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors
                    ${leakRisk > 50 
                      ? 'bg-red-500/25 border border-red-500/45 text-red-400 animate-bounce' 
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }
                  `}>
                    🛡️
                  </div>
                </div>

                {/* KPI Card 4: Remaining Days */}
                <div className="glass-card glass-card-hover p-5 flex items-center justify-between shadow-md">
                  <div className="space-y-2 text-left">
                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Remaining Days</p>
                    <p className={`text-3xl font-black ${remainingDays < 5 ? 'text-red-500' : 'text-amber-500'}`}>{remainingDays} Days</p>
                    <span className="text-[10px] text-slate-550 font-semibold block">Average daily use: 0.54kg</span>
                  </div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl
                    ${remainingDays < 5 
                      ? 'bg-red-500/15 border-red-500/30 text-red-400' 
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }
                  `}>
                    📅
                  </div>
                </div>

              </div>

              {/* AI Status Card (Full Width) */}
              <div className={`border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 text-left shadow-lg backdrop-blur-md transition-all duration-300
                ${systemStatus === 'danger' 
                  ? 'bg-red-950/20 border-red-500/40 shadow-red-500/5' 
                  : (systemStatus === 'warning' 
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-amber-500/5' 
                    : 'bg-emerald-950/10 border-cyan-500/10'
                  )
                }
              `}>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-2xl
                    ${systemStatus === 'danger' ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' : (systemStatus === 'warning' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-[#06B6D4]/10 border-cyan-500/20 text-[#06B6D4]')}
                  `}>
                    {systemStatus === 'danger' ? '🚨' : (systemStatus === 'warning' ? '⚠️' : '🧠')}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider
                      ${systemStatus === 'danger' ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' : (systemStatus === 'warning' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-405')}
                    `}>
                      🟢 AI STATUS: {systemStatus === 'danger' ? 'EMERGENCY LEAK DETECTED' : (systemStatus === 'warning' ? 'LOW GAS WARNING' : 'SAFE')}
                    </span>
                    <span className="text-[10px] text-[#94A3B8] font-semibold">Analyzed {aiLastAnalyzed} seconds ago</span>
                  </div>
                  <p className="text-xs text-[#E2E8F0] leading-relaxed">
                    {systemStatus === 'danger' 
                      ? 'AI sensors indicate anomaly state: sharp PPM rise matched with continuous load-weight decline. Possible active LPG leakage.' 
                      : (systemStatus === 'warning' 
                        ? 'LPG gas level has dropped below the critical 20% mark. AI estimates cylinder emptying within 3 days.' 
                        : 'AI analysis indicates normal LPG consumption patterns. No anomalies detected. Sub-system MQ-2 density is stable.'
                      )
                    }
                  </p>
                </div>
              </div>

              {/* Grid for Charts & Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side: Charts (Realtime line & weekly bar) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Real-time Gas Level LineChart */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4 text-left">
                      <div>
                        <h3 className="font-bold text-white text-base tracking-tight">Real-Time Gas Level</h3>
                        <p className="text-xs text-slate-400">Pushes new telemetry point every 2s. Gas levels fluctuate 68–76%.</p>
                      </div>
                      <span className="text-xs bg-slate-950/60 py-1.5 px-3 rounded-lg border border-cyan-500/15 font-mono text-[#06B6D4] font-bold">
                        {gasLevel}%
                      </span>
                    </div>

                    <div className="w-full">
                      <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={realTimeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.08)" />
                          <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <YAxis domain={[10, 100]} stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(11, 18, 32, 0.85)', borderColor: 'rgba(6, 182, 212, 0.2)', borderRadius: '12px', color: '#FFFFFF', fontSize: '11px', backdropFilter: 'blur(8px)' }}
                            itemStyle={{ color: '#06B6D4' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="level" 
                            stroke="#06B6D4" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorLevel)" 
                            animationDuration={300}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Weekly Usage Bar Chart */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg">
                    <div className="text-left mb-4">
                      <h3 className="font-bold text-white text-base tracking-tight">Weekly Consumption Load</h3>
                      <p className="text-xs text-slate-400">Visualizing total gas weight used in kg across the week.</p>
                    </div>

                    <div className="w-full">
                      <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={weeklyUsageData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.8}/>
                              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.08)" />
                          <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(11, 18, 32, 0.85)', borderColor: 'rgba(6, 182, 212, 0.2)', borderRadius: '12px', color: '#FFFFFF', fontSize: '11px', backdropFilter: 'blur(8px)' }}
                            itemStyle={{ color: '#06B6D4' }}
                          />
                          <Bar dataKey="usage" fill="url(#colorBar)" radius={[4, 4, 0, 0]} barSize={26} name="LPG Usage (kg)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

                {/* Right Side: Prediction, Notifications, Device health */}
                <div className="lg:col-span-4 space-y-6">

                  {/* Refill Prediction Card */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                    <div>
                      <h3 className="font-bold text-white text-base tracking-tight">Refill Forecasting</h3>
                      <p className="text-xs text-slate-400">AI linear usage models mapping depletion rate.</p>
                    </div>
                    
                    <div className="bg-slate-950/45 p-4 rounded-xl border border-cyan-500/10 space-y-1">
                      <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider">Predicted Refill Date</p>
                      <p className="text-lg font-black text-amber-500">{calculatedRefillDate}</p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-xs font-semibold text-slate-300">Confidence:</span>
                        <span className="px-2 py-0.5 text-[9px] font-black rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">94% CONFIDENCE</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-400">
                        <span>Usage Progress</span>
                        <span>{remainingDays} days left</span>
                      </div>
                      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-500 to-[#06B6D4]
                            ${remainingDays < 5 ? 'from-red-605 to-red-400 animate-pulse' : ''}
                          `}
                          style={{ width: `${(remainingDays / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-550 block text-right font-medium">Out of ~30 day cycle</span>
                    </div>
                  </div>

                  {/* Notifications Panel */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-white text-base tracking-tight">Live Alert Timeline</h3>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-950/85 text-slate-400 border border-cyan-500/10 uppercase tracking-wider">History Log</span>
                    </div>

                    <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                      {notifications.map(item => (
                        <div key={item.id} className="p-3 bg-slate-950/20 rounded-xl border border-slate-900/60 flex items-start gap-2.5 text-xs">
                          <span className="mt-0.5 flex-shrink-0">
                            {item.type === 'danger' ? '🔴' : (item.type === 'warning' ? '⚠️' : '✅')}
                          </span>
                          <div className="flex-1 space-y-0.5 text-left">
                            <p className="text-slate-300 font-medium leading-normal">{item.text}</p>
                            <span className="text-[10px] text-slate-500 block">{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Health Card */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-white text-base tracking-tight">Device Node Health</h3>
                      <span className="px-2.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-450 text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[#94A3B8] font-semibold">Battery</span>
                        <p className="font-black text-slate-200 text-sm">92%</p>
                      </div>
                      <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[#94A3B8] font-semibold">WiFi Signal</span>
                        <p className="font-black text-emerald-400 text-sm">Strong (-45dBm)</p>
                      </div>
                      <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[#94A3B8] font-semibold">Last Sync</span>
                        <p className="font-black text-blue-400 text-sm">{lastSyncSeconds} sec ago</p>
                      </div>
                      <div className="p-2.5 bg-slate-950/40 rounded-xl border border-slate-900 space-y-1">
                        <span className="text-[#94A3B8] font-semibold">Sensors</span>
                        <p className="font-black text-slate-200 text-xs">MQ-2 ✅ | LC ✅</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* PAGE 3 — ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in relative z-10 text-left">
              
              {/* Header Title */}
              <div className="text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">AI Usage Pattern Analysis</h1>
                <p className="text-slate-400 text-sm">Long-term monthly records and hourly peak consumption profiling.</p>
              </div>

              {/* 4 Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card glass-card-hover p-5 text-left shadow-md">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Daily Average</span>
                  <p className="text-3xl font-black text-white mt-1">0.54 kg</p>
                  <p className="text-[10px] text-slate-450 mt-1">Based on previous 3 months load cycles</p>
                </div>
                <div className="glass-card glass-card-hover p-5 text-left shadow-md">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Peak Cooking Hours</span>
                  <p className="text-2xl font-black text-blue-500 mt-1">7-9 AM & 6-8 PM</p>
                  <p className="text-[10px] text-slate-450 mt-1.5">Corresponds to meal prep times</p>
                </div>
                <div className="glass-card glass-card-hover p-5 text-left shadow-md">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Weekly Total</span>
                  <p className="text-3xl font-black text-white mt-1">26.3 kg</p>
                  <p className="text-[10px] text-emerald-400 mt-1">Stable usage pattern verified</p>
                </div>
                <div className="glass-card glass-card-hover p-5 text-left shadow-md">
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Monthly Total</span>
                  <p className="text-3xl font-black text-white mt-1">105.2 kg</p>
                  <p className="text-[10px] text-slate-455 mt-1">Estimates ~3.6 cylinders yearly</p>
                </div>
              </div>

              {/* Analytics Graphs Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Monthly Consumption (Line Chart) */}
                <div className="lg:col-span-6 glass-card p-5 shadow-lg space-y-4">
                  <div className="text-left">
                    <h3 className="font-bold text-white text-base tracking-tight">Monthly Gas Consumption (12-Month)</h3>
                    <p className="text-xs text-slate-400">Total consumption tracking (90–120kg range).</p>
                  </div>
                  <div className="w-full">
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={monthlyUsageData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.08)" />
                        <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'rgba(11, 18, 32, 0.85)', borderColor: 'rgba(6, 182, 212, 0.2)', borderRadius: '12px', color: '#FFFFFF', fontSize: '11px', backdropFilter: 'blur(8px)' }}
                          itemStyle={{ color: '#06B6D4' }}
                        />
                        <Line type="monotone" dataKey="consumption" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4' }} activeDot={{ r: 6 }} name="LPG Consumption (kg)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Daily Usage Patterns (Bar Chart) */}
                <div className="lg:col-span-6 glass-card p-5 shadow-lg space-y-4">
                  <div className="text-left">
                    <h3 className="font-bold text-white text-base tracking-tight">Daily Usage Profile (24-Hour)</h3>
                    <p className="text-xs text-slate-400">Hourly density peaks showing morning and evening cook times.</p>
                  </div>
                  <div className="w-full">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={hourlyUsageData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorHourly" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#2563EB" stopOpacity={0.25}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.08)" />
                        <XAxis dataKey="hour" stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'rgba(11, 18, 32, 0.85)', borderColor: 'rgba(6, 182, 212, 0.2)', borderRadius: '12px', color: '#FFFFFF', fontSize: '11px', backdropFilter: 'blur(8px)' }}
                          itemStyle={{ color: '#06B6D4' }}
                        />
                        <Bar dataKey="usage" fill="url(#colorHourly)" radius={[4, 4, 0, 0]} name="Consumption Rate (kg/hr)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Bottom: AI Insights and Anomaly Log table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* AI Insights */}
                <div className="lg:col-span-5 glass-card border border-blue-500/20 p-5 shadow-lg text-left flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💡</span>
                      <h3 className="font-extrabold text-blue-450 text-sm uppercase tracking-wider text-neon-blue">AI Predictive Insights</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Consumption increased <span className="text-amber-500 font-bold">24% this week</span> vs last week. Peak usage detected between <span className="text-blue-400 font-bold">7–9 AM</span> and <span className="text-blue-400 font-bold">6–8 PM</span>. Weekend usage is <span className="text-purple-400 font-bold">35% higher</span> than weekdays."
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-500 font-medium">
                    AI Insights update hourly based on local load telemetry profiles.
                  </div>
                </div>

                {/* Anomaly Log Table */}
                <div className="lg:col-span-7 glass-card p-5 shadow-lg text-left space-y-4">
                  <h3 className="font-bold text-white text-base tracking-tight">System Anomaly Log</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Date / Timestamp</th>
                          <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Incident / Event Description</th>
                          <th className="pb-3 font-semibold text-right uppercase tracking-wider text-[10px]">Severity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {anomalyLogs.map((log, index) => (
                          <tr key={index} className="hover:bg-slate-900/10">
                            <td className="py-3 text-slate-400 font-mono">{log.date}</td>
                            <td className="py-3 text-slate-200 font-semibold">{log.event}</td>
                            <td className="py-3 text-right">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide
                                ${log.severity === 'High' ? 'bg-red-500/15 border-red-500/30 text-red-400' : ''}
                                ${log.severity === 'Medium' ? 'bg-amber-500/15 border-amber-500/30 text-amber-400' : ''}
                                ${log.severity === 'Low' ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' : ''}
                                ${log.severity === 'Info' ? 'bg-slate-500/15 border-slate-500/30 text-slate-400' : ''}
                              `}>
                                {log.severity}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* PAGE 4 — SAFETY CENTER */}
          {activeTab === 'safety' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header Title */}
              <div className="text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Safety Center</h1>
                <p className="text-slate-400 text-sm">LPG environment concentration levels, safety alerts & emergency overrides.</p>
              </div>

              {/* Large Status Card & SVG Needle Gauge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Side: Concentration Gauge */}
                <div className="lg:col-span-5 glass-card rounded-2xl p-5 shadow-lg text-left flex flex-col items-center justify-between">
                  <div className="w-full flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base">LPG Density PPM Gauge</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider
                      ${systemStatus === 'danger' ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse' : (systemStatus === 'warning' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400')}
                    `}>
                      {systemStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Math accurate Semicircular SVG Needle Gauge */}
                  <div className="relative py-4 flex items-center justify-center">
                    <svg width="300" height="180" viewBox="0 0 300 180">
                      <defs>
                        <linearGradient id="gauge-green-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#15803d" />
                          <stop offset="100%" stopColor="#22c55e" />
                        </linearGradient>
                        <linearGradient id="gauge-yellow-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#a16207" />
                          <stop offset="100%" stopColor="#eab308" />
                        </linearGradient>
                        <linearGradient id="gauge-red-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#b91c1c" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>

                      {/* 1. Track background (full semicircle) */}
                      <path d="M 40,160 A 110,110 0 0,1 260,160" fill="none" stroke="#334155" strokeWidth="18" strokeLinecap="round" />

                      {/* 2. Color segments */}
                      {/* Green zone: 0 to 300 ppm (corresponds to angles 180 to 126 degrees) */}
                      <path d="M 40,160 A 110,110 0 0,1 75.3,71.0" fill="none" stroke="url(#gauge-green-grad)" strokeWidth="18" strokeLinecap="round" />
                      
                      {/* Yellow zone: 300 to 500 ppm (corresponds to angles 126 to 90 degrees) */}
                      <path d="M 75.3,71.0 A 110,110 0 0,1 150,50" fill="none" stroke="url(#gauge-yellow-grad)" strokeWidth="18" />

                      {/* Red zone: 500 to 1000 ppm (corresponds to angles 90 to 0 degrees) */}
                      <path d="M 150,50 A 110,110 0 0,1 260,160" fill="none" stroke="url(#gauge-red-grad)" strokeWidth="18" strokeLinecap="round" />

                      {/* 3. Render Needle based on PPM */}
                      {(() => {
                        const clampedPpm = Math.max(0, Math.min(ppm, 1000));
                        const angleDeg = 180 - (clampedPpm / 1000) * 180;
                        const angleRad = (angleDeg * Math.PI) / 180;
                        const needleX = 150 + 95 * Math.cos(angleRad);
                        const needleY = 160 - 95 * Math.sin(angleRad);
                        return (
                          <>
                            <line 
                              x1="150" y1="160" 
                              x2={needleX} y2={needleY} 
                              stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                            {/* Inner core cap */}
                            <circle cx="150" cy="160" r="10" fill="#3B82F6" stroke="#0F172A" strokeWidth="2" />
                            <circle cx="150" cy="160" r="4" fill="#FFFFFF" />
                          </>
                        );
                      })()}
                    </svg>

                    {/* Numeric displays under the needle */}
                    <div className="absolute bottom-1 text-center">
                      <p className="text-3xl font-black text-white">{ppm}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Air Quality PPM</p>
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-3 text-center text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-800">
                    <div>
                      <p className="text-emerald-500">🟢 SAFE</p>
                      <p>0–300 ppm</p>
                    </div>
                    <div>
                      <p className="text-amber-500">🟡 WARN</p>
                      <p>300–500 ppm</p>
                    </div>
                    <div>
                      <p className="text-red-500">🔴 LEAK</p>
                      <p>500+ ppm</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Telemetry details and safety log */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  
                  {/* Current Status Telemetry details */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Current PPM</span>
                      <p className={`text-2xl font-extrabold ${systemStatus === 'danger' ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>{ppm} ppm</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Leak Threshold</span>
                      <p className="text-2xl font-extrabold text-red-500">500 ppm</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Ventilation Status</span>
                      <p className="text-2xl font-extrabold text-emerald-500">Active ✅</p>
                    </div>
                  </div>

                  {/* Leak Detection History */}
                  <div className="glass-card rounded-2xl p-5 shadow-lg space-y-4">
                    <h3 className="font-bold text-white text-base">Leak Check History (Last 5 Checks)</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500">
                            <th className="pb-2">Timestamp</th>
                            <th className="pb-2">Sensor Location</th>
                            <th className="pb-2">Density Rating</th>
                            <th className="pb-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                          <tr className="hover:bg-slate-900/20">
                            <td className="py-2.5 font-mono">22:11:45</td>
                            <td className="py-2.5 font-semibold">Kitchen Unit MQ-2</td>
                            <td className="py-2.5">{ppm} ppm</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-400">Normal</td>
                          </tr>
                          <tr className="hover:bg-slate-900/20">
                            <td className="py-2.5 font-mono">22:09:45</td>
                            <td className="py-2.5 font-semibold">Kitchen Unit MQ-2</td>
                            <td className="py-2.5">178 ppm</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-400">Normal</td>
                          </tr>
                          <tr className="hover:bg-slate-900/20">
                            <td className="py-2.5 font-mono">22:07:45</td>
                            <td className="py-2.5 font-semibold">Kitchen Unit MQ-2</td>
                            <td className="py-2.5">182 ppm</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-400">Normal</td>
                          </tr>
                          <tr className="hover:bg-slate-900/20">
                            <td className="py-2.5 font-mono">22:05:45</td>
                            <td className="py-2.5 font-semibold">Kitchen Unit MQ-2</td>
                            <td className="py-2.5">175 ppm</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-400">Normal</td>
                          </tr>
                          <tr className="hover:bg-slate-900/20">
                            <td className="py-2.5 font-mono">22:03:45</td>
                            <td className="py-2.5 font-semibold">Kitchen Unit MQ-2</td>
                            <td className="py-2.5">179 ppm</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-400">Normal</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>

              {/* Emergency Override Actions (Buttons Grid) */}
              <div className={`glass-card rounded-2xl p-5 shadow-lg text-left space-y-4 transition-all duration-500 ${systemStatus === 'danger' ? 'border-red-500/30 shadow-red-500/10' : ''}`}>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base">Emergency Action Control Deck</h3>
                  <p className="text-slate-400 text-xs">Execute safety overrides in the event of anomalies. Actions trigger smart devices.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => handleActionClick('Sound Alarm', '🔊 Local siren trigger packet sent to ESP32 buzzer.', 'danger')}
                    className="p-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-red-500/10 flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    <span className="text-xl">🔊</span>
                    <span>Sound Alarm</span>
                  </button>
                  
                  <button 
                    onClick={() => handleActionClick('Notify Family', '📱 Emergency broadcast broadcasted to family chat channels.', 'primary')}
                    className="p-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    <span className="text-xl">📱</span>
                    <span>Notify Family</span>
                  </button>
                  
                  <button 
                    onClick={() => handleActionClick('Call Provider', '📞 Calling LPG Safety department dispatch logs.', 'warning')}
                    className="p-4 bg-amber-650 hover:bg-amber-600 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-amber-500/10 flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    <span className="text-xl">📞</span>
                    <span>Call LPG Provider</span>
                  </button>
                  
                  <button 
                    onClick={() => handleActionClick('Shut Off Valve', '🔴 Valve solenoid shutoff actuator trigger completed.', 'danger')}
                    className="p-4 bg-red-950 hover:bg-red-900 border border-red-500/35 active:scale-95 text-red-200 font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all cursor-pointer"
                  >
                    <span className="text-xl">🔴</span>
                    <span>Shut Off Valve</span>
                  </button>
                </div>
              </div>

              {/* Safety Tips Card */}
              <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛡️</span>
                  <h3 className="font-bold text-white text-base">LPG Safe Handling Best Practices</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {safetyTips.map(tip => (
                    <div key={tip.id} className="p-4 glass-card glass-card-hover rounded-xl space-y-2 cursor-default">
                      <h4 className="font-bold text-blue-400 text-sm">{tip.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* PAGE 5 — DEVICES */}
          {activeTab === 'devices' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Header Title */}
              <div className="text-left space-y-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">Connected Devices</h1>
                <p className="text-slate-400 text-sm">Active microcontrollers, sensor readings, and syncing node pipelines.</p>
              </div>

              {/* Connected Device details & Sensor Readings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Device Details Card */}
                <div className="lg:col-span-6 glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-extrabold text-white text-base">ESP32 - Kitchen Unit</h3>
                      <p className="text-[10px] text-slate-500 font-mono">ID: 8C:AA:B5:E8:4F:10</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Online
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">IP Address</span>
                      <p className="font-bold text-slate-200 font-mono text-sm">192.168.1.105</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">Firmware Version</span>
                      <p className="font-bold text-slate-200 font-mono text-sm">v2.3.1</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">Up-Time</span>
                      <p className="font-bold text-slate-200 text-sm">14 days, 6 hours</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 font-medium">Wi-Fi Signal strength</span>
                      <p className="font-bold text-emerald-400 text-sm">Strong (-45 dBm)</p>
                    </div>
                  </div>

                  {/* Battery Info progress bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Device Battery Life</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>

                {/* Sensor Readings panel */}
                <div className="lg:col-span-6 glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                  <h3 className="font-bold text-white text-base">Active Telemetry Payload</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">MQ-2 Gas Sensor</span>
                      <p className="text-xl font-extrabold text-blue-400 font-mono">{ppm} ppm</p>
                      <span className="text-[10px] text-emerald-400 block font-semibold">Active ✅</span>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Load Cell weight</span>
                      <p className="text-xl font-extrabold text-emerald-400 font-mono">{weight} kg</p>
                      <span className="text-[10px] text-emerald-400 block font-semibold">Active ✅</span>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">MCU Temp Sensor</span>
                      <p className="text-xl font-extrabold text-slate-200 font-mono">{temperature}°C</p>
                      <span className="text-[10px] text-emerald-400 block font-semibold">Active ✅</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Connection Flow Diagram (With animated dot flowing lines) */}
              <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-6">
                <div>
                  <h3 className="font-bold text-white text-base">Data Sync Pipeline Diagram</h3>
                  <p className="text-slate-400 text-xs">Visual schematic mapping sensor telemetry uploads to the dashboard UI interface.</p>
                </div>

                {/* Flow boxes */}
                <div className="flex flex-col xl:flex-row items-center justify-between gap-4 py-4 px-2 bg-slate-900/40 rounded-xl border border-slate-800/60">
                  
                  {/* Step 1: MQ-2 */}
                  <div className="w-full xl:w-48 p-4 glass-card glass-card-hover rounded-xl flex items-center gap-3 shadow-lg cursor-default">
                    <span className="text-2xl">💨</span>
                    <div>
                      <p className="font-bold text-white text-sm">MQ2 Sensor</p>
                      <p className="text-[10px] text-slate-500">Collects gas density</p>
                    </div>
                  </div>

                  {/* Flow arrow 1 */}
                  <div className="w-8 h-8 xl:w-20 xl:h-6 flex items-center justify-center rotate-90 xl:rotate-0">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 80 24" fill="none">
                      <path d="M0,12 H76 M68,4 L76,12 L68,20" stroke="currentColor" strokeWidth="3" className="animate-dash-flow" />
                    </svg>
                  </div>

                  {/* Step 2: ESP32 */}
                  <div className="w-full xl:w-48 p-4 glass-card glass-card-hover rounded-xl flex items-center gap-3 shadow-lg cursor-default">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-bold text-white text-sm">ESP32 Unit</p>
                      <p className="text-[10px] text-slate-500">Transmits payload</p>
                    </div>
                  </div>

                  {/* Flow arrow 2 */}
                  <div className="w-8 h-8 xl:w-20 xl:h-6 flex items-center justify-center rotate-90 xl:rotate-0">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 80 24" fill="none">
                      <path d="M0,12 H76 M68,4 L76,12 L68,20" stroke="currentColor" strokeWidth="3" className="animate-dash-flow" />
                    </svg>
                  </div>

                  {/* Step 3: Firebase Cloud */}
                  <div className="w-full xl:w-48 p-4 glass-card glass-card-hover rounded-xl flex items-center gap-3 shadow-lg cursor-default">
                    <span className="text-2xl">☁️</span>
                    <div>
                      <p className="font-bold text-white text-sm">Firebase Cloud</p>
                      <p className="text-[10px] text-slate-500">Realtime database store</p>
                    </div>
                  </div>

                  {/* Flow arrow 3 */}
                  <div className="w-8 h-8 xl:w-20 xl:h-6 flex items-center justify-center rotate-90 xl:rotate-0">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 80 24" fill="none">
                      <path d="M0,12 H76 M68,4 L76,12 L68,20" stroke="currentColor" strokeWidth="3" className="animate-dash-flow" />
                    </svg>
                  </div>

                  {/* Step 4: AI Engine */}
                  <div className="w-full xl:w-48 p-4 glass-card glass-card-hover rounded-xl flex items-center gap-3 shadow-lg cursor-default border-blue-500/20">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="font-bold text-white text-sm">AI Engine</p>
                      <p className="text-[10px] text-slate-500">Linear forecasting model</p>
                    </div>
                  </div>

                  {/* Flow arrow 4 */}
                  <div className="w-8 h-8 xl:w-20 xl:h-6 flex items-center justify-center rotate-90 xl:rotate-0">
                    <svg className="w-full h-full text-blue-500" viewBox="0 0 80 24" fill="none">
                      <path d="M0,12 H76 M68,4 L76,12 L68,20" stroke="currentColor" strokeWidth="3" className="animate-dash-flow" />
                    </svg>
                  </div>

                  {/* Step 5: Dashboard */}
                  <div className="w-full xl:w-48 p-4 bg-blue-600 border border-blue-500 rounded-xl flex items-center gap-3 shadow-lg">
                    <span className="text-2xl">💻</span>
                    <div>
                      <p className="font-bold text-white text-sm">Dashboard UI</p>
                      <p className="text-[10px] text-blue-200">Renders telemetry live</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Sync timeline event list */}
              <div className="glass-card rounded-2xl p-5 shadow-lg text-left space-y-4">
                <h3 className="font-bold text-white text-base">Recent Sync Packet Log Timeline (2s Loop)</h3>
                
                <div className="relative border-l border-slate-700 ml-3 pl-6 space-y-4 text-xs">
                  {syncLogs.slice().reverse().map((log) => (
                    <div key={log.id} className="relative">
                      {/* Chronology circle bullet */}
                      <span className={`absolute -left-[30px] top-0.5 w-4.5 h-4.5 rounded-full border border-slate-900 flex items-center justify-center text-[8px] font-bold text-white
                        ${log.status === 'danger' ? 'bg-red-500 animate-pulse' : (log.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500')}
                      `}>
                        {log.status === 'danger' ? '!' : (log.status === 'warning' ? 'w' : '✓')}
                      </span>
                      <div>
                        <span className="font-mono text-slate-500 font-semibold">{log.time}</span>
                        <p className="text-slate-300 font-medium mt-0.5">{log.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* FOOTER INTERACTIVE SIMULATION CONTROLLER (Floating bottom drawer) */}
      <footer className="bg-slate-950/80 border-t border-cyan-500/10 p-3 sticky bottom-0 z-40 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 shadow-2xl shadow-slate-950/50">
        <div className="text-left space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚙️</span>
            <span className="text-xs font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-wider">Simulation Control Deck</span>
          </div>
          <p className="text-[10px] text-slate-400">Force environment states to inspect dynamic telemetry charts and alerts responsiveness.</p>
        </div>
        
        {/* Sim buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerSimulation('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer
              ${simulationMode === 'normal' 
                ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }
            `}
          >
            🟢 Normal Mode
          </button>
          
          <button 
            onClick={() => triggerSimulation('leak')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer
              ${simulationMode === 'leak' 
                ? 'bg-red-600 border-red-500 text-white shadow-md animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }
            `}
          >
            🔴 Gas Leak (650 ppm)
          </button>

          <button 
            onClick={() => triggerSimulation('low_gas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer
              ${simulationMode === 'low_gas' 
                ? 'bg-amber-600 border-amber-500 text-white shadow-md' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }
            `}
          >
            🟡 Low Gas (14%)
          </button>
        </div>
      </footer>

    </div>
  );
}

export default App;
