# V3: Deployment & Demo Readiness

## Iteration 1: API Proxy & Deploy

### Objective

Secure the Groq API key and deploy publicly.

### Tasks

1. **Serverless proxy:**
   - Vercel serverless function at `/api/suggest`.
   - Forwards requests to Groq with server-side API key.
   - Basic rate limiting.
   - `GroqAIService` calls proxy URL in production.

2. **Deploy:**
   - `vite build` + Vercel deployment.
   - Environment variable for Groq API key.
   - End-to-end verification on deployed URL.

## Iteration 2: Seed Data & Onboarding

### Objective

Make the app impressive on first visit.

### Tasks

1. **Seed data:**
   - 8-10 sample recipes (Japanese, Western, simple meals).
   - "Load Sample Data" button.
   - Sample pantry with common ingredients.

2. **Onboarding:**
   - Welcome modal (3 steps: Recipes, Pantry, Suggestions). Dismissible.

3. **Final QA:**
   - Test all three languages.
   - Mobile browser testing.
   - All Vitest tests pass.
