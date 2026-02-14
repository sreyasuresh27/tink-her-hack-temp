# The Pivot - Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm
- Gemini API Key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Setup Environment Variables**
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_api_key_here
```

3. **Start the Backend Server**
```bash
# Development mode (with hot reload)
npm run dev

# Or production mode
npm start
```

The server will run on `http://localhost:3000`

### ✅ Server Status
Visit `http://localhost:3000/api/health` to check if the server is running.

---

## 📋 API Endpoints

### 1. Decision Paralysis Breaker
**Endpoint:** `POST /api/decision-breaker`

Generate a 7-day action plan based on user's blocker.

**Request:**
```json
{
  "blocker": "I'm scared of starting over after a career break"
}
```

**Response:**
```json
{
  "success": true,
  "blocker": "I'm scared of starting over after a career break",
  "actionPlan": [
    "Day 1: Write down your fears (10 min)",
    "Day 2: Watch 1 success story (5 min)",
    ...
  ],
  "generatedAt": "2024-02-13T10:30:00.000Z"
}
```

---

### 2. Interview Prep
**Endpoint:** `POST /api/interview-prep`

Generate interview preparation strategy for specific fears.

**Request:**
```json
{
  "fear": "I'm afraid of being asked about my career gap"
}
```

**Response:**
```json
{
  "success": true,
  "fear": "I'm afraid of being asked about my career gap",
  "prepPlan": {
    "fullPlan": "...",
    "sections": {
      "rootCause": "...",
      "exercises": "...",
      "questions": "...",
      "mindset": "..."
    }
  },
  "generatedAt": "2024-02-13T10:30:00.000Z"
}
```

---

### 3. Resume Analysis
**Endpoint:** `POST /api/analyze-resume`

Analyze resume for skills, gaps, and recommendations.

**Request:**
```json
{
  "resumeText": "Your resume text here..."
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": 5,
    "careerGaps": ["18 months"],
    "improvements": [...],
    "skillCombos": [...],
    "salaryRange": "$120k - $150k"
  }
}
```

---

### 4. Skill Gap Analysis
**Endpoint:** `POST /api/skill-gaps`

Analyze skill gaps for a target role.

**Request:**
```json
{
  "currentSkills": ["JavaScript", "React"],
  "targetRole": "Senior Full-Stack Developer"
}
```

**Response:**
```json
{
  "success": true,
  "skillAnalysis": "...",
  "generatedAt": "2024-02-13T10:30:00.000Z"
}
```

---

### 5. Health Check
**Endpoint:** `GET /api/health`

Check if the server is running.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-02-13T10:30:00.000Z"
}
```

---

## 🔧 How It Works

### Frontend → Backend Flow

1. **User Input** (Frontend)
   - User enters blocker/fear in dashboard

2. **API Request** (Frontend)
   - Frontend sends POST request to backend endpoint
   - Request includes user input

3. **AI Processing** (Backend)
   - Backend receives request
   - Uses Gemini API to generate personalized plan
   - Processes and structures response

4. **Response** (Backend → Frontend)
   - Backend sends JSON response with generated plan
   - Frontend displays results to user

---

## 🛡️ Security Notes

- ✅ API keys stored in `.env` (not in version control)
- ✅ CORS enabled for frontend requests
- ✅ Input validation on all endpoints
- ✅ Error handling for API failures
- ⚠️ Never expose API keys in frontend code

---

## 🚨 Troubleshooting

### "Connection error. Make sure backend server is running..."
- Check if server is running on `http://localhost:3000`
- Run `npm start` to start the server
- Check `.env` file has correct Gemini API key

### "Error generating plan"
- Verify Gemini API key is valid
- Check internet connection
- Check API rate limits (free tier has limits)

### CORS Error
- Backend CORS is enabled
- Make sure you're accessing from `http://localhost:3000`
- Frontend should be served from same origin or with proper CORS headers

---

## 📦 Project Structure

```
.
├── server.js           # Express backend server
├── package.json        # Dependencies
├── .env               # Environment variables (create from .env.example)
├── .env.example       # Example environment file
├── index.html         # Dashboard frontend
├── landing.html       # Landing page
├── login.html         # Login page
├── style.css          # Shared styles
└── README.md          # This file
```

---

## 🔄 Development Workflow

1. Start backend: `npm run dev`
2. Open frontend: `http://localhost:3000`
3. Test features from dashboard
4. Backend handles all AI/API calls

---

## 📝 API Response Format

All endpoints follow this format:

**Success:**
```json
{
  "success": true,
  "data": "...",
  "generatedAt": "timestamp"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🎯 Next Steps

1. ✅ Set up `.env` with Gemini API key
2. ✅ Install dependencies: `npm install`
3. ✅ Start server: `npm start`
4. ✅ Open dashboard and test features
5. ✅ Deploy to production (Heroku, Vercel, etc.)

---

## 📞 Support

For issues or questions:
- Check `.env` configuration
- Verify Gemini API key is active
- Check console logs for detailed errors
- Ensure all dependencies are installed

---

**Happy coding! 🚀**
