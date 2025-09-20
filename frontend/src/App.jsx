import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Recorder from './components/Recorder';
import UploadForm from './components/UploadForm';
import TranscriptView from './components/TranscriptView';

export default function App() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState(null);
  const [themeIntensity, setThemeIntensity] = useState('normal');

  // Dynamic theme intensity based on user interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate distance from center
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

      // Adjust theme intensity based on mouse position
      const intensity = Math.min(distance / maxDistance, 1);
      setThemeIntensity(intensity > 0.7 ? 'high' : intensity > 0.4 ? 'normal' : 'low');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen gradient-bg ${themeIntensity === 'high' ? 'space-pulse' : ''}`}>
      {/* Dynamic Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebula Effects */}
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>

        {/* Particle Effects */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>

        {/* Meteor Shower */}
        <div className="meteor meteor-1"></div>
        <div className="meteor meteor-2"></div>
        <div className="meteor meteor-3"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 md:p-8 lg:p-12">
        <Header />

        <main className="max-w-7xl mx-auto mt-8">
          {/* Welcome section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-4 space-glow">
              Transform Your Learning Experience
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Record lectures, upload audio files, and get AI-powered transcripts and summaries instantly.
              Study smarter with our intelligent lecture processing system.
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column - Recording & Upload */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recording section */}
              <div className="card group space-glow border border-emerald-500/20 hover:border-emerald-400/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-emerald-400 to-cyan-400 flex items-center justify-center space-float">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="3" fill="white"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-400">Live Recording</h3>
                </div>
                <Recorder setTranscript={setTranscript} setSummary={setSummary} />
              </div>

              {/* Upload section */}
              <div className="card group space-glow border border-blue-500/20 hover:border-blue-400/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-400 to-purple-400 flex items-center justify-center space-float">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400">File Upload</h3>
                </div>
                <UploadForm setTranscript={setTranscript} setSummary={setSummary} />
              </div>
            </div>

            {/* Right column - Results */}
            <div className="lg:col-span-2">
              <div className="card group space-glow border border-purple-500/20 hover:border-purple-400/40">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center space-float">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">AI-Generated Content</h3>
                </div>
                <TranscriptView transcript={transcript} setSummary={setSummary} summary={summary} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-slate-400 text-sm">
            <p className="cosmic-text">Built with ❤️ by FlexBox Ninjas | Powered by AI</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
