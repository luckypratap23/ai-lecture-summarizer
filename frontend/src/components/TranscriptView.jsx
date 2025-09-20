import React, { useState } from 'react';
import SummaryCard from './SummaryCard';

export default function TranscriptView({ transcript, summary }) {
  const [activeTab, setActiveTab] = useState('transcript');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('transcript')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'transcript'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          Transcript
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === 'summary'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          AI Summary
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'transcript' ? (
          /* Transcript Tab */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-200">Full Transcript</h4>
              {transcript && (
                <div className="text-xs text-slate-400">
                  {transcript.split('\n').length} lines • {transcript.length} characters
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-2 px-2 py-1 bg-slate-800/80 rounded text-xs text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  Transcript
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 pt-12">
                <div className="text-sm text-slate-300 whitespace-pre-wrap max-h-96 overflow-auto leading-relaxed">
                  {transcript ? (
                    <div className="prose prose-invert max-w-none">
                      {transcript.split('\n').map((line, index) => (
                        <div key={index} className="mb-2 hover:bg-slate-700/30 p-1 rounded transition-colors">
                          {line || <span className="text-slate-500">•</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                          <path d="M9 12l2 2 4-4"/>
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <p className="text-slate-400 mb-2">No transcript available</p>
                      <p className="text-sm text-slate-500">
                        Record a lecture or upload an audio file to generate a transcript
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Summary Tab */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-200">AI-Generated Study Resources</h4>
              {summary && (
                <div className="text-xs text-slate-400">
                  AI-powered analysis complete
                </div>
              )}
            </div>

            <div className="relative">
              {summary ? (
                <div className="space-y-4">
                  <SummaryCard data={summary} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <circle cx="12" cy="17" r="1"/>
                    </svg>
                  </div>
                  <p className="text-slate-400 mb-2">No summary available</p>
                  <p className="text-sm text-slate-500">
                    Generate a transcript first to create AI-powered study resources
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {transcript && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700">
          <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
            Copy Transcript
          </button>
          <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
            Download Text
          </button>
          <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
            Share
          </button>
        </div>
      )}
    </div>
  );
}
