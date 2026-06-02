export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing Google API key. Set GOOGLE_API_KEY in environment variables.' });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid prompt.' });
  }

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

Website prompt: ${prompt}`;

  const payload = {
    contents: [{ parts: [{ text: text_prompt }] }]
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'Gemini API request failed', details: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: error?.message || 'Unexpected server error.' });
  }
}
