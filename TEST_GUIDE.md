# Test Resume Upload & Dashboard - Quick Guide

Use this sample resume text to test the entire workflow.

## Sample Resume (Copy & Paste to Test)

```
Sarah Johnson

Senior Full Stack Developer with 6 years of experience building scalable web applications
and leading technical initiatives at fast-paced startups and enterprises.

CONTACT
Email: sarah.johnson@email.com
Phone: (555) 123-4567
Location: San Francisco, CA

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with strong expertise in React, Node.js, and cloud
technologies. Proven track record of leading teams, architecting systems, and delivering
high-impact projects. Passionate about mentoring junior developers and driving technical
excellence.

TECHNICAL SKILLS
- Frontend: React.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Redux, Next.js
- Backend: Node.js, Express.js, Python, Django, REST APIs
- Databases: PostgreSQL, MongoDB, Firebase, Redis
- Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD with GitHub Actions
- Tools: Git, GitHub, Jira, Figma, VS Code, Postman
- Other: Agile/Scrum, Test-Driven Development, Microservices Architecture

PROFESSIONAL EXPERIENCE

Senior Software Engineer - TechCorp Inc. (Jan 2022 - Present)
San Francisco, CA
- Led migration of monolithic React application to micro-frontend architecture
- Architected Node.js microservices handling 500K+ daily requests
- Mentored 4 junior developers and conducted code reviews
- Reduced API response time by 45% through optimization and caching
- Implemented CI/CD pipeline with GitHub Actions reducing deployment time by 60%

Software Engineer - StartupXYZ (Aug 2020 - Dec 2021)
San Francisco, CA
- Built React-based SaaS dashboard processing real-time data for 100+ clients
- Developed Node.js backend APIs serving 2M+ requests/day
- Implemented authentication and authorization using JWT and OAuth2
- Optimized database queries reducing load times by 35%

Full Stack Developer - WebSolutions LLC (Jun 2018 - Jul 2020)
San Francisco, CA
- Developed full-stack web applications using React and Django
- Implemented payment integration with Stripe
- Built admin dashboards and reporting features
- Collaborated with designers and product managers on feature implementations

Junior Developer - CodeFirst (Jan 2018 - May 2018)
San Francisco, CA
- Learned and contributed to React component library
- Fixed bugs and implemented minor features
- Assisted in API development and database design

EDUCATION

Bachelor of Science in Computer Science
University of California, Berkeley (2018)
GPA: 3.7/4.0

Certifications:
- AWS Certified Solutions Architect (2022)
- Google Cloud Professional Developer (2021)

PROJECTS & ACHIEVEMENTS

1. Real-Time Analytics Dashboard
   - Built React dashboard with live data visualization
   - Implemented WebSocket connections for real-time updates
   - Processed 100K+ events per minute with < 100ms latency

2. Microservices Migration
   - Led transition from monolithic to microservices architecture
   - Reduced system complexity and improved deployment frequency
   - Enabled independent scaling of services

3. Performance Optimization Initiative
   - Analyzed and optimized critical paths in React application
   - Implemented code splitting and lazy loading
   - Reduced bundle size from 850KB to 350KB (58% reduction)

LANGUAGES
- English (Native)
- Spanish (Intermediate)

ADDITIONAL
- Active contributor to open-source projects
- Speaker at 2 tech conferences on React optimization
- Mentor in Women Who Code program
```

---

## Test Steps

### Step 1: Start Backend Server
```bash
npm install
npm start
```
Expected: Server running on http://localhost:3000

### Step 2: Open Landing Page
```
http://localhost:3000/landing.html
```

### Step 3: Create Resume File
1. Open Notepad
2. Copy the sample resume above (from ### PROFESSIONAL SUMMARY down to ADDITIONAL section)
3. Save as `test-resume.txt`

### Step 4: Upload Resume
1. Click "Analyze Resume" button
2. Select `test-resume.txt`
3. Wait for analysis (30 seconds)
4. Should see success message with extracted skills

### Step 5: Check Database
1. Go to Supabase dashboard
2. Table Editor → Select `resumes` table
3. Should see your resume with analysis JSON

### Step 6: View Dashboard
1. After upload completes, redirected to http://localhost:3000/index.html
2. Dashboard should show:
   - ✅ Resume: Sarah Johnson (6 years exp, 12 skills)
   - ✅ Skill-Sync Meter: ~60%
   - ✅ Skills chart: React, Node.js, Python, etc.
   - ✅ Career roadmap: 6yr → Senior (0-3 months)
   - ✅ Growth areas: AWS, Kubernetes, System Design

### Step 7: Test Decision Breaker
1. Go to Micro-Learning Feed tab (2nd tab)
2. Click "Decision Paralysis Breaker"
3. In textarea, describe a blocker:
   ```
   I'm scared of system design interviews and don't know where to start
   ```
4. Click "Generate AI Action Plan"
5. Should see 7-day plan tailored to Sarah's background:
   - Day 1: Focus on basics (Sarah has 6yr exp)
   - Include Node.js/React examples (Sarah's skills)
   - Target senior level challenges

### Step 8: Test Interview Prep
1. Go to "Interview Fear Heatmap" tab (3rd tab)
2. Describe fear:
   ```
   I'm worried about being asked about architecture decisions and defending them
   ```
3. Click "Start Interview Prep"
4. Should see interview prep strategy including:
   - Architecture questions relevant to React/Node apps
   - Examples from Sarah's experience level
   - Targeting senior developer positions

---

## Expected Results

### Resume Summary Card
```
📄 Resume: Sarah Johnson
Experience: 6y
Skills Found: 12
Target Roles: 4

🎯 Top Skills
React, Node.js, JavaScript
```

### Skills Detected
- React (extracted from TECHNICAL SKILLS)
- Node.js (extracted from TECHNICAL SKILLS)
- JavaScript (extracted from TECHNICAL SKILLS)
- TypeScript (extracted)
- AWS (extracted)
- Docker (extracted)
- Kubernetes (extracted)
- PostgreSQL (extracted)
- MongoDB (extracted)
- Python (extracted)
- And more...

### Potential Roles
- Senior Software Engineer
- Technical Lead
- Engineering Manager
- Solutions Architect

### Growth Areas
- Kubernetes advanced patterns
- System design deep dive
- Leadership and mentoring skills
- Cloud architecture certification

---

## Verify Database Storage

### Check Supabase:
1. Go to your Supabase project dashboard
2. SQL Editor → Run:
```sql
SELECT id, user_id, file_name, uploaded_at, 
       analysis->>'fullName' as name,
       analysis->>'yearsExperience' as experience
FROM resumes
ORDER BY uploaded_at DESC
LIMIT 1;
```

You should see your resume entry with all analysis data.

---

## Test Multiple Resumes

Try uploading different resumes (Python/ML, Design, Business roles) to see how:
- Dashboard adapts to different skill sets
- Decision Breaker gives different advice
- Career roadmaps adjust to experience levels
- Growth areas change based on skills

---

## Troubleshooting Test

If analysis shows generic data:
1. **Check file format**: Must be plain text (.txt)
2. **Check content**: Resume must have clear skill mentions
3. **Check backend logs**: Should show "Decision Breaker Error:" or success
4. **Check network**: Open DevTools → Network tab → Look for API calls

If database shows no data:
1. Verify Supabase credentials in .env
2. Check tables exist (see DATABASE_SETUP.md)
3. Check CORS is enabled on backend

---

## Success Criteria ✅

Your setup is working when:
- ✅ Resume uploads without errors
- ✅ Dashboard auto-populates with skills
- ✅ Skill-Sync meter updates
- ✅ Decision Breaker generates 7-day plan
- ✅ Interview Prep uses resume context
- ✅ Supabase stores analysis data
- ✅ Refreshing dashboard keeps data (from DB)

Once all checks pass, you're ready to integrate with real users!
