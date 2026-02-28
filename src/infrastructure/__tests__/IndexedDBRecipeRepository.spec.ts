import { describe, it, expect, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import { IDBFactory } from 'fake-indexeddb'
import { openAppDB, type AppDB } from '../db'
import { IndexedDBRecipeRepository } from '../IndexedDBRecipeRepository'
import type { Recipe } from '../../domain/entities'

async function makeTestDB(): Promise<AppDB> {
  globalThis.indexedDB = new IDBFactory()
  return openAppDB()
}

const sampleRecipe: Recipe = {
  id: 'r1',
  name: 'Omelette',
  ingredients: [{ name: 'Egg', quantity: '2' }],
  mealType: 'Breakfast',
}

describe('IndexedDBRecipeRepository', () => {
  let repo: IndexedDBRecipeRepository

  beforeEach(async () => {
    const db = await makeTestDB()
    repo = new IndexedDBRecipeRepository(db)
  })

  it('should return empty list when no recipes exist', async () => {
    expect(await repo.getAll()).toEqual([])
  })

  it('should save and retrieve a recipe by id', async () => {
    await repo.save(sampleRecipe)
    expect(await repo.getById('r1')).toEqual(sampleRecipe)
  })

  it('should return undefined for a non-existent id', async () => {
    expect(await repo.getById('missing')).toBeUndefined()
  })

  it('should return all saved recipes', async () => {
    const second: Recipe = { id: 'r2', name: 'Toast', ingredients: [{ name: 'Bread' }] }
    await repo.save(sampleRecipe)
    await repo.save(second)
    expect(await repo.getAll()).toHaveLength(2)
  })

  it('should overwrite a recipe on save with same id', async () => {
    await repo.save(sampleRecipe)
    const updated: Recipe = { ...sampleRecipe, name: 'Scrambled Eggs' }
    await repo.save(updated)
    expect((await repo.getById('r1'))?.name).toBe('Scrambled Eggs')
  })

  it('should delete a recipe by id', async () => {
    await repo.save(sampleRecipe)
    await repo.delete('r1')
    expect(await repo.getById('r1')).toBeUndefined()
  })
})
