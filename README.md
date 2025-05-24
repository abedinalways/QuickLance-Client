# QuickLance

QuickLance is a freelance service platform where users can browse freelancers, add services, and manage them. This is the frontend of the project built using React and Tailwind CSS.

🔗 **Live Site:** [https://quicklance-e9af0.web.app/](https://quicklance-e9af0.web.app/)

---

## 🚀 Tech Stack

- **React** – UI rendering and state management
- **React Router** – Client-side routing
- **Tailwind CSS & DaisyUI** – Styling and components
- **React Icons** – Icon support
- **React Simple Typewriter** – Typing animation
- **React Awesome Reveal** – Scroll animations
- **Firebase Auth** – User authentication
- **Firebase Hosting** – Frontend deployment

---

## 🌟 Features

- 🔐 User Authentication (Sign in/up using Firebase)
- 📄 CRUD Operations for Freelance Services
- 🧭 Dynamic Navigation with Protected Routes
- 🌙 Light/Dark Theme Toggle with DaisyUI
- 📱 Fully Responsive Design with modern UI/UX
- ✨ Animated text and smooth scroll-based reveals
- 🛠️ Add, edit, or delete your freelance listings

## 📂 Project Structure
QUICKLANCE-CLIENT/
├── .firebase/ # Firebase project configuration
├── dist/ # Build output directory (created after build)
├── node_modules/ # Installed dependencies
├── public/ # Static files and index.html
├── src/ # Source code
│ ├── assets/ # Images and other media
│ ├── Components/ # Reusable UI components
│ ├── Context/ # React Context API for global state
│ ├── Firebase/ # Firebase configuration and initialization
│ ├── Pages/ # Route-level pages (Home, Login, etc.)
│ ├── Routes/ # All application routes (React Router)
│ ├── App.css # App-specific styling
│ ├── App.jsx # Root App component
│ ├── index.css # Global styling
│ └── main.jsx # React entry point with Router & Context
├── .env.local # Environment variables (local only)
├── .firebaserc # Firebase project alias
├── .gitignore # Files/directories to ignore in git
├── eslint.config.js # ESLint configuration
├── firebase.json # Firebase hosting and build configuration
└── index.html # Root HTML file served by Vite
├── package.json # Node dependencies and scripts
└── README.md
├── tailwind.config.js # TailwindCSS config
├── vite.config.js # Vite configuration

## 🔧 Getting Started

```bash
git clone https://github.com/your-username/quicklance-frontend.git
cd quicklance-frontend
npm install
npm run dev