# CampusIQ API Design

# Authentication APIs

POST /api/auth/register

Purpose:

* Register Student

---

POST /api/auth/login

Purpose:

* Login Student

---

GET /api/auth/profile

Purpose:

* Current Logged-in User

---

# Student APIs

POST /api/students

Purpose:

* Create Student Profile

---

GET /api/students/:id

Purpose:

* Get Student Profile

---

PUT /api/students/:id

Purpose:

* Update Student Profile

---

DELETE /api/students/:id

Purpose:

* Delete Student Profile

---

# Placement Drive APIs

POST /api/drives

Purpose:

* Create Drive

---

GET /api/drives

Purpose:

* Get All Drives

---

GET /api/drives/:id

Purpose:

* Get Single Drive

---

PUT /api/drives/:id

Purpose:

* Update Drive

---

DELETE /api/drives/:id

Purpose:

* Delete Drive

---

# Company APIs

POST /api/companies

Purpose:

* Create Company

---

GET /api/companies

Purpose:

* Get Companies

---

GET /api/companies/:id

Purpose:

* Get Company Details

---

# Application APIs

POST /api/applications

Purpose:

* Apply For Drive

---

GET /api/applications

Purpose:

* Get Applications

---

GET /api/applications/:id

Purpose:

* Application Details

---

PUT /api/applications/:id

Purpose:

* Update Status

---

# Resume Analysis APIs

POST /api/ai/resume-analysis

Purpose:

* AI Resume Review

---

# Skill Gap APIs

POST /api/ai/skill-gap-analysis

Purpose:

* Skill Gap Detection

---

# Eligibility APIs

POST /api/ai/eligibility-check

Purpose:

* Eligibility Prediction

---

# AI Shortlisting APIs

POST /api/ai/shortlisting

Purpose:

* Candidate Ranking

---

# Notification APIs

GET /api/notifications

Purpose:

* Get Notifications

---

PUT /api/notifications/:id

Purpose:

* Mark Notification As Read

---

# Future APIs

POST /api/reports

GET /api/reports

POST /api/analytics

GET /api/analytics
