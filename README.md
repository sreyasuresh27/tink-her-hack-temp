# The Pivot - Resume-Based Dashboard System

## Overview

Your dashboard now works **entirely based on resume analysis**. Upload a resume → AI analyzes it → Dashboard and all features populate automatically with your data.

---

## Workflow ✅

### 1. **Resume Upload** (landing.html)
- User clicks "Analyze Resume" button
- Selects a text file with resume content
- File is sent to backend with AI analysis request

### 2. **AI Analysis** (server.js)
Backend uses Gemini AI to extract:
- Sreya Suresh
- Skills (JavaScript, React, Python, etc.)
- Years of experience
- Career gaps
- Specializations
- Potential target roles
- Market demand skills
- Improvement areas

### 3. **Database Storage** (Supabase)
- Analysis results stored in `resumes` table
- Data persists permanently
- Available for future reference

#

#### Skill-Sync Meter
- Calculates alignment based on detected skills
- Shows progress vs market demand
- Updates with each new resume

#### Skill Preparation Chart
- Lists all detected skills from resume
- Assigns competency levels
- Shows market demand for each skill
- Color-codes by gap size

#### Career Roadmap
- Projects timeline based on years of experience
- Shows path from current level → Senior role
- Calculates accelerated timeline

#### Growth Areas
- Lists improvements from AI analysis
- Prioritized recommendations
- Actionable growth paths

### 5. **AI-Powered Features** (Using Resume Context)
All features use resume data for personalization:

#### Decision Paralysis Breaker
- Takes user's blocker/challenge
- **Uses resume data**: Skills, experience, background
- Generates 7-day micro-action plan
- Tailored to user's specific background

#### Interview Prep
- Takes user's interview fear/challenge
- **Uses resume data**: Skills, target roles, experience
- Generates targeted prep strategy
- Specific to roles they're targeting

#### Skill Gaps Analysis
- Takes target role and current skills
- **Uses resume data**: Extracted skills, years of experience
- Prioritizes learning based on background
- Realistic timeline for skill acquisition

---

## Data Flow Diagram

```
Resume Upload (landing.html)
        ↓
  Read File Content
        ↓
  Send to Backend (server.js)
        ↓
  Gemini AI Analyzes Resume
        ↓
  Extract Skills, Experience, Gaps, etc.
        ↓
  Store in Supabase Database
        ↓
  Return Analysis to Frontend
        ↓
  Dashboard Loads Data (index.html)
        ↓
  ┌─────────────────────────────────────┐
  │ Resume Summary Card                 │
  │ Skill-Sync Meter                    │
  │ Skill Preparation Chart             │
  │ Career Roadmap                      │
  │ Growth Areas                        │
  └─────────────────────────────────────┘
        ↓
  User Interacts with Features
        ↓
  ┌─────────────────────────────────────┐
  │ Decision Breaker (uses resume)      │
  │ Interview Prep (uses resume)        │
  │ Skill Gaps (uses resume)            │
  │ Learning Feed (curated for you)     │
  └─────────────────────────────────────┘
```

---

## Setup & Testing

### Quick Setup (5 min)

1. **Set environment variables** (.env):
```
GEMINI_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
PORT=3000
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start backend server**:
```bash
npm start
```

4. **Test workflow**:
   - Open http://localhost:3000/landing.html
   - Click "Analyze Resume"
   - Upload a .txt file with resume content
   - Check Supabase dashboard for stored data
   - Go to http://localhost:3000/index.html
   - Dashboard should auto-populate from database

---

## Resume Format (Text File)

Your resume text file should include:

```
John Doe

5 years of software development experience

Skills:
- JavaScript (5 years)
- React (3 years)
- Node.js (4 years)
- Python (2 years)
- SQL and MongoDB
- Git and CI/CD

Experience:
- Senior Frontend Developer at TechCorp (2020-2024)
- Full Stack Developer at StartupXYZ (2019-2020)
- Junior Developer at OldCo (2018-2019)

Education:
- B.S. Computer Science, State University

Key Achievements:
- Led React migration (200+ components)
- Reduced bundle size by 40%
- Mentored 5+ junior developers
```

The AI will extract skills, calculate experience, identify gaps, and suggest opportunities.

---

## Features Using Resume Data

### 1. Resume Summary Card
**Shows**: Name, Experience, Skills Count, Target Roles, Top Skills

**Updated when**: New resume uploaded

### 2. Skill-Sync Meter
**Shows**: % alignment based on detected skills

**Formula**: `(Number of Skills × 15) + 40`

**Example**: 4 skills detected = 60 + 40 = 100%

### 3. Skill Preparation Chart
**Shows**: Each detected skill with competency level

**Levels**: Based on resume mentions
- Recent/Primary skill: 70-90%
- Secondary skill: 50-70%
- Foundational: 30-50%

### 4. Career Roadmap
**Shows**: Timeline from current level to senior

**Timeline**: 
- Current: User's experience level
- Mid-level: Half of time to senior
- Senior: Full timeline (18mo - years of experience × 3)

**Example**: 5 years exp = 3 months to senior

### 5. Growth Areas
**Shows**: AI-recommended improvements

**Source**: AI analysis of resume gaps vs market demand

### 6. Decision Breaker
**Input**: User's challenge/blocker

**Context**: 
- Their skills from resume
- Their years of experience
- Their background

**Output**: Personalized 7-day micro-action plan

### 7. Interview Prep
**Input**: Interview fear/challenge

**Context**:
- Their skills from resume
- Their target roles from resume
- Their years of experience

**Output**: Targeted interview preparation strategy

---

## Backend API Endpoints

### Upload & Analyze Resume
```
POST /api/upload-resume
Body: {
  resumeText: "resume content...",
  fileName: "resume.txt",
  userId: "user123"
}
Response: {
  success: true,
  analysis: {
    fullName: "John Doe",
    skills: ["JavaScript", "React", ...],
    yearsExperience: 5,
    potentialRoles: ["Senior Dev", ...],
    improvements: ["AWS Certification", ...],
    ...
  }
}
```

### Get Stored Resumes
```
GET /api/resumes?userId=user123
Response: {
  count: 2,
  resumes: [...]
}
```

### Analyze Stored Resume
```
POST /api/analyze-stored-resume
Body: {
  resumeId: "uuid-from-database"
}
Response: {
  success: true,
  resume: {...},
  analysis: {...}
}
```

### Decision Breaker
```
POST /api/decision-breaker
Body: {
  blocker: "Based on resume (5yr exp, skills: React, Python...), user blocker: ..."
}
Response: {
  actionPlan: ["Day 1: ...", "Day 2: ...", ...]
}
```

### Interview Prep
```
POST /api/interview-prep
Body: {
  fear: "User background: 5yr exp, skills: React, target roles: Senior Dev. Fear: ..."
}
Response: {
  prepPlan: {...}
}
```

---

## Troubleshooting

### Resume not appearing on dashboard
1. Check browser console for errors
2. Verify backend server is running (`npm start`)
3. Check Supabase table has data
4. Try refreshing dashboard page

### "Supabase not configured" message
1. Verify .env file has SUPABASE_URL and SUPABASE_ANON_KEY
2. Create tables in Supabase (see DATABASE_SETUP.md)
3. Restart server after updating .env

### Dashboard features show generic data
1. This is normal before resume upload
2. Upload resume on landing page
3. Features will populate with your data

### Decision Breaker/Interview Prep not using resume data
1. Ensure resume was successfully uploaded
2. Check browser console for API errors
3. Verify resumeContext variable is set (in console: `resumeContext`)

---

## Files Modified/Created

### Modified:
- `package.json` - Added @supabase/supabase-js, multer
- `.env.example` - Added Supabase credentials
- `server.js` - Added resume storage endpoints
- `landing.html` - Sends resume to backend API
- `index.html` - Loads and displays resume data, uses context

### Created:
- `DATABASE_SETUP.md` - Database setup guide
- `SETUP_GUIDE.md` - Quick setup instructions
- `README.md` - This file

### Database Tables:
- `resumes` - Stores resume text and AI analysis
- `dashboard_analytics` - Tracks user metrics

---

## Next Steps

1. ✅ Upload a resume
2. ✅ See dashboard auto-populate
3. ✅ Use Decision Breaker with resume context
4. ✅ Use Interview Prep with resume context
5. Test all features with different resumes
6. Add authentication for multi-user support
7. Deploy backend to production

---

## Example Results

### After Resume Upload:
```
✅ Resume: "John Doe"
   - 5 years experience
   - 8 skills detected
   - 3 potential roles identified
   
Skills Found:
  - JavaScript (75%)
  - React (65%)
  - Python (55%)
  - Node.js (70%)

Growth Areas:
  ↗️ AWS Certification
  ↗️ System Design Patterns
  ↗️ DevOps Fundamentals

Career Path:
  💼 Current: Mid-Level (5 years)
  🚀 Senior Role: ~3 months
```

---

## Support

For issues:
1. Check server console: `npm start`
2. Check browser DevTools console
3. Visit https://cute-biscotti-b3a488.netlify.app/login.html
4. See DATABASE_SETUP.md for database help


