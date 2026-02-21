export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Bento' | 'Snack'

export interface Ingredient {
  name: string
  quantity?: string
}

export interface Recipe {
  id: string
  name: string
  ingredients: Ingredient[]
  mealType?: MealType
  notes?: string
}

export interface PantryItem {
  id: string
  ingredients: Ingredient
}

export interface MealSuggestion {
  recipeName: string
  matchedIngredients: string[]
  missingIngredients: Ingredient[]
  explanation: string
}
