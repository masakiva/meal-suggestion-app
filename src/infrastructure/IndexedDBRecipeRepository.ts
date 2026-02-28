import type { Recipe } from '../domain/entities'
import type { RecipeRepository } from '../domain/repositories'
import type { AppDB } from './db'

export class IndexedDBRecipeRepository implements RecipeRepository {
  constructor(private db: AppDB) {}

  getAll(): Promise<Recipe[]> {
    return this.db.getAll('recipes')
  }

  getById(id: string): Promise<Recipe | undefined> {
    return this.db.get('recipes', id)
  }

  async save(recipe: Recipe): Promise<void> {
    await this.db.put('recipes', recipe)
  }

  delete(id: string): Promise<void> {
    return this.db.delete('recipes', id)
  }
}
