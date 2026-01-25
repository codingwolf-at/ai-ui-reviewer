# ReviewUI — AI Powered UI Reviewer

A frontend-focused product-style web app that uses AI to analyze UI code and screenshots and provide instant feedback on UX, accessibility, and code quality.

Built with Next.js • Tailwind CSS • OpenRouter AI • TypeScript

---

## Demo

https://github.com/user-attachments/assets/5b61a8c7-eed8-47c6-8bda-40e2095e04c0

👉 https://ai-ui-reviewer.vercel.app

---

## What It Does

AI UI Reviewer analyzes frontend code snippets and UI screenshots to provide actionable feedback across three areas: visual design, accessibility, and code quality.

The app uses a multi-stage processing pipeline designed to mirror real-world AI product patterns:

### Input Handling
- Accepts JSX, HTML, and CSS code for UI review
- Accepts UI screenshots for visual analysis
- Supports keyboard shortcuts and real-time preview

### Smart Input Validation
- Performs frontend checks to block low-quality or invalid inputs
- Uses server-side AI validation to confirm inputs are actually UI-related
- Prevents non-frontend code and non-UI images from being processed
- Reduces wasted API usage and improves output reliability

### AI-Powered Review
- Generates structured feedback focused on UI/UX, accessibility, and implementation quality
- Sanitizes and normalizes AI output before rendering
- Ensures consistent response formatting for predictable UI display

### Product-Focused UX
- Split-pane interface for input and results
- Loading states with visual feedback
- Light and dark mode support
- Error handling with clear user messaging

---

## Architecture Overview

```
User Input (Code / Image)
        ↓
Frontend Validation
- Basic input checks
- UI-related heuristics
        ↓
Backend Semantic Validation (AI)
- Confirms input is UI-related
- Blocks non-frontend code and non-UI images
        ↓
AI Review Generation
- UI/UX feedback
- Accessibility analysis
- Code quality suggestions
        ↓
Response Sanitization
- Output cleaning
- JSON normalization
        ↓
Frontend Rendering
- Structured result display
- Error handling and loading states
```
---

## Features
- Code and image-based UI review support
- AI-powered semantic input validation
- Frontend and backend input quality checks
- Structured review output (UI, Accessibility, Code Quality)
- Keyboard shortcut submission support
- Split-view layout for input and results
- Light and dark mode toggle
- Loading states and skeleton UI feedback
- Error handling with user-friendly messaging
- Deployed with environment-based API configuration

---

## Tech Stack
- Next.js (App Router) — frontend framework and API routes
- React + TypeScript — UI development and type safety
- Tailwind CSS — utility-first styling system
- OpenRouter API (GPT-4o Mini) — text and vision model used for semantic validation and UI review generation
- Vercel — deployment and hosting
- Custom Validation Pipeline — frontend heuristics + backend semantic checks

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
- Add toast notifications
