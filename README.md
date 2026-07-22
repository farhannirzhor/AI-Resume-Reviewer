Here's a professional **GitHub README description** you can use for your project.

---

# 🚀 AI Resume Reviewer

An AI-powered resume analysis application that compares a candidate's resume against a target job description and generates an intelligent evaluation using **FastAPI**, **React**, **Ollama**, and **Gemma 3**. The application provides a match score, strengths, weaknesses, missing keywords, and actionable suggestions while keeping all processing completely local.

## ✨ Features

* 📄 Upload resumes in **PDF** and **DOCX** formats
* 💼 Analyze resumes against any target job role and job description
* 🤖 AI-powered resume evaluation using **Gemma 3** via **Ollama**
* 📊 Resume Match Score (0–100)
* ✅ Strengths detection
* ❌ Weaknesses identification
* 💡 Actionable improvement suggestions
* 🔑 Missing keyword detection
* 📝 AI-generated resume summary
* 📜 Analysis history with detailed review pages
* 🔒 100% Local Processing (No data leaves your machine)
* ⚡ Fast and responsive user interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* MySQL
* Ollama API
* Gemma 3 LLM

### AI

* Ollama
* Gemma 3

---

## 📸 Screenshots

### Dashboard

* Upload resume
* Enter target job role
* Paste job description
* Start AI analysis

### Analysis Result

* Resume Match Score
* AI Summary
* Strengths
* Weaknesses
* Suggestions
* Missing Keywords

### History

* View previous resume analyses
* Open detailed reports anytime

---

## 📂 Project Structure

```text
resume-reviewer/
│
├── frontend/          # React Application
├── backend/           # FastAPI Backend
│   ├── app/
│   ├── routers/
│   ├── services/
│   ├── models/
│   ├── schemas/
│   └── core/
│
├── README.md
└── requirements.txt
```

---

## ⚙️ How It Works

1. Upload your resume.
2. Enter the target job role.
3. Paste the job description.
4. The backend extracts resume content.
5. Gemma 3 analyzes the resume against the job description.
6. The application generates:

   * Match Score
   * AI Summary
   * Strengths
   * Weaknesses
   * Suggestions
   * Missing Keywords
7. The analysis is stored for future reference.

---

## 📈 Work Demo
<img width="737" height="706" alt="Dashboard" src="https://github.com/user-attachments/assets/2d1e2a84-c730-4598-970b-4754dff03af0" />
<img width="1253" height="362" alt="History" src="https://github.com/user-attachments/assets/27a52ddb-7e68-435d-b327-7262217127d2" />
<img width="1291" height="907" alt="Results" src="https://github.com/user-attachments/assets/d147f6e2-f606-454b-b625-d6e482f2579f" />


## 📈 Future Improvements

* User Authentication (JWT)
* Multiple Resume Management
* ATS Score Analysis
* Resume Keyword Optimization
* Export Reports as PDF
* Interview Question Generator
* Multi-language Resume Support
* OpenAI/Claude/Gemini Support
* Cloud Deployment

---

## 🎯 Learning Objectives

This project demonstrates practical implementation of:

* FastAPI REST APIs
* React Frontend Development
* Local LLM Integration with Ollama
* Prompt Engineering
* Resume Parsing
* CRUD Operations
* SQLAlchemy ORM
* AI-powered Application Development
* Full-Stack Integration

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

