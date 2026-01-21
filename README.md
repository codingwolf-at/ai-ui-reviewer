# ReviewUI — AI Powered UI Reviewer

A frontend-focused product-style web app that uses AI to analyze UI code and screenshots and provide instant feedback on UX, accessibility, and code quality.

Built with Next.js • Tailwind CSS • OpenRouter AI • TypeScript

---

## Live Demo

👉 https://ai-ui-reviewer.vercel.app

---

## What It Does

- Analyze frontend UI code and screenshots using AI
- Provides feedback across UI/UX, accessibility, and code quality
- Supports both code input and image-based UI review
- Prevents duplicate requests with smart input change detection
- Smooth loading states and product-style UI experience

---

## Tech Stack

Frontend:
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

Backend:
- Next.js API Routes
- OpenRouter AI API
    - `mistralai/mistral-7b-instruct` for text inputs 
    - `openai/gpt-4o-mini` for image inputs 

Other:
- Vercel Deployment
- Environment variable configuration

---

## Key Features

- Split-pane responsive layout (desktop & mobile)
- Loading skeletons and spinners
- Disabled state handling and tooltips
- Input caching to prevent duplicate reviews
- Image-to-base64 conversion for AI processing
- Error handling and fallback UI states

---
## Screenshots TODO
---

## Local Setup

1. Clone repository to your computer - `https://github.com/codingwolf-at/ai-ui-reviewer.git`
2. Install dependencies - `npm i`
3. Create environment file - `.env.local`
4. Add your OpenRouter API Key to the environment file in the following format - `OPENROUTER_API_KEY=your_api_key_here`
5. Run development server - `npm run dev`

---

## Future Improvements

- Authentication and saved review history
- Model selector
- Dark / light theme toggle
- Export reviews to markdown or PDF
- Copy review button
- Keyboard shortcut (Cmd+Enter to review)
- Add toast notification
