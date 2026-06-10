# CampusIQ Database Design

## 1. College Collection

```js
{
  _id,

  collegeName,

  collegeCode,

  university,

  city,

  departments: [
    "IT",
    "CSE",
    "ECE",
    "MAE"
  ],

  createdAt,
  updatedAt
}
```

Purpose:
Store participating IPU colleges.

---

## 2. Student Collection

```js
{
  _id,

  fullName,

  email,

  password,

  phone,

  profilePhoto,

  enrollmentNumber,

  collegeId,

  branch,

  sessionStart,

  sessionEnd,

  passingYear,

  currentSemester,

  cgpa,

  currentBacklogs,

  targetRole,

  linkedinUrl,

  githubUrl,

  leetcodeUrl,

  skills: [
    "React",
    "Java",
    "Node.js"
  ],

  certifications: [
    {
      title,
      issuer,
      date
    }
  ],

  internships: [
    {
      company,
      role,
      duration
    }
  ],

  projects: [
    {
      title,
      description,
      technologies
    }
  ],

  resumeUrl,

  profileCompleted,

  createdAt,
  updatedAt
}
```

Purpose:
Store complete student profile.

---

## 3. Company Collection

```js
{
  _id,

  companyName,

  companyLogo,

  description,

  website,

  hrEmail,

  industryType,

  location,

  createdAt,
  updatedAt
}
```

Purpose:
Store company information.

---

## 4. PlacementDrive Collection

```js
{
  _id,

  companyId,

  driveTitle,

  role,

  jobType,

  package,

  location,

  mode,

  description,

  driveDate,

  applicationDeadline,

  eligibleBranches: [
    "IT",
    "CSE"
  ],

  minCGPA,

  requiredSkills: [
    "Java",
    "DSA"
  ],

  totalOpenings,

  status,

  createdAt,
  updatedAt
}
```

Examples:

jobType:

* Internship
* Full-Time

mode:

* Online
* Offline
* Hybrid

status:

* Open
* Closed

Purpose:
Store company placement drives.

---

## 5. Application Collection

```js
{
  _id,

  studentId,

  driveId,

  applicationStatus,

  appliedAt,

  remarks
}
```

applicationStatus:

* Applied
* Shortlisted
* Interview Scheduled
* Selected
* Rejected

Purpose:
Track student applications.

---

## 6. ResumeAnalysis Collection

```js
{
  _id,

  studentId,

  resumeScore,

  strengths: [],

  weaknesses: [],

  missingSkills: [],

  recommendations: [],

  overallFeedback,

  analyzedAt
}
```

Purpose:
Store AI-generated resume analysis.

---

# Database Relationships

College
|
|---- Students

Student
|
|---- Applications

Company
|
|---- Placement Drives

Placement Drive
|
|---- Applications

Student
|
|---- Resume Analysis

---

# Collections Summary

1. College
2. Student
3. Company
4. PlacementDrive
5. Application
6. ResumeAnalysis

---

# AI Features Supported

### AI Resume Analysis

Input:

* Resume
* Skills
* Projects

Output:

* Resume Score
* Strengths
* Weaknesses
* Recommendations

### AI Skill Gap Analysis

Input:

* Student Profile
* Target Role

Output:

* Missing Skills
* Learning Roadmap
* Career Suggestions

### AI Eligibility Checker

Input:

* Student Profile
* Placement Drive Criteria

Output:

* Eligible / Not Eligible
* Reason
* Missing Requirements

### AI Candidate Ranking

Input:

* Student Profile
* Drive Requirements

Output:

* Match Score
* Rank
* AI Reasoning

```
```
