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

## 🔧 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google API Key (free tier available)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/webai.git
cd webai

# Install dependencies
npm install

# Create .env file
echo "GOOGLE_API_KEY=your_api_key_here" > .env

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

**Get your API key:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your key and paste into `.env`

> **Important for Production**: Set `GOOGLE_API_KEY` as an environment variable in your Vercel project settings, not in the `.env` file.

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

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy WebAI"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Set Environment Variables**
   - In Vercel Project Settings → Environment Variables
   - Add: `GOOGLE_API_KEY` = your_actual_api_key
   - Select `Production` and `Preview`

4. **Deploy**
   - Vercel will auto-deploy on push
   - Your app is live!

---

## 💡 API Rate Limits

- **Free Tier**: 20 requests/day (resets every 24 hours)
- **Paid Tier**: Higher quotas available with billing enabled

To increase limits:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable billing on your project
3. Quotas increase instantly

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

## 🔐 Security

- API key is securely handled on the backend (Vercel serverless function)
- No secrets exposed in client-side code
- Environment variables protected in Vercel dashboard
- Recommended: Regenerate API keys if exposed

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

## 📝 Future Enhancements

- [ ] Save and manage multiple projects
- [ ] Export to React/Vue components
- [ ] Custom CSS preprocessing
- [ ] Backend CMS integration
- [ ] Template library
- [ ] Collaboration features
- [ ] Version history

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Google Gemini API](https://ai.google.dev/) — AI generation engine
- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [GSAP](https://gsap.com/) — Animations
- [Vercel](https://vercel.com/) — Deployment platform

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/webai/issues)
- **Email**: your-email@example.com

---

<div align="center">

**Made with ❤️ by WebAI**

[Visit Live Demo →](https://web-ai-seven-inky.vercel.app/)

</div>