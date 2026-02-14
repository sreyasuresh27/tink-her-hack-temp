# 🚀 The Pivot - Resume-Based Dashboard
## Quick Reference Card

---

## 📋 What's New

✅ **Resume uploads now fully power your dashboard**
✅ **All features use resume analysis data**
✅ **Permanent database storage with Supabase**
✅ **AI-personalized Decision Breaker & Interview Prep**

---

## 🔄 Complete Workflow

```
1. User uploads resume (landing.html)
   ↓
2. Backend analyzes with Gemini AI (server.js)
   ↓
3. Results stored in Supabase database
   ↓
4. Dashboard auto-loads and displays data (index.html)
   ↓
5. All features use resume context for personalization
```

---

## 📦 What Gets Extracted from Resume

- **Name** - Full name
- **Experience** - Years of professional experience
- **Skills** - All technical skills mentioned
- **Gaps** - Skills recommended for market demand
- **Specializations** - Core areas of expertise
- **Target Roles** - Recommended next career moves
- **Improvements** - Growth recommendations
- **Market Demand** - Hot skills in industry

---

## 🎯 Dashboard Features (Resume-Based)

### Resume Summary Card
Shows: Name, Experience, Skills Count, Top Skills
- Updates: When new resume uploaded
- Source: Database

### Skill-Sync Meter
Shows: % alignment based on detected skills
- Formula: (Num Skills × 15) + 40
- Example: 4 skills = 100%

### Skill Preparation Chart
Shows: Each detected skill with % competency
- Color coded: Red (gap) Yellow (medium) Green (strong)
- Source: Resume analysis

### Career Roadmap
Shows: Timeline from current level → Senior role
- Timeline: 18mo - (years experience × 3)
- Example: 6yr exp = 0-3 months to senior

### Growth Areas
Shows: AI-recommended improvements
- Source: Gaps vs market demand analysis

### Decision Breaker (Uses Resume Context)
- **Input**: User's blocker/challenge
- **Context**: Their skills, experience, background
- **Output**: 7-day micro-action plan tailored to them

### Interview Prep (Uses Resume Context)
- **Input**: Interview fear/challenge
- **Context**: Their skills, target roles, experience
- **Output**: Targeted interview prep strategy

---

## 🛠️ Setup (5 Minutes)

```bash
# 1. Create Supabase account & get credentials
# 2. Run SQL setup (see DATABASE_SETUP.md)
# 3. Update .env file
# 4. Install dependencies
npm install

# 5. Start backend
npm start
```

Expected output:
```
🚀 The Pivot Backend Server running on http://localhost:3000
📦 Supabase: Connected
```

---

## 🧪 Test Workflow

1. Open http://localhost:3000/landing.html
2. Click "Analyze Resume"
3. Upload test-resume.txt
4. Wait for analysis
5. Redirected to http://localhost:3000/index.html
6. Dashboard auto-populated with data ✅

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Backend API & Gemini integration |
| `index.html` | Dashboard with resume-based features |
| `landing.html` | Resume upload interface |
| `package.json` | Dependencies (Supabase, Express, etc.) |
| `.env.example` | Environment config template |
| `DATABASE_SETUP.md` | Database setup instructions |
| `SETUP_GUIDE.md` | Quick setup guide |
| `TEST_GUIDE.md` | Testing with sample resume |
| `README.md` | Full documentation |

---

## 🔌 API Endpoints

### Upload & Analyze Resume
```
POST /api/upload-resume
Response: { analysis: { fullName, skills[], yearsExperience, ... } }
```

### Fetch Stored Resumes
```
GET /api/resumes?userId=xxx
Response: { resumes: [...] }
```

### Decision Breaker (With Context)
```
POST /api/decision-breaker
Body: { blocker: "context from resume..." }
Response: { actionPlan: [...] }
```

### Interview Prep (With Context)
```
POST /api/interview-prep
Body: { fear: "context from resume..." }
Response: { prepPlan: {...} }
```

---

## 📊 Database Structure

### `resumes` Table
- `id` (UUID) - Unique identifier
- `user_id` (TEXT) - User identifier
- `file_name` (TEXT) - Original filename
- `resume_text` (TEXT) - Full resume content
- `analysis` (JSONB) - Extracted data:
  ```json
  {
    "fullName": "John Doe",
    "skills": ["React", "Node.js", ...],
    "yearsExperience": 5,
    "potentialRoles": [...],
    "improvements": [...],
    ...
  }
  ```

### `dashboard_analytics` Table
- Tracks user metrics over time
- Skill sync scores
- Interview prep history
- Learning progress

---

## ✨ Global `resumeContext` Variable

Available in browser console to debug:
```javascript
// Check if resume data is loaded
console.log(resumeContext)

// Should show:
{
  fullName: "John Doe",
  skills: ["React", "Node.js", ...],
  yearsExperience: 5,
  potentialRoles: ["Senior Dev", ...],
  improvements: ["AWS Cert", ...],
  ...
}
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Resume not uploading | Check backend running (`npm start`) |
| Dashboard shows generic data | Upload resume to populate |
| "Supabase: Not configured" | Update .env with credentials |
| No resume showing in DB | Create `resumes` table (DATABASE_SETUP.md) |
| Features don't use resume data | Check `resumeContext` in console |
| API errors | Check server console for details |

---

## 🚀 Deployment Ready

Backend can be deployed to:
- **Heroku** - Free tier available
- **Railway** - Easy deployment
- **Vercel** - Serverless option
- **AWS** - Full control

Files ready:
- `server.js` - Standalone backend
- `package.json` - All dependencies listed
- `DATABASE_SETUP.md` - Database schema for deployment

---

## 📱 Resume Upload Example

**What gets extracted:**
```
Resume: Sarah Johnson
Experience: 6 years
Skills: React, Node.js, JavaScript, Python, AWS, Docker, ...
Target Roles: Senior Dev, Tech Lead, Architect
Improvements: Kubernetes, System Design, Leadership

↓

Dashboard updates:
✅ Resume Summary Card shows "Sarah Johnson - 6yr"
✅ Skills chart shows React (75%), Node (70%), etc.
✅ Career roadmap: 6yr → Senior in ~3 months
✅ Decision Breaker asks "What's your blocker?"
✅ Interview Prep uses Sarah's skills for prep plan
```

---

## 🎓 Learning Path

1. **Day 1**: Upload resume → See dashboard populate
2. **Day 2**: Use Decision Breaker with resume context
3. **Day 3**: Use Interview Prep tailored to you
4. **Day 4**: Upload different resume → See dashboard adapt
5. **Day 5**: Add authentication for multiple users
6. **Day 6**: Deploy to production

---

## 📞 Support Resources

- **Database Issues**: See DATABASE_SETUP.md
- **Setup Help**: See SETUP_GUIDE.md
- **Testing**: See TEST_GUIDE.md
- **Full Docs**: See README.md
- **API Details**: See BACKEND_SETUP.md

---

## ✅ System Status Checklist

- [ ] Backend running on localhost:3000
- [ ] Supabase connected
- [ ] Resume uploads to landing.html
- [ ] Dashboard auto-populates from database
- [ ] Decision Breaker uses resume context
- [ ] Interview Prep uses resume context
- [ ] Skills detected and displayed
- [ ] Career roadmap calculates experience level

---

**Your platform is now fully resume-driven!** 🎉

Upload a resume and watch your personalized dashboard come to life.
