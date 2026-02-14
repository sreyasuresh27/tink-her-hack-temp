# Database Setup Guide - The Pivot Platform

This guide explains how to set up Supabase for storing and analyzing resume uploads.

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Create a new project:
   - **Name**: `the-pivot`
   - **Password**: Create a strong password
   - **Region**: Choose closest to your location
5. Wait for project initialization (~2 minutes)

### 2. Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `SUPABASE_ANON_KEY`

### 3. Update Environment Variables

Edit `.env` file:
```
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3000
NODE_ENV=development
```

### 4. Create Database Tables

Go to **Supabase Dashboard** → **SQL Editor** and run this SQL:

```sql
-- Create resumes table
CREATE TABLE resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  resume_text TEXT NOT NULL,
  analysis JSONB,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX resumes_user_id_idx ON resumes(user_id);
CREATE INDEX resumes_uploaded_at_idx ON resumes(uploaded_at);

-- Create dashboard_analytics table
CREATE TABLE dashboard_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  resume_id UUID REFERENCES resumes(id),
  skill_sync_score INTEGER,
  decision_breaker_count INTEGER,
  interview_preps JSONB,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX analytics_user_id_idx ON dashboard_analytics(user_id);
```

### 5. Set Row Level Security (Optional but Recommended)

For production, enable RLS:

```sql
-- Enable RLS on resumes
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their own resumes
CREATE POLICY "Users can view their own resumes"
  ON resumes FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Start Server

```bash
npm start
```

You should see: `✅ Supabase: Connected`

## API Endpoints

### Upload & Analyze Resume
**POST** `/api/upload-resume`

Request:
```json
{
  "resumeText": "Your resume content here...",
  "fileName": "resume.txt",
  "userId": "user123"
}
```

Response:
```json
{
  "success": true,
  "message": "Resume uploaded and analyzed",
  "resume": {
    "id": "uuid-here",
    "user_id": "user123",
    "file_name": "resume.txt",
    "analysis": {
      "fullName": "John Doe",
      "skills": ["Python", "React", "Node.js"],
      "yearsExperience": 5,
      "careerGaps": [],
      "specializations": ["Full Stack Development"],
      "potentialRoles": ["Senior Developer", "Tech Lead"],
      "marketDemand": ["AI/ML", "Cloud Architecture"],
      "improvements": ["AWS certification", "System Design"]
    }
  }
}
```

### Get All Resumes
**GET** `/api/resumes?userId=user123`

Response:
```json
{
  "success": true,
  "count": 2,
  "resumes": [
    {
      "id": "uuid-1",
      "file_name": "resume_2024.txt",
      "analysis": {...},
      "uploaded_at": "2024-02-13T10:30:00Z"
    }
  ]
}
```

### Analyze Stored Resume
**POST** `/api/analyze-stored-resume`

Request:
```json
{
  "resumeId": "uuid-here"
}
```

Response returns the stored resume with its analysis.

## Dashboard Integration

The dashboard will now:

1. **On Resume Upload**: 
   - Send resume text to backend
   - Backend analyzes with Gemini AI
   - Results stored in Supabase `resumes` table
   - Analysis displayed on dashboard

2. **On Dashboard Load**:
   - Fetch all user's stored resumes
   - Display resume history
   - Show cumulative skills and metrics
   - Track improvements over time

3. **Dynamic Analysis**:
   - Skill Sync Meter: Updated from latest resume analysis
   - Skill Preparation Chart: Populated from extracted skills
   - Potential Roles: Suggested based on resume analysis
   - Career Roadmap: Generated from experience level

## Frontend Usage

Updated `index.html` dashboard will:

```javascript
// Fetch stored resumes on load
async function loadStoredResumes() {
  const response = await fetch('http://localhost:3000/api/resumes?userId=user123');
  const data = await response.json();
  // Update dashboard with stored analysis
}

// Upload new resume from landing page
async function uploadResume(resumeText, fileName) {
  const response = await fetch('http://localhost:3000/api/upload-resume', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      resumeText,
      fileName,
      userId: 'user123'
    })
  });
  const data = await response.json();
  // Update dashboard with new analysis
}
```

## Troubleshooting

### "Supabase: Not configured"
- Check `.env` file has `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Verify credentials are correct in Supabase dashboard
- Restart server after updating `.env`

### Table doesn't exist error
- Run the SQL setup commands in Supabase SQL Editor
- Check table names match exactly (lowercase with underscores)

### CORS errors
- Backend has CORS enabled by default
- Ensure frontend calls `http://localhost:3000/api/...`

### Resume not storing
- Check network tab in browser DevTools
- Verify userId is being sent
- Check Supabase table has data in dashboard

### Analysis not appearing
- Gemini API key must be valid
- Resume text must be substantial (>100 characters)
- Check server console for API errors

## Security Notes

- **Development**: Using anon key is fine for development
- **Production**: Use service role with proper RLS policies
- **Data**: Resume text is stored in database, ensure compliance with privacy regulations
- **API Keys**: Never commit `.env` file to git

## Next Steps

1. ✅ Setup Supabase project
2. ✅ Create tables with SQL
3. ✅ Update `.env` file
4. ✅ Run `npm install && npm start`
5. Upload a resume on landing page
6. Check Supabase dashboard to see stored data
7. Verify dashboard shows analysis from database

## Support

For issues:
1. Check server console for error messages
2. Visit `http://localhost:3000/api/health` to verify server is running
3. Visit `http://localhost:3000/api/db-setup` for database structure reference
