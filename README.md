# ReviewUI — AI Powered UI Reviewer

ReviewUI is a full-stack web app that analyzes frontend UI code and provides structured feedback on:

- UI/UX improvements
- Accessibility issues
- Code quality and best practices

The goal of this project was to build a realistic AI-powered product with production-grade frontend UX and backend reliability patterns.

---

## Features

- Paste JSX/HTML and get instant AI-powered reviews
- Hybrid feedback system (Design + Accessibility + Code Quality)
- Smooth loading experience with skeleton screens
- Optimized action button interactions and state handling
- Server-side validation and sanitization of AI responses
- Responsive layout built with Tailwind CSS

---

## Tech Stack

Frontend:
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

Backend:
- Next.js API Routes
- Hugging Face Inference API
- Server-side response normalization

---

## Engineering Focus

This project focuses on:

- Real AI integration instead of mock responses
- Output validation and error handling
- UX polish and perceived performance optimization
- Clean component architecture
- Production-style async state management

---

## Local Setup

1. Clone repository to your computer
2. Install dependencies - `npm i`
3. Create environment file - `.env.local`
4. Add your Hugging Face Access token to the environment file in the following format - `HUGGINGFACE_API_KEY=your_api_key_here`
5. Run development server - `npm run dev`

---

## Future Improvements

- Image support
- Authentication and saved review history
- Review comparison and diff view
- Model selector
- Dark / light theme toggle
- Export reviews to markdown or PDF
- Copy review button
- Clear input button
- Keyboard shortcut (Cmd+Enter to review)
- Add toast notification

