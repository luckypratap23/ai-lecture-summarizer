import React from 'react';

export default function SummaryCard({ data }) {
  if (!data) return null;

  // Convert JSON data to readable text format
  const formatSummaryAsText = (jsonData) => {
    try {
      // If it's already a string, return it
      if (typeof jsonData === 'string') {
        return jsonData;
      }

      // If it's an object with structured data, format it nicely
      if (jsonData && typeof jsonData === 'object') {
        let text = '';

        // Add summary if exists
        if (jsonData.summary) {
          text += jsonData.summary + '\n\n';
        }

        // Add key points if exists
        if (jsonData.key_points && Array.isArray(jsonData.key_points) && jsonData.key_points.length > 0) {
          text += 'Key Points:\n';
          jsonData.key_points.forEach((point, index) => {
            text += `• ${point}\n`;
          });
          text += '\n';
        }

        // Add flashcards if exists
        if (jsonData.flashcards && Array.isArray(jsonData.flashcards) && jsonData.flashcards.length > 0) {
          text += 'Study Questions:\n';
          jsonData.flashcards.forEach((card, index) => {
            text += `Q: ${card.question}\n`;
            text += `A: ${card.answer}\n\n`;
          });
        }

        // Add slides if exists
        if (jsonData.slides && Array.isArray(jsonData.slides) && jsonData.slides.length > 0) {
          text += 'Main Topics:\n';
          jsonData.slides.forEach((slide, index) => {
            text += `• ${slide}\n`;
          });
        }

        return text.trim();
      }

      // If it's raw text, return as is
      return String(jsonData);
    } catch (error) {
      console.error('Error formatting summary:', error);
      return 'Error displaying summary content.';
    }
  };

  const summaryText = formatSummaryAsText(data);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600/30">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-lg">📝</span>
          </div>
          <h5 className="font-semibold text-blue-400">AI Summary</h5>
        </div>
        <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-sm">
          {summaryText || 'No summary content available.'}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
          📋 Copy Summary
        </button>
        <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
          💾 Export Text
        </button>
        <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
          📤 Share
        </button>
        <button className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">
          🖨️ Print
        </button>
      </div>
    </div>
  );
}
