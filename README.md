# 🌟 AI Lecture Summarizer

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![Google AI](https://img.shields.io/badge/Google_Generative_AI-0.24.1-orange.svg)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-38B2AC.svg)](https://tailwindcss.com/)

A cutting-edge web application that transforms audio lectures into comprehensive study materials using advanced AI technology. Upload audio/video files or record live lectures to get instant transcripts, AI-generated summaries, key points, flashcards, and presentation slides.

## 🚀 Live Demo

[View Live Application](https://your-app-url.com) | [Watch Demo Video](https://your-demo-video.com)

## ✨ Key Features

### 🎙️ **Audio Processing**
- **Multi-Format Support**: MP3, WAV, MP4, WebM, M4A, AAC, OGG, FLAC
- **Live Recording**: Record lectures directly in the browser
- **File Upload**: Drag & drop interface with progress tracking
- **Large File Support**: Up to 50MB file size limit

### 🤖 **AI-Powered Analysis**
- **Intelligent Transcription**: Accurate speech-to-text conversion
- **Smart Summarization**: 3-5 sentence lecture summaries
- **Key Points Extraction**: 6-12 bullet points highlighting main concepts
- **Flashcard Generation**: 5 study questions with answers
- **Slide Creation**: 6-10 presentation slide points

### 🎨 **Modern UI/UX**
- **Dynamic Space Theme**: Animated star field with floating nebulas
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Elements**: Hover effects and smooth animations
- **Glassmorphism**: Modern card-based interface design
- **Accessibility**: Reduced motion support and keyboard navigation

### 🔧 **Technical Excellence**
- **Real-time Processing**: Instant feedback and progress indicators
- **Error Handling**: Comprehensive error messages and recovery
- **Performance Optimized**: Hardware-accelerated animations
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern React with hooks and concurrent features
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Vite 7.1.6** - Fast build tool and development server
- **Axios 1.12.2** - HTTP client for API communication

### Backend
- **Node.js 18+** - JavaScript runtime environment
- **Express 5.1.0** - Web application framework
- **Google Generative AI 0.24.1** - AI transcription and summarization
- **Multer 2.0.2** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing

### Development Tools
- **ESLint 9.35.0** - Code linting and formatting
- **Nodemon 3.1.10** - Development server auto-reload
- **Vite 7.1.6** - Frontend build tool

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Google AI API Key** (for Gemini AI functionality)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-lecture-summarizer.git
cd ai-lecture-summarizer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

#### Backend Configuration
Create a `.env` file in the backend directory:
```env
GEMINI_API_KEY=your_google_ai_api_key_here
PORT=4000
```

#### Frontend Configuration
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=https://your-railway-backend-url.up.railway.app
```

For local development, you can use:
```env
REACT_APP_API_BASE_URL=https://ai-lecture-summarizer-backend-production.up.railway.app
```

### 5. Start the Application

#### Backend Server
```bash
cd backend
npm start
```
Server will run on the configured backend URL (Railway for production, localhost:4000 for development)

#### Frontend Development Server
```bash
cd frontend
npm run dev
```
Application will open at `http://localhost:5173`

## 📖 Usage Guide

### 🎙️ Recording a Live Lecture
1. Click the **"Live Recording"** section
2. Grant microphone permissions when prompted
3. Click **"Start Recording"** to begin
4. Speak clearly into your microphone
5. Click **"Stop Recording"** when finished
6. Wait for AI processing to complete
7. View your transcript and AI-generated study materials

### 📁 Uploading Audio/Video Files
1. Click the **"File Upload"** section
2. Drag and drop your audio/video file or click to browse
3. Supported formats: MP3, WAV, MP4, WebM, M4A, AAC, OGG, FLAC
4. Maximum file size: 50MB
5. Wait for upload and processing to complete
6. Review your generated study materials

### 📚 Using Generated Content
- **Transcript**: Full text transcription of your audio
- **Summary**: 3-5 sentence overview of the lecture
- **Key Points**: Bullet-point list of main concepts
- **Flashcards**: Study questions and answers
- **Slides**: Presentation-ready bullet points

## 🔌 API Documentation

### Base URL
For development: `http://localhost:4000/api`
For production: Uses the configured Railway backend URL (set via `REACT_APP_API_BASE_URL` environment variable)

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status and environment information.

#### Transcription
```http
POST /api/transcribe
Content-Type: multipart/form-data

file: <audio/video file>
```

**Response:**
```json
{
  "transcript": "Full text transcription of the audio..."
}
```

#### Summarization
```http
POST /api/summarize
Content-Type: application/json

{
  "transcript": "Text to summarize..."
}
```

**Response:**
```json
{
  "summary": "3-5 sentence summary",
  "key_points": ["point 1", "point 2", "point 3"],
  "flashcards": [
    {"question": "Q1?", "answer": "A1"},
    {"question": "Q2?", "answer": "A2"}
  ],
  "slides": ["slide 1", "slide 2", "slide 3"]
}
```

## 📁 Project Structure

```
ai-lecture-summarizer/
├── backend/                 # Backend server
│   ├── routes/             # API route handlers
│   │   ├── transcribe.js   # Audio transcription endpoint
│   │   └── summarize.js    # Text summarization endpoint
│   ├── utils/              # Utility functions
│   │   ├── geminiClient.js # Google AI client (original)
│   │   └── geminiClient_fixed.js # Enhanced AI client
│   ├── uploads/            # Temporary file storage
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api.js          # API configuration and endpoints
│   │   ├── components/     # React components
│   │   │   ├── Header.jsx  # Application header
│   │   │   ├── UploadForm.jsx # File upload interface
│   │   │   ├── Recorder.jsx # Audio recording component
│   │   │   ├── TranscriptView.jsx # Transcript display
│   │   │   └── SummaryCard.jsx # Summary display
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # Application entry point
│   │   ├── App.css        # Component styles
│   │   └── index.css      # Global styles
│   ├── .env               # Environment variables
│   ├── .env.example       # Environment variables template
│   ├── index.html         # HTML template
│   └── package.json       # Frontend dependencies
├── FIX_COMPLETED.md       # Recent fixes documentation
├── TODO.md               # Development tasks
├── UI_Improvements_TODO.md # UI enhancement tasks
└── README.md             # This file
```

## 🔧 Recent Fixes & Improvements

### ✅ **Deployment Configuration - COMPLETELY FIXED**
- **Root Cause**: Frontend components hardcoded to `localhost:4000`
- **Solution**: Implemented environment-based API configuration
- **Files Modified**:
  - `frontend/.env` - Production Railway URL configuration
  - `frontend/.env.example` - Environment template for developers
  - `frontend/src/api.js` - Centralized API configuration
  - `frontend/src/components/Recorder.jsx` - Updated to use API service
  - `frontend/src/components/UploadForm.jsx` - Updated to use API service
  - `README.md` - Updated documentation

### 🎨 **Dynamic Space Dark Theme**
- **Features**: Animated star field, floating nebulas, particle effects
- **Interactive**: Mouse-responsive theme intensity
- **Performance**: Hardware-accelerated animations
- **Accessibility**: Reduced motion support

### 🚀 **Enhanced User Experience**
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload and processing progress
- **Error Handling**: Specific error messages for different scenarios
- **Multi-Format Support**: 8+ audio/video formats supported

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style and structure
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance
- Test across different browsers and devices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for the Generative AI API
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **FlexBox Ninjas** for the original project concept

## 📞 Contact & Support

- **Email**: your-email@example.com
- **GitHub Issues**: [Report Issues](https://github.com/your-username/ai-lecture-summarizer/issues)
- **Discussions**: [Join Discussion](https://github.com/your-username/ai-lecture-summarizer/discussions)

## 🎯 Hackathon Features

This project was developed for hackathon submission with the following highlights:

### 🏆 **Innovation Points**
- Real-time AI processing with instant feedback
- Dynamic space-themed UI with interactive elements
- Comprehensive error handling and user guidance
- Multi-modal input support (recording + file upload)

### 📊 **Technical Achievements**
- Full-stack web application with modern architecture
- Integration with Google Generative AI API
- Responsive design with mobile optimization
- Performance-optimized animations and effects

### 🎨 **User Experience**
- Intuitive drag-and-drop interface
- Real-time progress indicators
- Beautiful space-themed visual design
- Accessibility-first approach

---

**Built with ❤️ by FlexBox Ninjas**

*Transform your learning experience with AI-powered lecture summarization! 🚀*
