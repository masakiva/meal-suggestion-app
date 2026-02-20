import type { Recipe, PantryItem, MealType, MealSuggestion } from './entities'

export interface AIService {
  generateSuggestions(
    recipes: Recipe[],
    pantryItems: PantryItem[],
    mealType?: MealType,
  ): Promise<MealSuggestion[]>
}
