import { openDB } from 'idb'
import type { DBSchema, IDBPDatabase } from 'idb'
import type { Recipe, PantryItem } from '../domain/entities'

interface MealSuggesterDB extends DBSchema {
  recipes: {
    key: string
    value: Recipe
  }
  pantry: {
    key: string
    value: PantryItem
  }
}

export type AppDB = IDBPDatabase<MealSuggesterDB>

export function openAppDB(): Promise<AppDB> {
  return openDB<MealSuggesterDB>('meal-suggester', 1, {
    upgrade(db) {
      db.createObjectStore('recipes', { keyPath: 'id' })
      db.createObjectStore('pantry', { keyPath: 'id' })
    },
  })
}
