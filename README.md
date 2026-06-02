# 🚀 WebAI - AI-Powered Website Builder

> **Transform your ideas into fully functional websites in seconds using artificial intelligence.**

Turn simple text descriptions into production-ready HTML websites with one click. WebAI combines the power of Google's Gemini AI with a modern React interface to make web development accessible to everyone.

**🔗 [Live Demo →](https://web-ai-seven-inky.vercel.app/)**

---

## ✨ Features

- **🤖 AI-Powered Generation** — Describe your website concept and let Gemini AI generate complete, production-ready HTML
- **⚡ Instant Preview** — See your generated website live in a real-time iframe preview
- **🎨 Beautiful UI** — Modern, responsive interface with dark/light theme support
- **📱 Fully Responsive** — Generated websites work perfectly on desktop, tablet, and mobile devices
- **🎭 Theme Toggle** — Built-in dark mode and light mode for generated websites
- **✏️ Code Editor** — View and edit the generated HTML code directly
- **💾 Download** — Export your generated website as a standalone HTML file
- **🔄 Live Reload** — Instant preview updates as you refine your prompt
- **🎬 Smooth Animations** — GSAP-powered animations and transitions in generated sites
- **🌐 Production Ready** — AI generates clean, semantic HTML with accessibility support

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **AI Engine**: Google Gemini 2.5 Flash API
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Icons**: React Icons
- **Animations**: GSAP (in generated websites)
- **Deployment**: Vercel (serverless functions)
- **Build Tool**: Vite

---

## 🚀 Live Demo

Visit the deployed application here:  
**[https://web-ai-seven-inky.vercel.app/](https://web-ai-seven-inky.vercel.app/)**

Try describing what kind of website you want:
- "Create a modern portfolio website for a photographer"
- "Build a SaaS landing page with pricing table"
- "Design an e-commerce product showcase"

---

## 📋 How It Works

1. **Enter Your Prompt** — Describe the website you want to build (e.g., "Create a modern SaaS landing page")
2. **AI Generation** — Gemini AI generates complete HTML/CSS code based on your description
3. **Live Preview** — See your website rendered instantly in the preview panel
4. **Edit & Download** — Fine-tune the code or download as HTML to use anywhere

---

## 📁 Project Structure

```
WebAI/
├── src/
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.css            # Tailwind imports
│   ├── main.jsx             # React entry point
│   └── components/
│       └── Navbar.jsx       # Navigation & theme toggle
├── api/
│   └── generate.js          # Vercel serverless function (backend)
├── public/                  # Static assets
├── package.json             # Dependencies
├── vite.config.js           # Vite config
├── tailwind.config.js       # Tailwind config
├── .env                     # Environment variables (local only)
└── README.md               # This file
```

---

## 🚀 Deployment

### Deploy to Vercel


## 💡 API Rate Limits

- **Free Tier**: 20 requests/day (resets every 24 hours)
---

## 🎨 Generated Website Features

Each AI-generated website includes:

- **Responsive Design** — Mobile, tablet, desktop optimized
- **Dark/Light Mode** — Toggle theme button included
- **Modern Styling** — Clean typography, spacing, and color schemes
- **Smooth Animations** — GSAP scroll effects and hover transitions
- **Semantic HTML** — Accessibility-first code with ARIA labels
- **Optimized Images** — Royalty-free placeholders from Unsplash
- **Professional Layout** — Hero, features, CTA, footer sections

---


## 🐛 Troubleshooting

### 429 Too Many Requests
- You've hit the free tier quota (20 requests/day)
- Wait 24 hours for reset, or enable billing

### 503 Service Unavailable
- Gemini API is experiencing high demand
- Retry after a few moments

### Empty Response
- Your prompt may be too vague
- Try: "Create a modern landing page with hero section, features, and CTA"

---

<div align="center">

**Made with ❤️ by WebAI**

[Visit Live Demo →](https://web-ai-seven-inky.vercel.app/)

</div>
