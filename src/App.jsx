import React, { useState, useEffect } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import { MdArrowUpward } from "react-icons/md";
import { ImNewTab } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import Editor from '@monaco-editor/react';
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt } from "react-icons/fa";
import { ImMobile } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

const App = () => {
  function getFallbackPreview(darkMode) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebAI - AI-Powered Website Builder</title>
  <style>
    :root {
      color-scheme: dark;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #f8fafc;
    }
    body.light {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      color: #0f172a;
    }
    .container {
      width: min(100%, 960px);
      text-align: center;
    }
    .hero-title {
      margin: 0;
      font-size: clamp(2.5rem, 4vw, 4rem);
      line-height: 1.02;
      letter-spacing: -0.04em;
    }
    .hero-subtitle {
      margin: 24px auto 0;
      max-width: 720px;
      font-size: 1.05rem;
      line-height: 1.8;
      opacity: 0.85;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin: 40px 0;
    }
    .card {
      border-radius: 28px;
      padding: 24px;
      background: rgba(15, 23, 42, 0.9);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
      text-align: left;
    }
    body.light .card {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
    }
    .card-title {
      margin: 0 0 12px;
      font-size: 1.2rem;
      font-weight: 700;
    }
    .card-text {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.7;
      opacity: 0.85;
    }
    .highlight {
      display: inline-block;
      background: linear-gradient(135deg, #7c3aed 0%, #38bdf8 100%);
      -webkit-background-clip: text;
      color: transparent;
      font-weight: 800;
    }
    .cta-panel {
      border-radius: 28px;
      padding: 32px;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(59, 130, 246, 0.95));
      color: #ffffff;
    }
    body.light .cta-panel {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(59, 130, 246, 0.95));
      color: #ffffff;
    }
    .cta-panel p {
      margin: 0;
      opacity: 0.92;
      line-height: 1.7;
    }
  </style>
</head>
<body class="${darkMode ? 'dark' : 'light'}">
  <div class="container">
    <p class="highlight">WebAI Preview</p>
    <h1 class="hero-title">AI-powered website builder</h1>
    <p class="hero-subtitle">Describe your website idea and watch AI generate a fully structured landing page instantly.</p>

    <div class="cards">
      <div class="card">
        <div style="font-size: 2rem; margin-bottom: 16px;">✨</div>
        <h2 class="card-title">AI-Powered</h2>
        <p class="card-text">Generate clean HTML with a modern design system and smart interaction structure.</p>
      </div>
      <div class="card">
        <div style="font-size: 2rem; margin-bottom: 16px;">⚡</div>
        <h2 class="card-title">Lightning Fast</h2>
        <p class="card-text">Turn your prompt into a responsive website preview in seconds.</p>
      </div>
      <div class="card">
        <div style="font-size: 2rem; margin-bottom: 16px;">🎨</div>
        <h2 class="card-title">Fully Responsive</h2>
        <p class="card-text">Looks great on desktop, tablet, and mobile with polished spacing and typography.</p>
      </div>
    </div>

    <section class="cta-panel">
      <p style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px;">Ready to build something amazing?</p>
      <p>Type your website description in the prompt box above and watch the magic happen.</p>
    </section>
  </div>
</body>
</html>`
  }

  const [prompt, setPrompt] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [isInNewTab, setIsInNewTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default theme is dark
  const [geminiFailureCount, setGeminiFailureCount] = useState(0);
  const [isGeminiBusy, setIsGeminiBusy] = useState(false);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [code, setCode] = useState(getFallbackPreview(true));

  const apiKey = import.meta.env.VITE_API_KEY || '';

  useEffect(() => {
    if (isPlaceholder) {
      setCode(getFallbackPreview(isDarkMode));
    }
  }, [isDarkMode, isPlaceholder]);

  // ✅ Clean Extraction of markdown code blocks
  function extractCode(response) {
    const ticks = "```";
    if (response.includes(ticks)) {
      const parts = response.split(ticks);
      let innerContent = parts[1] || response;
      innerContent = innerContent.replace(/^\w+\n/, "");
      return innerContent.trim();
    }
    return response.trim();
  }

  const downloadCode = () => {
    let filename = "WebAICode.html";
    let blob = new Blob([code], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // ✅ Call Gemini API safely using native fetch with standard exponential backoff
  async function callGeminiAPI(payload, retries = 5, delay = 1000) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiAPI(payload, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  async function getResponse() {
    if (prompt.trim() === "") {
      return;
    }

    setLoading(true);

    const text_prompt = `You are an expert frontend developer and UI/UX designer. The user will provide a detailed prompt describing what kind of website they want. Based on the user’s description, generate a fully working, production-ready website as a **single HTML file**. Use only **HTML, plain CSS**, vanilla JavaScript, and GSAP (via CDN).  

Strict output rules:
- Return the website as a single fenced Markdown code block with the language tag.  
- Do NOT include any explanations, text, or extra code blocks outside that single block. Only the HTML file content.  

Technical requirements:
1. **Stack**: HTML + CSS + vanilla JavaScript + GSAP (via CDN). Everything in one file.  
2. **Responsive**: Must be fully responsive (mobile, tablet, desktop) with modern grid and flex layouts.  
3. **Theme**: Default **dark mode**, but if the website type fits better in light mode, auto-select light mode. Include a **toggle button** to switch between dark and light themes.  
4. **Animations & Interactions**:   
   - GSAP scroll-based animations (fade, slide, stagger, parallax).  
   - Smooth hover effects with scale, shadow, and gradient transitions.  
   - Sticky navbar with subtle shadow on scroll.  
   - Animated gradient backgrounds or floating decorative shapes.  
5. **Visual richness**:   
   - Use high-quality **royalty-free images** (Unsplash via direct URLs).  
   - Apply **soft shadows, glassmorphism, or neumorphism** effects where suitable.  
   - Modern cards, rounded corners, gradient buttons, hover animations.  
6. **UI Sections** (as per user request):   
   - Sticky **Navbar** with logo + links + theme toggle.  
   - **Hero section** with headline, subheadline, CTA button, and background image/gradient.  
   - **Main content**: features grid, product showcase, gallery, blog cards, or whatever fits user’s request.  
   - **Call to Action** with strong button.  
   - **Footer** with the text: "Made with WebBuilder"  
7. **Code quality**: Clean, semantic HTML5, ARIA labels for accessibility, well-indented, and professional CSS usage.  
8. **Performance**: Optimized. No external CSS/JS frameworks beyond GSAP. Use responsive images, gradients, inline SVGs, or Unsplash placeholders.  

Final instruction: Output only the single fenced Markdown code block with the full HTML file content. Nothing else.  

Website prompt: ${prompt}`;

    const payload = {
      contents: [{ parts: [{ text: text_prompt }] }]
    };

    try {
      const data = await callGeminiAPI(payload);
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setCode(extractCode(generatedText));
        setGeminiFailureCount(0);
        setIsGeminiBusy(false);
        setIsPlaceholder(false);
      } else {
        throw new Error("Empty response received.");
      }
    } catch (error) {
      console.error(error);
      setGeminiFailureCount(prevCount => {
        const nextCount = prevCount + 1;
        if (nextCount >= 3) {
          setIsGeminiBusy(true);
        }
        return nextCount;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0a0c] text-white' : 'bg-gray-50 text-neutral-900'}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h3 className="text-[32px] md:text-[40px] font-extrabold leading-tight">
            Turn Ideas into Websites Instantly with{' '}
            <span className="bg-gradient-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent">WebAI</span>
          </h3>
          <p className={`mt-3 text-[16px] ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Describe your website and AI will code for you.
          </p>
        </div>

        {/* Prompt Input Box */}
        <div className={`relative flex items-center border rounded-2xl p-2 max-w-[800px] mx-auto mb-16 shadow-lg transition-all ${isDarkMode ? 'bg-[#121215] border-neutral-800 focus-within:border-purple-500' : 'bg-white border-neutral-300 focus-within:border-purple-600'}`}>
          <textarea 
            onChange={(e) => setPrompt(e.target.value)} 
            value={prompt} 
            placeholder="Describe your website in detail..."
            className="w-full h-24 bg-transparent outline-none resize-none px-4 py-2 text-[15px]"
          />
          {prompt.trim() !== "" && (
            <button 
              onClick={getResponse} 
              className="absolute right-4 bottom-4 w-[36px] h-[36px] flex items-center justify-center bg-[#9933ff] text-white rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
              </svg>
            </button>
          )}
        </div>

        <p className="text-[20px] font-bold mb-6 text-center md:text-left">Your AI-Generated Website will appear here.</p>

        {/* Live Preview / Code Editor Section */}
        <div className={`rounded-2xl border overflow-hidden shadow-2xl transition-all ${isDarkMode ? 'border-neutral-800 bg-[#121215]' : 'border-neutral-200 bg-white'}`}>
          <div className={`flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b ${isDarkMode ? 'border-neutral-800 bg-[#16161a]' : 'border-neutral-100 bg-gray-50'}`}>
            <h3 className="font-bold text-[16px] mb-3 sm:mb-0">Live Preview</h3>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setIsInNewTab(true)} 
                className={`text-[13px] font-medium px-4 py-2 rounded-lg flex items-center gap-2 border transition-all ${isDarkMode ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'}`}
              >
                Open in new tab 
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
              <button 
                onClick={downloadCode} 
                className={`text-[13px] font-medium px-4 py-2 rounded-lg flex items-center gap-2 border transition-all ${isDarkMode ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'}`}
              >
                Download 
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path>
                </svg>
              </button>
              <button 
                onClick={() => setIsShowCode(!isShowCode)} 
                className={`text-[13px] font-medium px-4 py-2 rounded-lg flex items-center gap-2 border transition-all ${isDarkMode ? 'border-neutral-700 hover:bg-neutral-800 text-white' : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'}`}
              >
                {isShowCode ? "Hide Code" : "Show Code"}{' '}
                {isShowCode ? (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L217.1 300c5.65 0 10.26-4.61 10.26-10.26v-15.48c0-5.65-4.61-10.26-10.26-10.26h-82.05c-5.65 0-10.26 4.61-10.26 10.26v82.05c0 5.65 4.61 10.26 10.26 10.26h15.48c5.65 0 10.26-4.61 10.26-10.26l.04-33.15C193.14 384.34 252.38 416 320 416c117.8 0 216.51-80.45 244.3-191.13 2.53-10.07-3.55-20.37-13.62-22.91l-15-3.79c-10.07-2.54-20.37 3.55-22.91 13.62C490.52 301.81 413.41 368 320 368zm296.38-204.09l-15 3.79c-10.07 2.54-20.37-3.55-22.91-13.62C550.52 110.19 473.41 44 380 44c-75.85 0-137.25 58.71-142.9 133.11L277.1 144c5.65 0 10.26 4.61 10.26 10.26v15.48c0 5.65-4.61 10.26-10.26 10.26h-82.05c-5.65 0-10.26-4.61-10.26-10.26V107.4c0-5.65-4.61-10.26-10.26-10.26h-15.48c-5.65 0-10.26 4.61-10.26 10.26l-.04 33.15C103.14 59.66 162.38 28 230 28c117.8 0 216.51 80.45 244.3 191.13 2.53 10.07-3.55 20.37-13.62 22.91z"></path>
                  </svg>
                ) : (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="w-[15px] h-[15px]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.71 135.59 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.27 95.27 0 0 0-25.27 3.51 60 60 0 0 1-14.15 32.44 59.85 59.85 0 0 1-32.4 14.19c-.39 3.25-.63 6.51-.63 9.86a72 72 0 1 0 72.45-60z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="h-[500px]">
            {isShowCode ? (
              // Reliable Custom HTML/CSS Code Editor Fallback
              <textarea
                onChange={(e) => setCode(e.target.value)}
                value={code}
                className="w-full h-full p-6 font-mono text-[14px] bg-[#1a1a1e] text-neutral-200 border-none outline-none resize-none focus:ring-0 leading-relaxed"
                spellCheck="false"
              />
            ) : (
              <>
                {loading ? (
                  // Elegant custom spinner
                  <div className="w-full h-full flex items-center justify-center flex-col">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full animate-pulse"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-[23px] mt-6 font-semibold">
                      <span className="bg-gradient-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent">Generating</span> your website...
                    </h3>
                    <p className="text-[15px] mt-2 text-neutral-400">This may take a few minutes while the AI builds your complete site.</p>
                  </div>
                ) : (
                  <iframe srcDoc={code} title="Live Site" className={`w-full h-full border-none ${isDarkMode ? 'bg-[#0b1120]' : 'bg-white'}`}></iframe>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modern Pop-up Modal (Single File) */}
      {isInNewTab && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-[90%] h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="bg-neutral-100 px-6 h-[70px] flex items-center justify-between border-b border-neutral-200">
              <h3 className="font-bold text-neutral-900">Responsive Preview Panel</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsInNewTab(false)} 
                  className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-all"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 0 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <iframe srcDoc={code} title="Full Screen View" className="w-full flex-grow bg-white"></iframe>
          </div>
        </div>
      )}
      {isGeminiBusy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-md rounded-3xl bg-[#111827] p-6 shadow-2xl ring-1 ring-white/10">
            <h3 className="text-2xl font-semibold text-white">Gemini Server Busy</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              The Gemini service has failed several times. Please wait a few moments and try again.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsGeminiBusy(false)}
                className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App