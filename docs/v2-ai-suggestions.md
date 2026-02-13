# V2: AI Suggestions

## Iteration 1: AI Integration

### Objective

Implement AI-powered meal suggestions. Groq as initial provider behind generic `AIService`.

### Tasks

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

## Iteration 2: Settings & Polish

### Objective

Settings screen and UX improvements.

### Tasks

1. **Settings view:**
   - AI model selector.
   - Language selector.
   - Data export/import (recipes + pantry as JSON).

2. **UX polish:**
   - Toast notifications for CRUD operations.
   - Empty states for each view.
   - Responsive layout (mobile-first).
   - i18n completion for all three languages.
