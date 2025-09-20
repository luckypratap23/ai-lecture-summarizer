import React from 'react';

export default function Header(){
  return (
    <header className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg overflow-hidden">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="drop-shadow-sm">
                {/* Ninja Body */}
                <path d="M32 8c-8 0-14 6-14 14 0 4 2 8 4 10l-2 8 8 4 8-4-2-8c2-2 4-6 4-10 0-8-6-14-14-14z"
                      fill="url(#ninjaGradient1)"/>

                {/* Ninja Head/Mask */}
                <path d="M18 22c0-6 4-10 8-10s8 4 8 10c0 2-1 4-2 5l-4 2-4-2c-1-1-2-3-2-5z"
                      fill="url(#ninjaGradient2)"/>

                {/* Mask Opening */}
                <ellipse cx="24" cy="24" rx="2" ry="1.5" fill="#1a1a2e"/>
                <ellipse cx="40" cy="24" rx="2" ry="1.5" fill="#1a1a2e"/>

                {/* Eyes */}
                <circle cx="24" cy="24" r="1" fill="#00f5ff" opacity="0.9"/>
                <circle cx="40" cy="24" r="1" fill="#00f5ff" opacity="0.9"/>

                {/* Hand Gesture */}
                <path d="M12 32c-2 0-4 2-4 4v8c0 2 2 4 4 4s4-2 4-4v-8c0-2-2-4-4-4z"
                      fill="url(#ninjaGradient1)"/>

                {/* Finger Pointing */}
                <rect x="8" y="36" width="2" height="6" rx="1" fill="url(#ninjaGradient2)"/>

                {/* Headband */}
                <path d="M16 18c0-2 2-4 4-4h8c2 0 4 2 4 4 0 1-1 2-2 2h-8c-1 0-2-1-2-2z"
                      fill="url(#ninjaGradient3)"/>

                {/* Lightning Bolt Background */}
                <path d="M50 12L42 20l4 4-8 8 6 6-4 4 8-8-6-6 8-8-4-4 6-6z"
                      fill="url(#lightningGradient)" opacity="0.3"/>

                {/* Gradients */}
                <defs>
                  <linearGradient id="ninjaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#1e40af"/>
                    <stop offset="100%" stopColor="#1e3a8a"/>
                  </linearGradient>

                  <linearGradient id="ninjaGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#4f46e5"/>
                  </linearGradient>

                  <linearGradient id="ninjaGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                  </linearGradient>

                  <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f5ff"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-2xl blur opacity-30"></div>
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              AI Lecture Summarizer
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-emerald-400">FlexBox Ninjas</span>
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
              <p className="text-sm text-slate-400">AI-Powered Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-emerald-400 font-medium">System Online</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-4 text-center md:text-left">
        <p className="text-lg text-slate-300 font-medium">
          🎙️ Record → 📝 Transcribe → 📚 Summarize → 🎯 Study
        </p>
      </div>
    </header>
  );
}
