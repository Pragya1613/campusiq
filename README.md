# CampusIQ 🚀

### AI-Powered Campus Placement Management System

**CampusIQ** is a full-stack campus placement management platform designed to streamline placement activities for students and Training & Placement (T&P) cells.

It provides a centralized platform for managing student profiles, placement drives, applications, resumes, interview experiences and AI-assisted placement insights.

<p align="center">
  <a href="https://campusiq-ten.vercel.app">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

---

## 🎯 Problem Statement

Campus placement processes often involve managing large amounts of student information, eligibility criteria, placement drives and applications.

CampusIQ aims to simplify this process by providing:

* Centralized student profiles
* Placement drive management
* Eligibility tracking
* Application tracking
* Resume analysis
* Interview experience sharing
* AI-powered placement insights
* Role-based access for students and T&P administrators

---

## ✨ Key Features

### 👨‍🎓 Student Portal

* Student registration and login
* Profile management
* Academic details
* Skills and technical information
* Projects, achievements and certifications
* Resume upload
* Placement opportunity discovery
* Job application tracking
* Placement eligibility information
* Interview experience browsing and sharing
* AI-assisted placement insights

### 🏢 T&P / Admin Portal

* Admin authentication
* Student management
* Placement/job management
* Placement drive creation
* Application monitoring
* Dashboard and placement statistics
* Candidate/application management

### 🤖 AI-Powered Features

* AI-based resume analysis
* Resume insights
* Skill-related analysis
* Placement readiness insights
* AI-assisted candidate evaluation

### 📊 Placement Management

* Job/placement drive listings
* Eligibility-based opportunities
* Apply to placement opportunities
* Application status tracking
* Application management
* Placement-related dashboard statistics

### 💬 Interview Experiences

* Share interview experiences
* Browse experiences
* Comment on interview experiences
* Learn from previous candidates' experiences

---

## 🔐 Authentication & Authorization

CampusIQ uses **JWT-based authentication** with role-based access.

### Student

Students can:

* Manage their profile
* View placement opportunities
* Apply for jobs
* Track applications
* Upload resumes
* Access placement-related features

### T&P / Admin

Administrators can:

* Manage placement opportunities
* Manage student/application data
* Monitor placement activities
* Access administrative dashboards

Authentication state is maintained using browser session storage so that separate browser tabs can maintain independent login sessions.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Authentication

* JSON Web Tokens (JWT)
* bcrypt.js

### AI

* Google Gemini API

### File & Media Services

* Cloudinary

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

## 🏗 System Architecture

```text
                    ┌─────────────────────┐
                    │       Student      │
                    │    / T&P Admin     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React + Vite      │
                    │   Frontend          │
                    │   Vercel           │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │ Backend             │
                    │ Render              │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └────────────┐
              ▼                                 ▼
    ┌───────────────────┐             ┌───────────────────┐
    │ MongoDB Atlas     │             │ Google Gemini API │
    │ Database          │             │ AI Services       │
    └───────────────────┘             └───────────────────┘
```

---

## 📂 Project Structure

```text
CampusIQ/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── docs/
│   ├── project-requirements.md
│   ├── database-design.md
│   ├── api-design.md
│   ├── frontend-pages.md
│   └── project-journal.md
│
├── README.md
└── .gitignore
```

---

## 🚀 Live Application

### 🌐 Frontend

**CampusIQ:**
https://campusiq-ten.vercel.app

### ⚙️ Backend

**Backend API:**
https://campusiq-e5od.onrender.com

The backend is deployed separately on Render and communicates with the React frontend through REST APIs.

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Pragya1613/campusiq.git

cd campusiq
```

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

The backend will run locally according to the configured environment port.

### 3. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server will provide the local frontend URL.

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key
```

Use your actual environment variable names from the project configuration when setting up a local environment.

### Frontend

Create:

```text
client/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, the frontend API URL should point to the deployed backend.

---

## 🔄 Application Flow

```text
User
  │
  ▼
Login / Registration
  │
  ▼
JWT Authentication
  │
  ▼
Role Detection
  │
  ├───────────────┐
  ▼               ▼
Student        T&P/Admin
Portal           Portal
  │               │
  ▼               ▼
Jobs          Manage Jobs
  │               │
  ▼               ▼
Apply         Manage Applications
  │               │
  ▼               ▼
Track         Placement Dashboard
Application
  │
  ▼
AI / Resume / Interview Features
```

---

## 📌 Current Status

**🟢 Live & Deployed**

* Frontend deployed on Vercel
* Backend deployed on Render
* MongoDB Atlas connected
* Authentication working
* Student and admin workflows implemented
* Placement/job workflows implemented
* Application tracking implemented
* AI-related features integrated
* Interview experience functionality implemented

The project is actively maintained and can be extended with additional placement automation and analytics features.

---

## 🎓 Academic Project

CampusIQ is being developed as a major academic project to explore how modern full-stack development and Artificial Intelligence can be applied to real-world campus placement management.

The project focuses on:

* Full-stack application development
* REST API design
* Database design
* Authentication and authorization
* Cloud deployment
* AI integration
* Placement workflow automation

---

## 🔮 Future Implementation

The following features are planned to be implemented in the upcoming versions of CampusIQ:

### 1. 🤖 AI-Based Resume–Job Matching

Implement an AI-based matching system that compares a student's resume with a job description and generates a match score based on skills, projects, experience and job requirements.

### 2. 🎯 Automated Candidate Shortlisting

Automate the initial candidate shortlisting process for T&P administrators using criteria such as CGPA, branch, skills, backlogs and resume–job match score.

### 3. 📊 Advanced Placement Analytics

Add detailed analytics for the T&P dashboard, including placement percentage, company-wise selections, branch-wise statistics, application statistics and placement trends.

### 4. 🔔 Placement Notifications

Implement email and in-app notifications for new placement drives, eligibility updates, application status changes and important placement announcements.

### 5. 📅 Placement & Interview Calendar

Add a centralized calendar for placement tests, interviews, pre-placement talks and other important placement events, with students able to view their scheduled activities.

---

## 👩‍💻 Developer

**Pragya Soni**

B.Tech Computer Science Engineering
Guru Gobind Singh Indraprastha University (GGSIPU)

GitHub: [Pragya1613](https://github.com/Pragya1613)

---

## 🌐 Project Links

| Resource             | Link                                   |
| -------------------- | -------------------------------------- |
| 🚀 Live Application  | https://campusiq-ten.vercel.app        |
| 💻 GitHub Repository | https://github.com/Pragya1613/campusiq |
| ⚙️ Backend           | https://campusiq-e5od.onrender.com     |


