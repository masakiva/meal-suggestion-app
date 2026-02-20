export type IngredientCategory = 'Protein' | 'Vegetable' | 'Dairy' | 'Grain' | 'Seasoning' | 'Other'

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Bento' | 'Snack'

export interface Ingredient {
  id: string
  name: string
  category?: IngredientCategory
  quantity?: string
}

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
  prepTime?: number
  notes?: string
}

export interface PantryItem {
  id: string
  ingredient: Ingredient
  addedAt: Date
}

export interface MealSuggestion {
  recipeName: string
  score: number
  matchedIngredients: string[]
  missingIngredients: string[]
  explanation: string
}
