require('dotenv').config();
const express = require('express');
const cors = require('cors');
const transcribeRouter = require('./routes/transcribe');
const summarizeRouter = require('./routes/summarize');
const app = express();

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  console.error('\nPlease set these environment variables in your .env file or system environment.');
  console.error('Example .env file:');
  console.error('GEMINI_API_KEY=your_api_key_here');
  process.exit(1);
}

console.log('✅ Environment variables validated successfully');

app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/transcribe', transcribeRouter);
app.use('/api/summarize', summarizeRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'Set' : 'Not set'
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`📊 Health check available at: http://localhost:${PORT}/api/health`);
});
