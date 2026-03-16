# VirtClass: Premium AI-Inclusive Classroom 🚀

VirtClass is a next-generation virtual learning platform designed with **Human-Computer Interaction (HCI)** at its core. It empowers students with motor, visual, and cognitive disabilities through an empathy-driven interface and advanced assistive AI.

## ✨ Premium Features

- **HCI-First Design**: A sophisticated "Electric Indigo" theme featuring glassmorphism, optimized visual hierarchy, and high-readability typography (Plus Jakarta Sans).
- **Assistive AI (Gaze-to-Action)**: Webcam-based head tracking using **MediaPipe FaceMesh** for precise, hands-free navigation.
- **Voice Link**: Full conversational interface via **Web Speech API** for navigating pages, reading content, and interacting with the AI Assistant.
- **Accessibility Profiles**: Intelligent pre-configuration based on user needs (Motor, Visual, Cognitive) selected during a seamless login experience.
- **Faculty Portal**: A dedicated environment for professors to manage assignments, monitor student analytics, and post announcements with a clean, professional glassmorphism UI.
- **AI Learning Hub**: A chat interface with visual pulse feedback and low-latency responses for concept explanation.

## 🛠️ Technology Stack

- **Frontend**: React 19 (Vite)
- **Styling**: Modern CSS Design System (Custom Tokens & Glassmorphism)
- **AI/Vision**: @mediapipe/face_mesh, @mediapipe/camera_utils
- **Voice**: Web Speech API (Recognition + Synthesis)
- **Security**: Role-based access control (RBAC) & Context-driven Auth

## 📂 Simplified Structure

```text
/virtal classroom project
├── /head-tracking-assist    # React UI Engine
│   ├── /src/components      # Optimized HCI Components (Layout, HUD, Voice)
│   ├── /src/pages           # Premium Styled Views (Dashboard, Login, AI)
│   ├── /src/context         # Global State (Accessibility, Tracking, Auth)
│   └── index.css            # Global Design System Tokens
└── /server                  # Backend Services
    ├── server.js            # Express API for AI & Data
    └── routes/              # Modular API Endpoints
```

## ⚙️ How to Run

### 1. Requirements
- **Node.js**: v18.0.0 or higher
- **Browser**: Chrome/Edge (Recommended for Web Speech & MediaPipe support)
- **Hardware**: Functional Webcam

### 2. Launch Frontend (Terminal 1)
```bash
cd "virtal classroom project/head-tracking-assist"
npm install
npm run dev
```
> Access via: **http://localhost:5173**

### 3. Launch Backend (Terminal 2)
```bash
cd "virtal classroom project/server"
npm install
npm start
```
> API running on: **http://localhost:5000**

## 🏆 HCI Philosophy
VirtClass follows strict HCI guidelines to ensure accessibility:
1. **Fitts's Law**: Large interactive elements for easier motor-based targeting.
2. **Hick's Law**: Minimalistic dashboards to reduce cognitive load.
3. **Feedback Loops**: Immediate visual (Pulse) and auditory (Voice) feedback for every action.

---
*Developed with ❤️ for an inclusive future.* 🏳️‍🌈
