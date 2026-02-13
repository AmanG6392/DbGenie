# 🧞‍♂️ DbGenie  
### Fullstack AI Agent That Talks to Your Database

<p align="center">
  <b>Ask questions in plain English. Get real database answers.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/AI-GPT--4/5-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-SQLite%20%7C%20SQL-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/github/stars/AmanG6392/DbGenie?style=for-the-badge" />
</p>

---

# 🚀 Live Demo

🔗 https://db-genie-phi.vercel.app  

---

# 📌 What is DbGenie?

DbGenie is a **Fullstack AI Agent** that allows users to interact with a relational database using natural language.

Instead of writing SQL queries manually, users can simply ask:

> “How much sales did we make today?”

The AI agent:
1. Understands the question  
2. Converts it into SQL  
3. Queries the database  
4. Returns structured results  

This replicates modern AI-agent-based system design used in real SaaS products.

---

# 🏗️ System Architecture

## High-Level AI Agent Flow

```
                ┌────────────────────┐
                │     Frontend       │
                │     Next.js        │
                └─────────┬──────────┘
                          │ /api/send
                          ▼
                ┌────────────────────┐
                │      Backend       │
                │  Serverless API    │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     GPT Model      │
                │  (OpenAI / GPT-4)  │
                └─────────┬──────────┘
                          │ Generates SQL
                          ▼
                ┌────────────────────┐
                │     Database       │
                │      SQLite        │
                └────────────────────┘
                          │
                          ▼
                Structured Response → UI
```

---

# 🧠 How It Works (Step-by-Step)

1. User enters a natural language query.
2. Frontend sends the request to `/api/send`.
3. Backend forwards the prompt to GPT.
4. GPT generates SQL dynamically.
5. Backend executes SQL safely on SQLite.
6. Results are formatted and returned to the UI.
7. Frontend renders structured output.

---

# ✨ Core Features

### 🧠 Natural Language → SQL
- Converts plain English into executable SQL
- Context-aware query generation
- Dynamic schema understanding

### ⚡ Real-Time Execution
- Serverless API calls
- Instant result rendering
- Structured JSON responses

### 🔐 Secure Execution Layer
- Backend-controlled SQL execution
- No direct DB exposure to frontend
- Environment-based API key handling

### 📦 Modern Fullstack Architecture
- Next.js App Router
- API Routes
- Server-side logic
- Deployment-ready configuration

---

# 🛠️ Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript

## Backend
- Next.js API Routes (Serverless)
- OpenAI SDK / AI SDK

## Database
- SQLite

## Deployment
- Vercel

---

# 📊 Engineering Impact

- Built an AI-powered database interaction system
- Designed safe query execution pipeline
- Implemented structured agent architecture
- Deployed serverless fullstack app
- Demonstrated modern AI-agent system design

---

# 🎯 Why This Project is Impressive

This is not a simple CRUD app.

It demonstrates:

- AI Agent Architecture
- LLM Integration
- Dynamic SQL Generation
- Secure DB Execution Flow
- Serverless API Design
- Production Deployment

This aligns with modern AI-first product engineering.

---

# 📂 Project Structure

```
DbGenie/
│
├── app/                # Next.js App Router
     ├── api/           # Serverless API routes
     ├── layout.tsx           # Serverless API routes
     ├── page.tsx           # Serverless API routes
├── components/         # UI Components
├── lib/                # AI & DB logic
├── db/                 # SQLite database
├── package.json
└── README.md
```

---

# ⚙️ Local Setup

```bash
git clone https://github.com/AmanG6392/DbGenie.git
cd DbGenie
npm install
npm run dev
```

---

# 🔮 Future Enhancements

- Multi-database support (Postgres, MySQL)
- Query validation & optimization layer
- Schema auto-detection
- Chat memory context
- Role-based authentication
- Data visualization dashboard

---

# 👨‍💻 Author

**Aman Gupta**  
Full Stack Developer | AI Systems Enthusiast  

🔗 GitHub: https://github.com/AmanG6392  
🔗 LinkedIn: https://www.linkedin.com/in/aman-gupta-b94a87308  

---

# ⭐ Support

If you found this project impressive:

- ⭐ Star the repo
- 🍴 Fork it
- 🧠 Share feedback

---

<p align="center">
  <b>Built with curiosity for AI systems and scalable backend design.</b>
</p>
