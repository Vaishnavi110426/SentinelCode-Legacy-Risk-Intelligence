# SentinelCode 🛡️
### AI-powered risk analysis for legacy codebases

SentinelCode is an AI-assisted developer tool that helps engineers **understand where it is safe—or dangerous—to change code** in large, complex, or legacy systems.

Instead of only explaining code, LegacyGuard focuses on **change risk and impact**.

---

## 🚨 The Problem

Most real-world software systems are:
- Old
- Poorly documented
- Tightly coupled
- Fear-driven (“Don’t touch that file”)

Developers often ask:
> “If I change this… what will break?”

Existing tools don’t answer that clearly.

---

## 💡 The Solution

LegacyGuard analyzes your codebase and provides:
- 🔴 High-risk / 🟡 Medium-risk / 🟢 Low-risk zones
- Explainable risk scores for files and functions
- Change impact (blast radius) analysis
- Dependency and call graph insights
- AI-generated explanations you can trust

---

## ✨ Key Features

- Risk scoring (0–100) per file/function
- Natural language explanations
- Dependency & coupling analysis
- Change impact visualization
- Designed for legacy systems

---

## 🧠 How It Works

LegacyGuard combines:
- Static code analysis (AST parsing)
- Dependency and call graphs
- Git history and stability signals
- Deterministic risk scoring
- AI reasoning for explanations (no hallucinations)

---

## 🛠️ Supported Languages (Initial)

- Java
- Python

(Designed to support more languages in the future)

---

## 👥 Who Is This For?

- Developers working with legacy systems
- Teams modernizing monoliths
- Engineers onboarding into large codebases
- Organizations aiming to reduce production risk

---

## 🚀 Roadmap

- [ ] Core risk scoring engine
- [ ] Change impact analysis
- [ ] CLI tool
- [ ] GitHub/GitLab integration
- [ ] Web dashboard
- [ ] IDE plugins

---

## 🤝 Contributing

This project is in its early stages.
Contributions, ideas, and feedback are welcome.

---

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1myaRMy_KplfRaSRFys-6ATVupdjpuJYr

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
---
   
## ⭐ Vision

Our goal is simple:
**Make legacy code safer to change.**

