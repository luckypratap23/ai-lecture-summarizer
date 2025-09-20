import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function Recorder({ setTranscript, setSummary }) {
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (recording) {
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [recording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setupAudioAnalysis = (stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    microphone.connect(analyser);
    analyser.fftSize = 256;

    const updateAudioLevel = () => {
      if (recording) {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(Math.min(average / 2, 100)); // Normalize to 0-100
        requestAnimationFrame(updateAudioLevel);
      }
    };

    updateAudioLevel();
    analyserRef.current = analyser;
  };

  async function startRecording(){
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      streamRef.current = stream;
      setupAudioAnalysis(stream);

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await uploadBlob(blob);
      };

      mediaRecorderRef.current.start(1000); // Collect data every second
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Could not access microphone. Please check permissions and try again.');
    }
  }

  function stopRecording(){
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  }

  async function uploadBlob(blob) {
    setProcessing(true);
    setTranscript('');
    setSummary(null);

    try {
      const fd = new FormData();
      const file = new File([blob], `recording_${Date.now()}.webm`, { type: blob.type });
      fd.append('file', file);

      console.log(`Uploading recording: ${file.name}, Size: ${file.size} bytes`);

      const res = await axios.post('http://localhost:4000/api/transcribe', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000
      });

      const transcript = res.data.transcript || '';
      setTranscript(transcript);

      if (!transcript.trim()) {
        throw new Error('No transcript was generated from the recording. Please try recording again.');
      }

      console.log('Transcription completed, generating summary...');
      const sres = await axios.post('http://localhost:4000/api/summarize', { transcript });
      setSummary(sres.data.summary);

    } catch (err) {
      console.error('Recording upload error:', err);

      let errorMessage = 'Recording upload/transcription failed.';

      if (err.response) {
        const { error, details } = err.response.data;
        errorMessage = `${error}: ${details}`;
      } else if (err.request) {
        errorMessage = 'Network error: Unable to connect to the server. Please ensure the backend server is running.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      alert(errorMessage);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Recording Controls */}
      <div className="flex flex-col items-center space-y-4">
        {/* Recording Button */}
        <button
          onClick={recording ? stopRecording : startRecording}
          disabled={processing}
          className={`relative w-24 h-24 rounded-full font-semibold text-lg transition-all duration-300 transform ${
            recording
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25'
              : processing
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 shadow-lg shadow-emerald-500/25 hover:scale-105'
          } text-white`}
        >
          {processing ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          ) : recording ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="mx-auto">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="mx-auto">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          )}
        </button>

        {/* Recording Status */}
        <div className="text-center">
          <div className="text-sm font-medium text-slate-300">
            {processing ? 'Processing Recording...' : recording ? 'Recording Active' : 'Ready to Record'}
          </div>
          {recording && (
            <div className="text-lg font-mono text-emerald-400 mt-1">
              {formatTime(recordingTime)}
            </div>
          )}
        </div>

        {/* Audio Level Indicator */}
        {recording && (
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-400">Audio Level:</div>
            <div className="flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-4 rounded-full transition-all duration-100 ${
                    i < Math.floor(audioLevel / 10)
                      ? 'bg-gradient-to-t from-emerald-400 to-green-400'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="text-xs text-slate-400 bg-slate-800/50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <div>
            <p className="font-medium text-slate-300 mb-1">Recording Tips:</p>
            <ul className="space-y-1 text-slate-400">
              <li>• Speak clearly into your microphone</li>
              <li>• Find a quiet environment</li>
              <li>• For longer lectures, consider using file upload</li>
              <li>• Check your audio levels above while recording</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
