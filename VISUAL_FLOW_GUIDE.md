# 📊 Resume-Based Dashboard - Visual Flow Guide

## Complete User Journey

```
┌────────────────────────────────────────────────────────────────────┐
│                        USER STARTS HERE                             │
│                                                                     │
│                    Login → Landing Page                            │
│                                                                     │
│              📤 "Analyze Resume" Button Clicked                    │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│                    STEP 1: UPLOAD RESUME                            │
│                      landing.html                                   │
│                                                                     │
│         User selects .txt file with resume content                 │
│                                                                     │
│         Frontend reads file content (FileReader API)               │
│                                                                     │
│         Sends POST to backend with:                                │
│         • resumeText: "John Doe\n5 years..."                       │
│         • fileName: "resume.txt"                                   │
│         • userId: "user_123"                                       │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│              STEP 2: BACKEND ANALYSIS (server.js)                  │
│                                                                     │
│         POST /api/upload-resume                                    │
│                                                                     │
│         ┌─────────────────────────────────────────┐                │
│         │   Gemini AI: Analyze Resume Text       │                │
│         └─────────────────────────────────────────┘                │
│                      ↓                                              │
│         Extracts:                                                  │
│         • fullName: "John Doe"                                     │
│         • skills: ["React", "Node.js", "Python"]                   │
│         • yearsExperience: 5                                       │
│         • careerGaps: ["AWS", "Kubernetes"]                        │
│         • specializations: ["Full Stack"]                          │
│         • potentialRoles: ["Senior Dev", "Tech Lead"]              │
│         • marketDemand: ["TypeScript", "Docker"]                   │
│         • improvements: ["AWS Cert", "System Design"]              │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│            STEP 3: STORE IN DATABASE (Supabase)                    │
│                                                                     │
│         Resumes Table:                                             │
│         • id: "a1b2c3d4-..." (UUID)                                │
│         • user_id: "user_123"                                      │
│         • file_name: "resume.txt"                                  │
│         • resume_text: "John Doe\n5 years..."                      │
│         • analysis: { fullName, skills, experience... }            │
│         • uploaded_at: "2026-02-13T10:30:00Z"                      │
│                                                                     │
│         ✅ Data persisted forever                                  │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│           STEP 4: RETURN TO FRONTEND & REDIRECT                    │
│                                                                     │
│         Backend Response:                                          │
│         {                                                          │
│           success: true,                                           │
│           analysis: { fullName, skills, ... },                     │
│           resume: { id: "uuid", ... }                              │
│         }                                                          │
│                                                                     │
│         Frontend:                                                  │
│         • Saves resumeId to localStorage                           │
│         • Saves analysis to localStorage                           │
│         • Sets resumeContext = analysis                            │
│         • Redirects to dashboard (index.html)                      │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│             STEP 5: DASHBOARD AUTO-POPULATES                       │
│                      index.html (Main)                             │
│                                                                     │
│  ╔════════════════════════════════════════════════════════════╗    │
│  ║  📄 RESUME SUMMARY CARD                      (NEW!)        ║    │
│  ║  ┌──────────────────────────────────────────────────────┐  ║    │
│  ║  │ Resume: John Doe                                     │  ║    │
│  ║  │ • Experience: 5 years                               │  ║    │
│  ║  │ • Skills Found: 8                                   │  ║    │
│  ║  │ • Target Roles: 3                                   │  ║    │
│  ║  │ Top Skills: React, Node.js, JavaScript              │  ║    │
│  ║  │ [📤 Upload New Resume]                              │  ║    │
│  ║  └──────────────────────────────────────────────────────┘  ║    │
│  ╚════════════════════════════════════════════════════════════╝    │
│                                                                     │
│  ╔════════════════════════════════════════════════════════════╗    │
│  ║  Skill-Sync Meter: [████████░░░░░░░░░░] 62%             ║    │
│  ║  (Calculated from skills count: 8 × 15 + 40 = 62%)       ║    │
│  ╚════════════════════════════════════════════════════════════╝    │
│                                                                     │
│  ╔════════════════════════════════════════════════════════════╗    │
│  ║  📚 SKILL PREPARATION CHART                             ║    │
│  ║  ┌──────────────────────────────────────────────────────┐  ║    │
│  ║  │ React         [████████████░░░░░░] 75%              │  ║    │
│  ║  │ Node.js       [██████████░░░░░░░░░] 70%              │  ║    │
│  ║  │ JavaScript    [█████████░░░░░░░░░░] 65%              │  ║    │
│  ║  │ Python        [████████░░░░░░░░░░░] 60%              │  ║    │
│  ║  │ (All skills extracted from resume)                   │  ║    │
│  ║  └──────────────────────────────────────────────────────┘  ║    │
│  ╚════════════════════════════════════════════════════════════╝    │
│                                                                     │
│  ╔════════════════════════════════════════════════════════════╗    │
│  ║  🗺️  CAREER ROADMAP                                       ║    │
│  ║  ┌──────────────────────────────────────────────────────┐  ║    │
│  ║  │  💼 Current: 5yr ──→ 🚀 Senior Role (0-3 mo)       │  ║    │
│  ║  │  Based on years of experience calculation           │  ║    │
│  ║  └──────────────────────────────────────────────────────┘  ║    │
│  ╚════════════════════════════════════════════════════════════╝    │
│                                                                     │
│  ╔════════════════════════════════════════════════════════════╗    │
│  ║  🎯 GROWTH AREAS (From Analysis)                         ║    │
│  ║  • ↗️ AWS Certification                                   ║    │
│  ║  • ↗️ Kubernetes & Container Orchestration               ║    │
│  ║  • ↗️ System Design Patterns                              ║    │
│  ╚════════════════════════════════════════════════════════════╝    │
│                                                                     │
│  Global resumeContext = { analysis object with all data }          │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│         STEP 6: USER INTERACTS WITH AI FEATURES                    │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │  DECISION PARALYSIS BREAKER                            │      │
│   │  User's Blocker: "I don't know where to start..."      │      │
│   │                                                         │      │
│   │  With resumeContext:                                   │      │
│   │  "Based on resume (5yr exp, skills: React, Node...)"   │      │
│   │   + "User blocker: I don't know where..."              │      │
│   │                                                         │      │
│   │  POST /api/decision-breaker                            │      │
│   │  ↓                                                      │      │
│   │  Gemini generates 7-day plan:                          │      │
│   │  • Day 1: Review React best practices                  │      │
│   │  • Day 2: Deep dive into system design basics          │      │
│   │  • Day 3: Start AWS learning path                      │      │
│   │  (All tailored to THEIR specific background!)          │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │  INTERVIEW PREP                                         │      │
│   │  User's Fear: "I'm scared of system design questions"  │      │
│   │                                                         │      │
│   │  With resumeContext:                                   │      │
│   │  "User background: 5yr exp, skills: React/Node..."     │      │
│   │   "Target roles: Senior Dev, Tech Lead"                │      │
│   │   + "Interview fear: System design questions"          │      │
│   │                                                         │      │
│   │  POST /api/interview-prep                              │      │
│   │  ↓                                                      │      │
│   │  Gemini generates prep strategy:                       │      │
│   │  • Practice questions from their target roles          │      │
│   │  • Examples using React/Node architecture              │      │
│   │  • Tips for senior-level discussions                   │      │
│   │  (Perfectly tailored to THEIR experience!)             │      │
│   └─────────────────────────────────────────────────────────┘      │
└────────────────────────────────────────────────────────────────────┘
                              ↓
┌────────────────────────────────────────────────────────────────────┐
│            STEP 7: PERSISTENT DATA ACROSS SESSIONS                 │
│                                                                     │
│  User closes dashboard and comes back later:                       │
│                                                                     │
│  ✅ Page loads → checks localStorage for resumeId                  │
│  ✅ Fetches from database: GET /api/analyze-stored-resume          │
│  ✅ Dashboard auto-populates with same resume data                 │
│  ✅ resumeContext loaded again                                     │
│  ✅ All features work with same personalization                    │
│                                                                     │
│  No data loss, permanent storage, instant recovery                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
Browser Storage:
┌─────────────────────────────────┐
│      localStorage                │
├─────────────────────────────────┤
│ • userId: "user_12345"          │
│ • resumeId: "uuid-here"         │
│ • resumeAnalysis: JSON data     │  
└─────────────────────────────────┘
         ↓
Memory (JavaScript):
┌─────────────────────────────────┐
│   Global resumeContext          │
├─────────────────────────────────┤
│ {                               │
│   fullName: "John Doe",         │
│   skills: [React, Node, ...],   │
│   yearsExperience: 5,           │
│   potentialRoles: [...],        │
│   improvements: [...]           │
│ }                               │
└─────────────────────────────────┘
         ↓
Database (Supabase):
┌─────────────────────────────────┐
│    resumes table                │
├─────────────────────────────────┤
│ • id: uuid                      │
│ • user_id                       │
│ • file_name                     │
│ • resume_text (full)            │
│ • analysis (JSON)               │
│ • uploaded_at                   │
└─────────────────────────────────┘
```

---

## 🎯 Feature Personalization Example

### Without Resume Context:
```
User: "How do I start system design?"

Generic Response:
• Learn data structures
• Study database design
• Practice with examples
(Same for everyone)
```

### With Resume Context:
```
User: "How do I start system design?"
System: *checks resumeContext*
- 5 years experience (advanced level)
- React, Node.js skills (web focus)
- Target: Senior Dev role
- At: TechCorp (worked on scalable apps)

Personalized Response:
• Leverage your 5yr experience - start with real-world scenarios
• Apply Node.js backend patterns you know
• Focus on distributed systems (match target role)
• Practice designing for React apps (your specialty)
(Perfectly tailored!)
```

---

## 📱 Mobile-Friendly Workflow

```
Mobile User:
  ↓
Opens landing.html on phone
  ↓
Clicks "Analyze Resume"
  ↓
Selects resume file from phone storage
  ↓
Backend processes (no file size limit on text)
  ↓
Data stored in Supabase (cloud)
  ↓
Mobile browser redirected to dashboard
  ↓
Dashboard displays with responsive layout
  ↓
Can use Decision Breaker/Interview Prep on mobile
  ↓
Data syncs across all devices (database backed)
```

---

## 🔐 Data Security Flow

```
User Resume Upload
        ↓
HTTPS/TLS Encryption (in transit)
        ↓
Backend receives encrypted data
        ↓
Processes with Gemini API (API key server-side only)
        ↓
Stores in Supabase with Row Level Security
        ↓
Database credentials never exposed to frontend
        ↓
Frontend only has anonymous read/write key
        ↓
User data remains private and secure
```

---

## ⚡ Performance Flow

```
Initial Load:
1. User clicks "Analyze Resume" (landing.html)
2. FileReader processes file (fast, client-side)
3. Sends POST request (200-500ms)
4. Gemini API analyzes (5-15 seconds)
5. Response returned (< 1 second)
6. Data stored in Supabase (< 2 seconds)
7. Redirect to dashboard (instant)
8. Dashboard renders with data (< 1 second)

Total: ~15-20 seconds for first upload

Subsequent Loads:
1. Dashboard page opens
2. Checks localStorage (instant)
3. Fetches from Supabase (< 1 second)
4. Renders dashboard (< 1 second)

Total: ~2 seconds for cached resume
```

---

## 🎓 Learning the System

### Level 1: Basic Usage
1. Upload resume
2. See dashboard populate
3. Use Decision Breaker
4. Use Interview Prep

### Level 2: Understanding Flow
1. Understand resume extraction
2. Know where data is stored
3. See how context is built
4. Understand API calls

### Level 3: Advanced Customization
1. Modify extraction logic
2. Add custom resume sections
3. Create new AI features
4. Extend database schema

### Level 4: Deployment
1. Deploy backend to cloud
2. Scale Supabase for users
3. Add authentication
4. Monitor performance

---

**The entire system is designed to be resume-centric, personalized, and persistent.** 🎉
