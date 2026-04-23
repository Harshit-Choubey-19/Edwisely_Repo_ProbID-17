# 🚀 Smart Form Builder & Feedback Collection System

A dynamic and intelligent form builder that goes beyond traditional forms by enabling adaptive feedback collection using smart follow-up questions and structured analytics.

---

# 📌 Overview

Traditional form tools are static, repetitive, and limited in capturing meaningful feedback.
This project introduces a **smart, dynamic form system** that:

- Supports multiple question types
- Adapts based on user responses
- Collects deeper, contextual feedback
- Provides structured response visualization

---

# 🏗️ Tech Stack

### 🔹 Frontend

- React (Vite)
- Tailwind CSS

### 🔹 Backend

- FastAPI (Python)

### 🔹 Database

- MongoDB (Motor - Async Driver)

---

# ⚙️ Features

## 🧩 1. Dynamic Form Builder

- Create forms with:
  - Title & description
  - Multiple question types:
    - Short answer
    - Multiple choice
    - Checkbox
    - Dropdown

- Add, edit, delete, and reorder questions

---

## 🧾 2. Interactive Form Filling

- Clean and responsive UI
- Supports all input types dynamically
- Modal-based form experience

---

## 🧠 3. Smart Follow-Up Questions (Key Feature 🚀)

The system adapts in real-time based on user input.

### Example:

- If user selects rating **< 3**
  👉 Shows follow-up question:

  > _“What went wrong?”_

- If rating changes to **≥ 3**
  👉 Follow-up question disappears

---

## 💾 4. Structured Response Storage

Responses are stored in MongoDB in a flexible format:

```json
{
  "form_id": "...",
  "answers": [
    { "question_id": "q1", "answer": "2" },
    { "question_id": "follow_up", "answer": "Bad organization" }
  ]
}
```

### Benefits:

- Easy querying
- Supports multiple data types (string, array)
- Scalable for analytics

---

## 📊 5. Dashboard

- View all responses for a form
- Maps question IDs to actual question text
- Displays structured feedback

---

# 🧠 System Design & Approach

## 🔹 Architecture

Frontend (React) → Backend (FastAPI) → MongoDB

- React handles UI & interaction
- FastAPI manages APIs and validation
- MongoDB stores dynamic schemas and responses

---

## 🔹 Core Flow

1. Create form → stored in DB
2. Share form → user fills dynamically
3. Smart logic triggers follow-ups
4. Responses saved in structured format
5. Dashboard displays results

---

# 🔍 Detection of Suspicious / AI-Assisted Behavior

The system includes heuristic-based detection mechanisms:

---

## 🚩 1. Rapid Submission Detection

- Tracks time taken to complete form
- Extremely fast responses are flagged

---

## 🚩 2. Pattern Detection

- Identical answers across submissions
- Repetitive response patterns

---

## 🚩 3. Low-Quality Responses

- Generic answers like:
  - "good"
  - "ok"
  - "nice"

---

## 🚩 4. Consistency Check

- Detects contradictory responses
  - Example: Rating = 5, but feedback = "bad experience"

---

## 🚩 5. Extensible AI Detection

- Can integrate LLM APIs for:
  - AI-generated text detection
  - Natural language quality scoring

---

# 🚀 How to Run

## 🔹 Backend

```bash
cd backend
python -m venv venv
./venv/Scripts/activate.ps1 #for windows
pip install "fastapi[standard]"
pip install motor #for mongoDB
fastapi dev server.py
```

---

## 🔹 Frontend

```bash
cd frontend
npm install
npm i react-router-dom axios
npm run dev
```

---

## 🔹 MongoDB

Make sure MongoDB is running locally:

```bash
mongod
```

---

# 📁 Project Structure

```bash
frontend/
  src/
    components/
    pages/
    services/

backend/
  routers/
  models/
  database/

```

---

# 🎯 Key Highlights

- Dynamic UI generation
- Real-time adaptive feedback system
- Clean and scalable backend design
- Flexible NoSQL schema
- Strong separation of concerns

---

# 💡 Future Improvements

- 📊 Analytics dashboard (charts & insights)
- 💬 Chat-style form interface
- 🎤 Voice input support
- ☁️ Deployment (Vercel + MongoDB Atlas)

---

# 🎥 Demo

Include your demo video link here.

---

# 🙌 Conclusion

This project demonstrates how traditional forms can be enhanced with intelligent, adaptive behavior to collect deeper and more meaningful feedback.

---
