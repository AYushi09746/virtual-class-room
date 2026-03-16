# VirtClass: AI-Powered Inclusive Classroom 🚀

VirtClass is a next-generation virtual learning platform designed with **Human-Computer Interaction (HCI)** at its core. It empowers students with motor, visual, and cognitive disabilities through an empathy-driven interface and advanced assistive AI.

## ✨ Premium Features

- **HCI-First Design**: A sophisticated "Electric Indigo" theme featuring glassmorphism, optimized visual hierarchy, and high-readability typography (Plus Jakarta Sans).
- **Assistive AI (Gaze-to-Action)**: Webcam-based head tracking using **MediaPipe FaceMesh** for precise, hands-free navigation.
- **Voice Link**: Full conversational interface via **Web Speech API** for navigating pages, reading content, and interacting with the AI Assistant.
- **Accessibility Profiles**: Intelligent pre-configuration based on user needs (Motor, Visual, Cognitive) selected during a seamless login experience.
- **Faculty Portal**: A dedicated environment for teachers to manage assignments, monitor student focus levels, and post announcements with a clean, professional UI.
- **Smart Notes**: A focused environment for continuing lessons with integrated AI explanations and voice feedback.

## 🛠️ Technology Stack

- **Frontend**: React 18+ (Vite)
- **Styling**: Vanilla CSS (Custom Design System with Premium Tokens)
- **Computer Vision**: @mediapipe/face_mesh
- **Speech Engine**: Web Speech API (Recognition + Synthesis)
- **State Management**: React Context API (Auth, Theme, Accessibility, Tracking)

## 📂 Architecture Overview

- `/head-tracking-assist`: The core React engine.
  - `/src/hooks/useHeadTracking.js`: Logic for smoothing, deadzones, and low-pass filtering of head movements.
  - `/src/context/AccessibilityContext.jsx`: Global profile management.
  - `/src/components/TeacherDashboard.jsx`: Reimagined faculty management portal.
- `/server`: (Optional) Node.js backend for AI chat persistence and user management.

## ⚙️ Quick Start

### 1. Prerequisite
- Node.js (v16+) installed.
- A functional webcam (for head tracking features).

### 2. Frontend Installation
```bash
cd head-tracking-assist
npm install
npm run dev
```

### 3. Backend (Optional for AI Chat)
```bash
cd server
npm install
npm start
```

## 🏆 Our Objective
Most digital classrooms fail users with special needs due to small "hit zones", complex navigation, and lack of diverse input methods. **VirtClass** solves this by providing:
1. **Large Hit Zones** (Fitts's Law optimization).
2. **Contextual Voice Commands**.
3. **Adaptive UI** that morphs based on user disability profile.

---
*Powered by Empathy & Artificial Intelligence.* 🏳️‍🌈
