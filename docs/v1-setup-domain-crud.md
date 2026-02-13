# V1: Project Setup, Domain & CRUD

## Iteration 1: Project Bootstrap

### Objective

Set up the development environment with all tooling configured and verified.

**Tech Stack:** Vite, Vue 3, TypeScript, Vitest, Tailwind CSS, vue-i18n.

### Tasks

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

## Iteration 2: Domain Modeling

### Objective

Define all domain types and repository interfaces. No implementation — types only.

### Tasks

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

## Iteration 3: IndexedDB Repositories

### Objective

Implement repository interfaces with IndexedDB. Tested with `fake-indexeddb`.

### Tasks

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

## Iteration 4: Recipe Bank UI

### Objective

Build the Recipe Bank management screen and app shell.

### Tasks

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

## Iteration 5: Pantry Management UI

### Objective

Build the Pantry management screen.

### Tasks

1. **PantryForm component:**
   - Fields: ingredient name, category (select), quantity (optional).
   - Quick-add: type + Enter.

2. **PantryList component:**
   - Items grouped by category.
   - Delete per item. "Clear All" with confirmation.

3. **Pantry view** (`/pantry`):
   - Composes PantryForm + PantryList.
   - Wired via `usePantry` composable → `IndexedDBPantryRepository`.
