import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Recipe } from '../../domain/entities'
import type { RecipeRepository } from '../../domain/repositories'

export function useRecipes(repo: RecipeRepository): {
  recipes: Ref<Recipe[]>
  isLoading: Ref<boolean>
  loadRecipes(): Promise<void>
  addRecipe(input: Omit<Recipe, 'id'>): Promise<void>
  deleteRecipe(id: string): Promise<void>
} {
  const recipes = ref<Recipe[]>([])
  const isLoading = ref(false)

  async function loadRecipes(): Promise<void> {
    isLoading.value = true
    recipes.value = await repo.getAll()
    isLoading.value = false
  }

  async function addRecipe(input: Omit<Recipe, 'id'>): Promise<void> {
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      ...input,
    }

    await repo.save(recipe)
    await loadRecipes()
  }

  async function deleteRecipe(id: string): Promise<void> {
    await repo.delete(id)
    await loadRecipes()
  }

  return { recipes, isLoading, loadRecipes, addRecipe, deleteRecipe }
}
