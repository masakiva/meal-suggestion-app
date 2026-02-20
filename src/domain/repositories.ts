import type { Recipe, PantryItem } from './entities'

export interface RecipeRepository {
  getAll(): Promise<Recipe[]>
  getById(id: string): Promise<Recipe | undefined>
  save(recipe: Recipe): Promise<void>
  delete(id: string): Promise<void>
}

export interface PantryRepository {
  getAll(): Promise<PantryItem[]>
  save(item: PantryItem): Promise<void>
  delete(id: string): Promise<void>
  clear(): Promise<void>
}
