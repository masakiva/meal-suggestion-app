import { ref } from 'vue'
import type { MealType, Recipe } from '../../domain/entities'

export interface IngredientRow {
  id: string
  name: string
  quantity: string
}

export function useRecipeForm() {
  const name = ref('')
  const mealType = ref<MealType | ''>('')
  const notes = ref('')
  const ingredients = ref<IngredientRow[]>([])

  function addIngredient(): void {
    ingredients.value.push({ id: crypto.randomUUID(), name: '', quantity: '' })
  }

  function removeIngredient(index: number): void {
    ingredients.value.splice(index, 1)
  }

  function validate(): string[] {
    const errors: string[] = []
    if (!name.value.trim()) {
      errors.push('recipe.form.validation.nameRequired')
    }
    if (ingredients.value.filter((row) => row.name.trim()).length === 0) {
      errors.push('recipe.form.validation.ingredientRequired')
    }
    return errors
  }

  function toRecipeInput(): Omit<Recipe, 'id'> {
    const trimmedName = name.value.trim()
    const trimmedNotes = notes.value.trim()

    return {
      name: trimmedName,
      ingredients: ingredients.value
        .map(({ name, quantity }) => ({
          name: name.trim(),
          quantity: quantity.trim(),
        }))
        .filter((row) => row.name)
        .map(({ name, quantity }) => (quantity ? { name, quantity } : { name })),
      ...(mealType.value ? { mealType: mealType.value } : {}),
      ...(trimmedNotes ? { notes: trimmedNotes } : {}),
    }
  }

  return { name, mealType, notes, ingredients, addIngredient, removeIngredient, validate, toRecipeInput }
}
