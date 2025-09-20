import React, { useRef, useState, useCallback } from 'react';
import axios from 'axios';

export default function UploadForm({ setTranscript, setSummary }) {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file) => {
    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      alert(`File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds the 50MB limit. Please choose a smaller file.`);
      return;
    }

    // Validate file type
    const allowedTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/wave',
      'audio/mp4', 'audio/m4a', 'audio/aac', 'audio/ogg',
      'audio/webm', 'audio/flac', 'video/mp4', 'video/webm',
      'video/quicktime', 'video/x-msvideo'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(`File type "${file.type}" is not supported. Please upload an audio or video file (MP3, WAV, MP4, WebM, etc.).`);
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  async function handleUpload(e){
    e.preventDefault();
    if (!selectedFile) return alert('Please select a file to upload.');

    setLoading(true);
    setUploadProgress(0);
    setTranscript('');
    setSummary(null);

    try {
      const fd = new FormData();
      fd.append('file', selectedFile);

      console.log(`Uploading file: ${selectedFile.name}, Size: ${selectedFile.size} bytes, Type: ${selectedFile.type}`);

      const res = await axios.post('http://localhost:4000/api/transcribe', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000, // 5 minute timeout for large files
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      const transcript = res.data.transcript || '';
      setTranscript(transcript);

      if (!transcript.trim()) {
        throw new Error('No transcript was generated from the audio file. The file may be corrupted or in an unsupported format.');
      }

      console.log('Transcription completed, generating summary...');
      const sres = await axios.post('http://localhost:4000/api/summarize', { transcript });
      setSummary(sres.data.summary);

    } catch (err) {
      console.error('Upload error:', err);

      let errorMessage = 'Upload/transcription failed.';

      if (err.response) {
        // Server responded with error status
        const { error, details } = err.response.data;
        errorMessage = `${error}: ${details}`;
      } else if (err.request) {
        // Network error
        errorMessage = 'Network error: Unable to connect to the server. Please ensure the backend server is running on port 4000.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout: The file is taking too long to process. Please try with a smaller file.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }

  const clearFile = () => {
    setSelectedFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-500/10 scale-105'
            : selectedFile
            ? 'border-green-400 bg-green-500/10'
            : 'border-slate-600 hover:border-slate-500 bg-slate-800/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileRef}
          type="file"
          accept="audio/*,video/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInputChange}
        />

        {selectedFile ? (
          // File selected state
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-green-400">{selectedFile.name}</p>
              <p className="text-sm text-slate-400">
                {(selectedFile.size / 1024 / 1024).toFixed(1)} MB • {selectedFile.type}
              </p>
            </div>
          </div>
        ) : (
          // No file selected state
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-slate-600 to-slate-500 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
            <div>
              <p className="font-medium text-slate-300 mb-2">
                {dragActive ? 'Drop your file here' : 'Drag & drop your audio/video file'}
              </p>
              <p className="text-sm text-slate-400 mb-4">
                or <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                  onClick={() => fileRef.current?.click()}
                >
                  browse files
                </button>
              </p>
              <p className="text-xs text-slate-500">
                Supports: MP3, WAV, MP4, WebM, M4A, AAC, OGG, FLAC (max 50MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {loading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Processing...</span>
            <span className="text-slate-400">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            selectedFile && !loading
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            'Upload & Process'
          )}
        </button>
        <button
          type="button"
          onClick={clearFile}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all duration-200 disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
