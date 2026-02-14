const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static('.'));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Initialize Supabase
const supabase = (process.env.SUPABASE_URL && process.env.SUPABASE_URL.trim() && 
                  process.env.SUPABASE_ANON_KEY && process.env.SUPABASE_ANON_KEY.trim())
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
  : null;

console.log('📦 Supabase:', supabase ? 'Connected' : 'Not configured (using localStorage fallback)');

// Resume Upload & Storage Endpoint
app.post('/api/upload-resume', async (req, res) => {
  try {
    const { resumeText, fileName, userId } = req.body;
    
    if (!resumeText || !fileName) {
      return res.status(400).json({ error: 'Resume text and file name required' });
    }
    
    // Analyze resume with Gemini
    const analysisPrompt = `Analyze this resume and extract in JSON format:
{
  "fullName": "extracted name or 'Not found'",
  "skills": ["skill1", "skill2", ...],
  "yearsExperience": number,
  "careerGaps": ["gap1", "gap2"],
  "specializations": ["area1", "area2"],
  "potentialRoles": ["role1", "role2"],
  "marketDemand": ["high-demand-skill1", "high-demand-skill2"],
  "improvements": ["improvement1", "improvement2"]
}

Resume:
${resumeText}`;
    
    const result = await model.generateContent(analysisPrompt);
    const analysisText = result.response.text();
    
    let analysis = {};
    try {
      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { rawAnalysis: analysisText };
    } catch (e) {
      analysis = { rawAnalysis: analysisText };
    }
    
    const resumeData = {
      file_name: fileName,
      resume_text: resumeText,
      analysis: analysis,
      uploaded_at: new Date().toISOString(),
      user_id: userId || 'anonymous'
    };
    
    // Store in Supabase if available
    let storedData = resumeData;
    if (supabase) {
      const { data, error } = await supabase
        .from('resumes')
        .insert([resumeData])
        .select();
      
      if (error) {
        console.warn('Supabase insert warning:', error.message);
      } else if (data) {
        storedData = data[0];
      }
    }
    
    res.json({
      success: true,
      message: 'Resume uploaded and analyzed',
      resume: storedData,
      analysis: analysis
    });
    
  } catch (error) {
    console.error('Resume Upload Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error uploading resume'
    });
  }
});

// Get Stored Resumes Endpoint
app.get('/api/resumes', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!supabase) {
      return res.json({
        success: false,
        message: 'Database not configured',
        resumes: []
      });
    }
    
    let query = supabase.from('resumes').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query.order('uploaded_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    res.json({
      success: true,
      count: data ? data.length : 0,
      resumes: data || []
    });
    
  } catch (error) {
    console.error('Get Resumes Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error fetching resumes'
    });
  }
});

// Analyze Database Resume Endpoint
app.post('/api/analyze-stored-resume', async (req, res) => {
  try {
    const { resumeId } = req.body;
    
    if (!supabase || !resumeId) {
      return res.status(400).json({ error: 'Database not configured or resume ID required' });
    }
    
    // Fetch resume from database
    const { data: resume, error: fetchError } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();
    
    if (fetchError || !resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Return stored analysis
    res.json({
      success: true,
      resume: resume,
      analysis: resume.analysis || {}
    });
    
  } catch (error) {
    console.error('Analyze Stored Resume Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error analyzing resume'
    });
  }
});

// Decision Paralysis Breaker Endpoint
app.post('/api/decision-breaker', async (req, res) => {
  try {
    const { blocker } = req.body;
    
    if (!blocker || blocker.trim() === '') {
      return res.status(400).json({ error: 'Please provide a blocker description' });
    }
    
    const prompt = `The user says: "${blocker}". 
Generate a practical 7-day micro-action plan to overcome this blocker. 
Format as a numbered list with daily tasks that take 5-15 minutes each. 
Be encouraging, specific, and actionable. 
Include the day number and specific action for each day.`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse response into structured format
    const days = parseActionPlan(text);
    
    res.json({
      success: true,
      blocker: blocker,
      actionPlan: days,
      rawText: text,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Decision Breaker Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating action plan'
    });
  }
});

// Interview Fear Heatmap Endpoint
app.post('/api/interview-prep', async (req, res) => {
  try {
    const { fear } = req.body;
    
    if (!fear || fear.trim() === '') {
      return res.status(400).json({ error: 'Please describe your interview fear' });
    }
    
    const prompt = `The user is afraid of: "${fear}" in interviews.
Generate a targeted interview prep strategy to overcome this specific fear. 
Include:
1. Root cause analysis (2-3 sentences)
2. Three confidence-building exercises with specific steps
3. Five practice interview questions specific to this fear
4. Mindset shifts and affirmations

Be encouraging, practical, and actionable.`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse response into structured sections
    const sections = parseInterviewPlan(text);
    
    res.json({
      success: true,
      fear: fear,
      prepPlan: sections,
      rawText: text,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Interview Prep Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating interview prep plan'
    });
  }
});

// Resume Analysis Endpoint
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    if (!resumeText || resumeText.trim() === '') {
      return res.status(400).json({ error: 'Please provide resume text' });
    }
    
    const prompt = `Analyze this resume and provide:
1. List of detected skills (comma-separated)
2. Years of experience
3. Any career gaps mentioned
4. Top 3 areas for improvement
5. Top 3 unique skill combinations for market advantage
6. Estimated salary range based on experience and skills

Resume:
${resumeText}

Format as JSON with keys: skills, experience, careerGaps, improvements, skillCombos, salaryRange`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    try {
      const analysis = JSON.parse(text);
      res.json({
        success: true,
        analysis: analysis,
        rawText: text
      });
    } catch (parseError) {
      res.json({
        success: true,
        analysis: { rawResponse: text },
        rawText: text
      });
    }
    
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error analyzing resume'
    });
  }
});

// Skill Gap Analysis Endpoint
app.post('/api/skill-gaps', async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;
    
    if (!currentSkills || !targetRole) {
      return res.status(400).json({ error: 'Please provide current skills and target role' });
    }
    
    const prompt = `Given the current skills: ${currentSkills.join(', ')} and target role: "${targetRole}"
Analyze and provide:
1. Required skills for the target role
2. Skill gaps (what's missing)
3. Priority of learning each missing skill (High/Medium/Low)
4. Estimated time to learn each skill
5. Recommended learning resources and order
6. Micro-learning path (monthly milestones)

Format as JSON with keys: requiredSkills, gaps, priorities, timeline, resources, learningPath`;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    res.json({
      success: true,
      skillAnalysis: text,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Skill Gap Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error analyzing skill gaps'
    });
  }
});

// Helper function to parse action plan
function parseActionPlan(text) {
  const days = [];
  const lines = text.split('\n');
  
  lines.forEach(line => {
    line = line.trim();
    if (line.match(/^(Day \d+|Day\d+|\d+\.)/) || (line.length > 0 && lines.indexOf(line) > 0)) {
      days.push(line);
    }
  });
  
  return days.slice(0, 7); // Get first 7 days
}

// Helper function to parse interview plan
function parseInterviewPlan(text) {
  return {
    fullPlan: text,
    sections: {
      rootCause: extractSection(text, 'Root Cause'),
      exercises: extractSection(text, 'Exercise'),
      questions: extractSection(text, 'Question'),
      mindset: extractSection(text, 'Mindset|Affirmation')
    }
  };
}

// Helper to extract sections
function extractSection(text, sectionKeyword) {
  const regex = new RegExp(`${sectionKeyword}[^]*?(?=\\n\\n|$)`, 'gi');
  const match = text.match(regex);
  return match ? match[0] : '';
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    database: supabase ? 'Connected' : 'Not configured'
  });
});

// Database Setup Help Endpoint
app.get('/api/db-setup', (req, res) => {
  res.json({
    message: 'Database Setup Instructions',
    supabaseConfigured: !!supabase,
    requiredTables: [
      {
        name: 'resumes',
        columns: [
          { name: 'id', type: 'uuid', primary: true },
          { name: 'user_id', type: 'text' },
          { name: 'file_name', type: 'text' },
          { name: 'resume_text', type: 'text' },
          { name: 'analysis', type: 'jsonb' },
          { name: 'uploaded_at', type: 'timestamp' }
        ]
      },
      {
        name: 'dashboard_analytics',
        columns: [
          { name: 'id', type: 'uuid', primary: true },
          { name: 'user_id', type: 'text' },
          { name: 'resume_id', type: 'uuid' },
          { name: 'skill_sync_score', type: 'integer' },
          { name: 'decision_breaker_count', type: 'integer' },
          { name: 'interview_preps', type: 'jsonb' },
          { name: 'last_updated', type: 'timestamp' }
        ]
      }
    ],
    instructions: 'Create these tables in Supabase to enable full database functionality'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 The Pivot Backend Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`  POST /api/upload-resume - Upload and analyze resume`);
  console.log(`  GET  /api/resumes - Get all stored resumes`);
  console.log(`  POST /api/analyze-stored-resume - Analyze stored resume`);
  console.log(`  POST /api/decision-breaker - Generate 7-day action plan`);
  console.log(`  POST /api/interview-prep - Generate interview prep plan`);
  console.log(`  POST /api/analyze-resume - Analyze resume text`);
  console.log(`  POST /api/skill-gaps - Analyze skill gaps`);
  console.log(`  GET  /api/health - Health check`);
  console.log(`  GET  /api/db-setup - Database setup instructions`);
});
