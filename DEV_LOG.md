# Meal Suggester: Development Log

## Planning

- [x] Define project plan, ubiquitous language, technical stack
- [x] Set up development guidelines (AGENTS.md)
- [x] Extract V1/V2/V3 detailed plans into `docs/`
- [ ] Review plan files with collaborator (UI styling decision pending)

## V1 Iteration 1: Project Bootstrap

- [x] Scaffold project with create-vue (TypeScript, Router, Vitest, ESLint, Prettier)
- [x] Install tailwindcss, vue-i18n, idb
- [x] Configure Tailwind CSS v4 via `@tailwindcss/vite` plugin
- [x] Scaffold `src/` directory structure (domain, infrastructure, application, ui/*)
- [x] Verified: 1 unit test passing (`npm run test:unit`)

## V1 Iteration 2: Domain Modeling

- [x] Defined domain entities (`src/domain/entities.ts`): `MealType`, `RecipeIngredient`, `Recipe`, `PantryItem`, `MealSuggestion`
- [x] Reviewed and simplified entities: flattened `PantryItem`, dropped `IngredientCategory`, `prepTime`, `addedAt`, `MealSuggestion.score`
- [x] Deferred fields logged in `PROJECT_PLAN.md` (Future Improvements) and `docs/v1-setup-domain-crud.md`
