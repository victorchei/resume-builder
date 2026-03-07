# ATS/HR Resume Screening Research

Sources: Jobscan, TheLadders eye-tracking, Resumemate, Scale.jobs, CVCraft, ResumeGuru.

## Key Rules Encoded in scoring.js

### Format (P0)
- DOCX > PDF for ATS parsing. PDF only for direct email to hiring manager.
- Single column only. No tables, text boxes, graphics, skill bars.
- No content in headers/footers (ATS skips them).
- Fonts: Arial, Calibri, Lato, Source Sans Pro, Times New Roman, Garamond only.
- File naming: `FirstName_LastName_Resume.docx`.

### Keywords (P0-P1)
- Section weight: Skills=VeryHigh, Experience=VeryHigh, Summary=High, Education=Medium.
- Include both expanded + abbreviation: "Search Engine Optimization (SEO)".
- First 100 words must contain highest-priority keywords.
- Target 80%+ keyword overlap with JD for competitive shortlisting.
- Standard section headers only: "Work Experience", "Education", "Skills", "Professional Summary".

### Recruiter Scan (P1)
- 7.4s initial scan, F-pattern reading.
- Focus order: name -> current title -> current employer -> dates -> previous title -> education.
- Numbers draw disproportionate attention: "35%" not "thirty-five percent".
- Strongest content in top third of page.

### Scoring Model
- Keyword match: 40pts | Section structure: 20pts | Quantification: 20pts | Format safety: 10pts | Length: 5pts | Verb strength: 5pts
- 85-100=excellent, 70-84=good, 50-69=borderline, <50=likely rejected.

### Rejection Triggers
- 75% of resumes never reach a recruiter.
- Top: formatting issues, keyword mismatch, wrong format, missing sections, typos.
- Weak openers: "Responsible for", "Helped", "Worked on", "Assisted".

### Template Specs
- Margins: 1 inch standard, 0.5 min, 1.25 max. Body: 10-11pt. Headers: 11-12pt. Name: 14-18pt.
- Line spacing: 1.0-1.15. Max 2 font families. 1 accent color max.
- <10yr exp = 1 page. 10+ yr = 2 pages max, page 1 self-contained.
