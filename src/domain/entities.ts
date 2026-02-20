export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Bento' | 'Snack'

export interface RecipeIngredient {
  name: string
  quantity?: string
  optional?: boolean
}

export interface Recipe {
  id: string
  name: string
  ingredients: RecipeIngredient[]
  mealType?: MealType
  notes?: string
}

export interface PantryItem {
  id: string
  name: string
  quantity?: string
}

export interface MealSuggestion {
  recipeName: string
  matchedIngredients: string[]
  missingIngredients: RecipeIngredient[]
  explanation: string
}
