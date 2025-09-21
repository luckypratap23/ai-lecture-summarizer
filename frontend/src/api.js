// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// API Endpoints
export const API_ENDPOINTS = {
  transcribe: `${API_BASE_URL}/api/transcribe`,
  summarize: `${API_BASE_URL}/api/summarize`,
  health: `${API_BASE_URL}/api/health`
};

// Axios configuration for API calls
export const apiConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: 300000 // 5 minutes for large files
};

export default API_BASE_URL;
