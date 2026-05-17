import { describe, it, expect, beforeEach } from 'vitest'
import { useRecipes } from '../useRecipes'
import type { Recipe } from '../../../domain/entities'
import type { RecipeRepository } from '../../../domain/repositories'

class InMemoryRecipeRepository implements RecipeRepository {
  private items: Recipe[] = []

  async getAll(): Promise<Recipe[]> {
    return [...this.items]
  }

  async getById(id: string): Promise<Recipe | undefined> {
    return this.items.find((r) => r.id === id)
  }

  async save(recipe: Recipe): Promise<void> {
    const index = this.items.findIndex((r) => r.id === recipe.id)
    if (index >= 0) {
      this.items[index] = recipe
    } else {
      this.items.push(recipe)
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((r) => r.id !== id)
  }
}

describe('useRecipes', () => {
  let repo: InMemoryRecipeRepository

  beforeEach(() => {
    repo = new InMemoryRecipeRepository()
  })

  describe('loadRecipes', () => {
    it('should set recipes to empty list when repository has no recipes', async () => {
      const { recipes, loadRecipes } = useRecipes(repo)
      await loadRecipes()
      expect(recipes.value).toEqual([])
    })

    it('should set recipes to all items from repository', async () => {
      const recipe: Recipe = { id: '1', name: 'Pasta', ingredients: [{ name: 'Pasta' }] }
      await repo.save(recipe)
      const { recipes, loadRecipes } = useRecipes(repo)
      await loadRecipes()
      expect(recipes.value).toEqual([recipe])
    })
  })

  describe('addRecipe', () => {
    it('should save recipe with a generated id and reload recipes', async () => {
      const { recipes, addRecipe } = useRecipes(repo)
      await addRecipe({ name: 'Curry', ingredients: [{ name: 'Chicken' }] })
      expect(recipes.value).toHaveLength(1)
      expect(recipes.value[0]!.name).toBe('Curry')
      expect(typeof recipes.value[0]!.id).toBe('string')
      expect(recipes.value[0]!.id).not.toBe('')
    })
  })

  describe('deleteRecipe', () => {
    it('should remove recipe by id and reload recipes', async () => {
      const recipe: Recipe = { id: 'abc', name: 'Pasta', ingredients: [{ name: 'Pasta' }] }
      await repo.save(recipe)
      const { recipes, loadRecipes, deleteRecipe } = useRecipes(repo)
      await loadRecipes()
      expect(recipes.value).toHaveLength(1)
      await deleteRecipe('abc')
      expect(recipes.value).toHaveLength(0)
    })
  })
})
