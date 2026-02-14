# The Pivot Platform - Database Setup Quick Start

## What Just Changed? 📊

Your platform now has **full database integration** with resume storage and AI analysis:

✅ **Resume uploads** are now stored in Supabase database  
✅ **Analysis results** are saved permanently (not just localStorage)  
✅ **Dashboard** fetches and displays data from the database  
✅ **Multiple resumes** can be stored and compared  

---

## Setup Steps (5 minutes)

### Step 1: Create Supabase Account
- Visit https://supabase.com and sign up
- Create a new project named "the-pivot"
- Wait ~2 minutes for initialization

### Step 2: Create Database Tables
In Supabase Dashboard → SQL Editor, paste and run:

```sql
CREATE TABLE resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  resume_text TEXT NOT NULL,
  analysis JSONB,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX resumes_user_id_idx ON resumes(user_id);
CREATE INDEX resumes_uploaded_at_idx ON resumes(uploaded_at);

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

CREATE INDEX analytics_user_id_idx ON dashboard_analytics(user_id);
```

### Step 3: Get Credentials
- Supabase Dashboard → Settings → API
- Copy **Project URL** and **anon public key**

### Step 4: Update .env
Edit `.env` file:
```
GEMINI_API_KEY=your_gemini_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=3000
NODE_ENV=development
```

### Step 5: Install & Start
```bash
npm install
npm start
```

Expected output:
```
🚀 The Pivot Backend Server running on http://localhost:3000
📦 Supabase: Connected
```

---

## New Workflow 🔄

1. **User uploads resume** on landing page
2. **Backend processes** with Gemini AI
3. **Results stored** in Supabase database
4. **Dashboard loads** data from database automatically
5. **Analysis persists** - data stays even after page refresh

---

## New API Endpoints

### Upload & Analyze Resume
```bash
POST http://localhost:3000/api/upload-resume
Content-Type: application/json

{
  "resumeText": "...",
  "fileName": "resume.txt",
  "userId": "user123"
}
```

### Get All User Resumes
```bash
GET http://localhost:3000/api/resumes?userId=user123
```

### Analyze Stored Resume
```bash
POST http://localhost:3000/api/analyze-stored-resume
{
  "resumeId": "uuid-from-database"
}
```

---

## Testing the Database

### Test 1: Upload Resume
1. Go to http://localhost:3000/landing.html
2. Click "Analyze Resume" button
3. Choose a text file with your resume content
4. Wait for analysis
5. Check browser console for database response ✅

### Test 2: Verify Database
1. Open Supabase dashboard
2. Go to Table Editor
3. Select `resumes` table
4. You should see your uploaded resume ✅

### Test 3: Dashboard Data
1. Dashboard auto-loads from database
2. Skill cards populate from stored analysis ✅
3. Career roadmap updates based on experience ✅

---

## Advanced Features

### Resume History
Users can now:
- Upload multiple resumes
- Track improvement over time
- Compare different career paths
- See AI analysis for each version

### Analytics Dashboard
Coming soon:
- Skill gap tracking
- Interview prep tracking
- Learning progress metrics
- Career trajectory projection

---

## Troubleshooting

**"Supabase: Not configured"**
- Check .env file has correct credentials
- Verify URL and key from Supabase dashboard
- Restart server after updating .env

**"Table resumes doesn't exist"**
- Run the SQL creation commands in Supabase
- Check table names are lowercase with underscores
- Refresh browser and try again

**"Resume not saving"**
- Check network tab in DevTools
- Verify backend is running (`npm start`)
- Check Supabase table for data

**"Backend not responding"**
- Install dependencies: `npm install`
- Check GEMINI_API_KEY is set
- Run `npm start` and look for server startup message

---

## File Changes Summary

### Modified Files:
- **package.json** - Added Supabase and multer packages
- **.env.example** - Added Supabase config template
- **server.js** - Added 3 new database endpoints
- **landing.html** - Sends resume to backend for analysis
- **index.html** - Fetches resume data from database

### New Files:
- **DATABASE_SETUP.md** - Full setup documentation
- **SETUP_GUIDE.md** - This file

### Database Tables:
- **resumes** - Stores uploaded resumes and analysis
- **dashboard_analytics** - Tracks user metrics and progress

---

## Next Steps

1. ✅ Complete setup steps above
2. ✅ Test upload and database storage
3. ✅ Verify dashboard loads database data
4. Optional: Add authentication (JWT/OAuth)
5. Optional: Add storage for resume file uploads (Supabase Storage)
6. Optional: Deploy backend to production (Heroku/Railway)

---

## Support
- Check server console for error messages
- Visit http://localhost:3000/api/health to verify server
- Visit http://localhost:3000/api/db-setup to see database schema
- See DATABASE_SETUP.md for complete documentation

**Ready to go! 🚀**
