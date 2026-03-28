<div align="center">

<img src="https://img.shields.io/badge/TalentIDE-Code%20Together-6d28d9?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="TalentIDE" />

# TalentIDE

### The Collaborative Coding Interview Platform

Practice technical interviews with real-time video, a live code editor, and instant code execution — all in one place.

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

<br/>

![TalentIDE Screenshot](./frontend/public/screenshot-for-readme.png)

</div>

---

## 📖 About

**TalentIDE** is a full-stack web application that lets two developers practice coding interviews together in real time. Think LeetCode meets Google Meet — users can host or join sessions, solve curated problems side by side in a shared editor, communicate over HD video and chat, and execute code instantly without leaving the platform.

---

## ✨ Features

- **🎥 HD Video & Chat** — Built-in real-time video calling and text chat powered by Stream.io. No external tools needed.
- **💻 Live Code Editor** — Monaco Editor (VS Code engine) with syntax highlighting for JavaScript, Python, and Java.
- **⚡ Instant Code Execution** — Run code directly in the browser via the Piston API and see output immediately.
- **🧩 Curated Problem Bank** — Hand-picked LeetCode-style problems with descriptions, examples, constraints, and starter code pre-loaded per language.
- **🔗 Session Management** — Create or browse open sessions, join with one click, and track active and completed sessions from your dashboard.
- **📊 Dashboard** — View your session history, stats, and currently active sessions at a glance.
- **📧 Welcome Emails** — Automated welcome emails sent to new users on sign-up via Nodemailer + Gmail.
- **🔐 Authentication** — Secure, seamless auth powered by Clerk (supports social login, email/password, etc.).
- **🔄 Background Jobs** — User sync and cleanup handled automatically via Inngest event-driven functions.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 7 | UI framework and build tool |
| TailwindCSS 4 + DaisyUI | Styling and UI components |
| Monaco Editor | VS Code-powered code editor |
| Stream Video React SDK | Video calling |
| Stream Chat React | In-session text messaging |
| TanStack Query | Server state management |
| React Router 7 | Client-side routing |
| Axios | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| Clerk (Express SDK) | Authentication middleware |
| Stream.io (Node SDK) | Video call + chat management |
| Inngest | Event-driven background functions |
| Nodemailer | Transactional emails |
| Piston API | Remote code execution |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Accounts on: [Clerk](https://clerk.dev), [Stream.io](https://getstream.io), [Inngest](https://inngest.com)

### 1. Clone the repository

```bash
git clone https://github.com/korukuro/TalentIDE.git
cd TalentIDE
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:5001
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
TalentIDE/
├── backend/
│   └── src/
│       ├── controllers/        # Route handler logic
│       │   ├── chatController.js
│       │   └── sessionController.js
│       ├── lib/                # Third-party integrations
│       │   ├── db.js           # MongoDB connection
│       │   ├── env.js          # Environment variable loader
│       │   ├── inngest.js      # Background job functions
│       │   └── stream.js       # Stream.io client setup
│       ├── middleware/
│       │   └── protectRoute.js # Auth middleware
│       ├── models/
│       │   ├── Session.js      # Session schema
│       │   └── User.js         # User schema
│       ├── routes/
│       │   ├── chatRoutes.js
│       │   └── sessionRoutes.js
│       └── server.js           # Express app entry point
│
└── frontend/
    └── src/
        ├── api/                # API call functions
        ├── components/         # Reusable UI components
        │   ├── CodeEditorPanel.jsx
        │   ├── VideoCallUI.jsx
        │   ├── OutputPanel.jsx
        │   └── ...
        ├── data/
        │   └── problems.js     # Problem bank
        ├── hooks/              # Custom React hooks
        ├── lib/                # Utilities and API clients
        │   └── piston.js       # Code execution integration
        ├── pages/              # Route-level page components
        │   ├── DashboardPage.jsx
        │   ├── SessionPage.jsx
        │   └── ...
        └── App.jsx
```

---

## 🧩 Problem Bank

TalentIDE currently ships with the following problems:

| Problem | Difficulty | Category |
|---|---|---|
| Two Sum | Easy | Array · Hash Table |
| Reverse String | Easy | String · Two Pointers |
| Valid Palindrome | Easy | String · Two Pointers |
| Maximum Subarray | Medium | Array · Dynamic Programming |
| Container With Most Water | Medium | Array · Two Pointers |

All problems include a description, examples, constraints, and starter code in JavaScript, Python, and Java.

---

## 🌐 Deployment

To build for production:

```bash
# Build the frontend
cd frontend && npm run build

# Run the backend (serves frontend static files in production)
cd ../backend && npm start
```

The backend is configured to serve the frontend's `dist` folder in production mode.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [korukuro](https://github.com/korukuro)

</div>
