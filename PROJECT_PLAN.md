# Meal Suggester PoC: Dev Plan Roadmap

## Context

Every day, the same question: "What should we eat?" The problem isn't cooking — it's deciding. This app stores recipes you love, tracks what ingredients you have, and uses AI to suggest what to cook tonight.

## Goal

Build a deployable PoC where users can: (1) manage a recipe bank, (2) track pantry ingredients, and (3) get AI-powered meal suggestions based on what they have.

This PoC targets two audiences:
- **Collaborators** who need clean architecture to start contributing.
- **Friends** who want to try the app via a URL.

## Decisions

- **PoC strategy:** Single PoC targeting both collaborators and friends/users.
- **PoC scope:** Full core loop — Recipe Bank + Ingredients List + AI Suggestions.
- **Storage:** Hybrid — IndexedDB with repository abstraction (future Tauri/SQLite swap).
- **Groq access:** Direct client-side first, then thin serverless proxy before deployment.
- **Deployment:** Online (Vercel/Netlify). Friends get a URL.
- **UI styling:** Tailwind CSS.
- **Language:** i18n with vue-i18n. English (default), Japanese, French.
- **API key UX:** Proxy only. Friends just use the app, key is server-side.
- **Ingredient input:** Free text. AI handles fuzzy/synonym/cross-language matching.
- **Matching strategy:** AI does all recipe-to-pantry matching. Domain-level matcher deferred.

---

## Ubiquitous Language

| Term | Definition |
|------|------------|
| **Recipe** | A dish the user loves. Has a name, list of ingredients, and optional metadata. |
| **Ingredient** | A named food item, optionally with quantity and category. |
| **Pantry** | The collection of ingredients the user currently has at home. |
| **MealSuggestion** | An AI-generated recommendation: which recipe to cook, why it matches the pantry, and what's missing. |
| **MealType** | Classification: Breakfast, Lunch, Dinner, Bento, Snack. |

## Technical Stack

- **Framework:** Vue 3 + TypeScript (Composition API)
- **AI:** Groq API (LLM-powered matching and suggestions)
- **Storage:** IndexedDB via `idb` library, behind repository interfaces
- **Styling:** Tailwind CSS
- **i18n:** vue-i18n (EN, JA, FR)
- **Testing:** Vitest + `fake-indexeddb` + `@vue/test-utils`
- **Build:** Vite
- **Deployment:** Vercel (serverless proxy + static SPA)

## Roadmap

- **V1: Project Setup, Domain & CRUD (~10-12h)**
- **V2: AI Suggestions (~5-7h)**
- **V3: Deployment & Demo Readiness (~3-5h)**

## Testing Strategy

| Layer | Approach |
|-------|----------|
| Domain (entities, types) | Type-checking only (compile-time) |
| Infrastructure (repositories) | Integration tests with `fake-indexeddb` |
| Application (use cases) | Unit tests with mocked repos + AI service |
| UI (components) | `@vue/test-utils` for critical interactions |
| AI integration | Mock `AIService` in tests; manual testing with real Groq |
