# Meal Suggester PoC: Dev Plan Roadmap

## Context

We need a PoC to demonstrate the core value of a meal suggestion app: "tell the app what you have, it suggests what to cook." This PoC targets two audiences: (1) collaborators who need clean architecture to start contributing, and (2) friends who want to try the app via a URL.

## Research Log

### Decisions

- [x] **PoC strategy:** Single PoC targeting both collaborators and friends/users.
- [x] **PoC scope:** Full core loop — Recipe Bank + Ingredients List + AI Suggestions.
- [x] **Timeline:** No hard deadline. Quality over speed, but still soon.
- [x] **Storage:** Hybrid — IndexedDB with repository abstraction (future Tauri/SQLite swap).
- [x] **Groq access:** Direct client-side first, then thin serverless proxy before deployment.
- [x] **Deployment:** Online (Vercel/Netlify). Friends get a URL.
- [x] **UI styling:** Tailwind CSS.
- [x] **Language:** i18n with vue-i18n. English (default), Japanese, French.
- [x] **API key UX:** Proxy only. Friends just use the app, key is server-side.
- [x] **Ingredient input:** Free text. AI handles fuzzy/synonym/cross-language matching.
- [x] **Matching strategy:** AI does all recipe-to-pantry matching. Domain-level matcher deferred.

---

## Project Context

Every day, the same question: "What should we eat?" The problem isn't cooking — it's deciding. This app stores recipes you love, tracks what ingredients you have, and uses AI to suggest what to cook tonight.

### Ubiquitous Language

| Term | Definition |
|------|------------|
| **Recipe** | A dish the user loves. Has a name, list of ingredients, and optional metadata. |
| **Ingredient** | A named food item, optionally with quantity and category. |
| **Pantry** | The collection of ingredients the user currently has at home. |
| **MealSuggestion** | An AI-generated recommendation: which recipe to cook, why it matches the pantry, and what's missing. |
| **MealType** | Classification: Breakfast, Lunch, Dinner, Bento, Snack. |

### Technical Stack

- **Framework:** Vue 3 + TypeScript (Composition API)
- **AI:** Groq API (LLM-powered matching and suggestions)
- **Storage:** IndexedDB via `idb` library, behind repository interfaces
- **Styling:** Tailwind CSS
- **i18n:** vue-i18n (EN, JA, FR)
- **Testing:** Vitest + `fake-indexeddb` + `@vue/test-utils`
- **Build:** Vite
- **Deployment:** Vercel (serverless proxy + static SPA)

## Goal

Build a deployable PoC where users can: (1) manage a recipe bank, (2) track pantry ingredients, and (3) get AI-powered meal suggestions based on what they have.

**Total Estimated Workload:** ~18-24 Hours

## Roadmap

- **V1: Project Setup, Domain & CRUD (~10-12h)**
  - Environment, domain entities, repository interfaces + IndexedDB.
  - Recipe Bank and Pantry management UI.
  - i18n foundation, routing, app shell.
- **V2: AI Suggestions (~5-7h)**
  - Groq integration behind `AIService` interface.
  - Suggestion UI with AI-powered matching.
  - Settings screen (model selector, data export/import).
- **V3: Deployment & Demo Readiness (~3-5h)**
  - Serverless proxy for Groq API key.
  - Seed data, onboarding, deploy.

---

## V1: Project Setup, Domain & CRUD

### Iteration 1: Project Bootstrap

#### Objective

Set up the development environment with all tooling configured and verified.

**Tech Stack:** Vite, Vue 3, TypeScript, Vitest, Tailwind CSS, vue-i18n.

#### Tasks

1. **Initialize project:**
   - `npm create vite@latest` with Vue + TypeScript template.
   - Install: `vitest`, `tailwindcss`, `vue-i18n`, `vue-router`, `idb`.
   - Configure `tsconfig.json` (strict mode).
   - Configure Tailwind CSS.
   - Configure Vitest.

2. **Directory structure:**

   ```
   src/
     domain/         # Entities, types, interfaces (zero dependencies)
     infrastructure/ # IndexedDB repositories, Groq service
     application/    # Use cases (orchestration)
     ui/
       components/   # Reusable Vue components
       views/        # Page-level components
       composables/  # Vue composables (useRecipes, usePantry, etc.)
       i18n/         # Locale JSON files
     router/         # Vue Router config
   ```

3. **Verify setup:** Trivial passing test + dev server runs.

### Iteration 2: Domain Modeling

#### Objective

Define all domain types and repository interfaces. No implementation — types only.

#### Tasks

1. **Domain entities** (`src/domain/entities.ts`):
   - `Ingredient`: `{ id, name, category?, quantity? }`
   - `IngredientCategory`: `'Protein' | 'Vegetable' | 'Dairy' | 'Grain' | 'Seasoning' | 'Other'`
   - `Recipe`: `{ id, name, ingredients: RecipeIngredient[], mealType?, prepTime?, notes? }`
   - `RecipeIngredient`: `{ name, quantity?, optional? }`
   - `MealType`: `'Breakfast' | 'Lunch' | 'Dinner' | 'Bento' | 'Snack'`
   - `PantryItem`: `{ id, ingredient: Ingredient, addedAt: Date }`
   - `MealSuggestion`: `{ recipeName, score, matchedIngredients, missingIngredients, explanation }`

2. **Repository interfaces** (`src/domain/repositories.ts`):
   - `RecipeRepository`: `getAll, getById, save, delete`
   - `PantryRepository`: `getAll, save, delete, clear`

3. **AI service interface** (`src/domain/services.ts`):
   - `AIService`: `generateSuggestions(recipes, pantryItems, mealType?): Promise<MealSuggestion[]>`

### Iteration 3: IndexedDB Repositories

#### Objective

Implement repository interfaces with IndexedDB. Tested with `fake-indexeddb`.

#### Tasks

1. **DB setup** (`src/infrastructure/db.ts`):
   - Database: `meal-suggester`, version 1.
   - Object stores: `recipes`, `pantry`.

2. **`IndexedDBRecipeRepository`** (`src/infrastructure/IndexedDBRecipeRepository.ts`):
   - Implements `RecipeRepository`.
   - ID generation: `crypto.randomUUID()`.
   - TDD: CRUD operations tested with `fake-indexeddb`.

3. **`IndexedDBPantryRepository`** (`src/infrastructure/IndexedDBPantryRepository.ts`):
   - Implements `PantryRepository`.
   - TDD: CRUD + clear operations.

### Iteration 4: Recipe Bank UI

#### Objective

Build the Recipe Bank management screen and app shell.

#### Tasks

1. **i18n setup:**
   - `en.json`, `ja.json`, `fr.json` with keys for Recipe Bank UI.
   - Language switcher component.

2. **App shell:**
   - Vue Router: `/recipes`, `/pantry`, `/suggestions`.
   - Layout: header (app name + language switcher) + navigation tabs.

3. **RecipeForm component:**
   - Fields: name, meal type (select), prep time, notes.
   - Dynamic ingredient rows: name + quantity + optional checkbox. Add/remove rows.
   - Validation: name required, at least one ingredient.

4. **RecipeList component:**
   - Recipe cards: name, meal type badge, ingredient count.
   - Delete button (with confirmation).

5. **Recipe view** (`/recipes`):
   - Composes RecipeForm + RecipeList.
   - Wired via `useRecipes` composable → `IndexedDBRecipeRepository`.

### Iteration 5: Pantry Management UI

#### Objective

Build the Pantry management screen.

#### Tasks

1. **PantryForm component:**
   - Fields: ingredient name, category (select), quantity (optional).
   - Quick-add: type + Enter.

2. **PantryList component:**
   - Items grouped by category.
   - Delete per item. "Clear All" with confirmation.

3. **Pantry view** (`/pantry`):
   - Composes PantryForm + PantryList.
   - Wired via `usePantry` composable → `IndexedDBPantryRepository`.

---

## V2: AI Suggestions

### Iteration 1: Groq Integration

#### Objective

Implement AI-powered meal suggestions using Groq.

#### Tasks

1. **`GroqAIService`** (`src/infrastructure/GroqAIService.ts`):
   - Implements `AIService` interface.
   - Builds a prompt: "Given these recipes [list] and these pantry ingredients [list], suggest the best meals to cook. Rank by feasibility."
   - Parses structured LLM response into `MealSuggestion[]`.
   - API key from config (direct calls for dev, proxy URL for prod).
   - Model: `llama-3.1-8b-instant` (configurable).
   - Error handling: user-friendly message on failure.

2. **`SuggestionUseCase`** (`src/application/SuggestionUseCase.ts`):
   - Fetches recipes and pantry from repositories.
   - Calls `AIService.generateSuggestions`.
   - Returns `MealSuggestion[]`.

3. **Suggestion UI:**
   - SuggestionCard: recipe name, match score bar, matched/missing ingredient chips, AI explanation.
   - SuggestionList: sorted cards, optional meal type filter.
   - Suggestion view (`/suggestions`): "Get Suggestions" button, loading state, empty states.

### Iteration 2: Settings & Polish

#### Objective

Settings screen and UX improvements.

#### Tasks

1. **Settings view:**
   - Groq model selector.
   - Language selector.
   - Data export/import (recipes + pantry as JSON).

2. **UX polish:**
   - Toast notifications for CRUD operations.
   - Empty states for each view.
   - Responsive layout (mobile-first).
   - i18n completion for all three languages.

---

## V3: Deployment & Demo Readiness

### Iteration 1: API Proxy & Deploy

#### Objective

Secure the Groq API key and deploy publicly.

#### Tasks

1. **Serverless proxy:**
   - Vercel serverless function at `/api/suggest`.
   - Forwards requests to Groq with server-side API key.
   - Basic rate limiting.
   - `GroqAIService` calls proxy URL in production.

2. **Deploy:**
   - `vite build` + Vercel deployment.
   - Environment variable for Groq API key.
   - End-to-end verification on deployed URL.

### Iteration 2: Seed Data & Onboarding

#### Objective

Make the app impressive on first visit.

#### Tasks

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

---

## Testing Strategy

| Layer | Approach |
|-------|----------|
| Domain (entities, types) | Type-checking only (compile-time) |
| Infrastructure (repositories) | Integration tests with `fake-indexeddb` |
| Application (use cases) | Unit tests with mocked repos + AI service |
| UI (components) | `@vue/test-utils` for critical interactions |
| AI integration | Mock `AIService` in tests; manual testing with real Groq |

## Future Improvements (Out of PoC Scope)

- Domain-level `IngredientMatcher` for offline scoring
- Tauri integration (swap IndexedDB → SQLite)
- Autocomplete for ingredient names
- Predefined ingredient list with synonyms
- Recipe editing (not just add/delete)
- Pantry item quantity merging
- Expiration tracking
- Shared household sync

## Verification

- `npm run dev` → app loads with all three routes
- Add a recipe → appears in recipe list → persists on refresh
- Add pantry items → appear grouped by category → persist on refresh
- Click "Get Suggestions" → loading state → AI suggestions appear with explanations
- Switch language → all UI text updates
- `npx vitest run` → all tests pass
- Deployed URL → same behavior as local
