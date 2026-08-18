# ReelMind AI 🧠

**Turn your scroll into skill.**

ReelMind AI is a hackathon prototype that analyzes a student's short-form video consumption (e.g., Reels, TikToks, Shorts) to infer latent educational interests and recommend high-quality, relevant technology content.

## 🏆 The Core Problem & Solution

Students spend hours scrolling short-form content. Much of it provides little educational value. 
**The Goal is NOT to stop social media usage**, but to make the existing scrolling *more useful*.

**The "Trap":**
If a student watches:
1. Java programming meme
2. Software engineer lifestyle Reel
3. Coding interview joke
4. Laptop comparison

A naive keyword-matching algorithm concludes **"Java"** and recommends **"5 More Java Memes"**.

ReelMind AI looks at the *collection* of interactions, infers the underlying **latent interest** ("Software Engineering / Technology"), and recommends highly relevant educational content like **"DSA Patterns Every Software Engineer Should Understand"**.

---

## 🏗 Architecture

The project is structured into a decoupled frontend and backend.

- **Frontend:** React + Vite + TypeScript, Tailwind CSS, Lucide React icons.
- **Backend:** Python + FastAPI, Pydantic schemas.
- **AI Pipeline:** Modular pipeline with LLM Provider Abstraction.

### AI Recommendation Pipeline
1. `Reel Input`
2. `Multimodal Feature Extraction`
3. `Interest Inference Engine`
4. `Candidate Generation`
5. `Hype Detection` (Penalizes clickbait)
6. `Recommendation Scoring` (Relevance, Educational Value, Novelty, Diversity)
7. `Explanation Generation`

---

## 🚀 Running the Project Locally

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv venv
# Activate venv (Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate)
pip install fastapi uvicorn pydantic python-dotenv httpx pytest pytest-asyncio
uvicorn app.main:app --reload --port 8000
```
*The backend will be running at `http://localhost:8000`*

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
*The frontend will be running at `http://localhost:5173`*

---

## 🎭 Demo Mode

The application is heavily optimized for a **Hackathon Demo Environment**.
It operates entirely in `DEMO_MODE=True` using a pre-configured `MockLLMProvider` and synthetic datasets to ensure **100% reliability during judging**, without the need for live API keys or complex database setups.

### The "Trap Demo" (Must See!)
1. Open the Frontend dashboard.
2. Navigate to the **"Trap Demo"** tab.
3. Click **"Analyze Reel History"**.
4. Watch as the basic keyword AI falls for the trap, while ReelMind AI successfully infers the latent "Software Engineering" interest and recommends a high-value DSA tutorial.

---

## 🧪 Testing

Run unit tests to verify the core intelligent logic (Hype Detection and The Trap Test).

```bash
cd backend
pytest -v tests/test_engine.py
```

## 🔮 Future Improvements
- Integrate actual vector database (Chroma/FAISS).
- Integrate live LLM Providers (OpenAI, Gemini).
- Connect to actual social media APIs (TikTok, Instagram) or browser extensions to pull real user history.
- Implement PostgreSQL database for user persistence.
