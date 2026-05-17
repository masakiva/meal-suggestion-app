import { describe, it, expect, beforeEach } from 'vitest'
import 'fake-indexeddb/auto'
import { IDBFactory } from 'fake-indexeddb'
import { openAppDB, type AppDB } from '../db'
import { IndexedDBPantryRepository } from '../IndexedDBPantryRepository'
import type { PantryItem } from '../../domain/entities'

async function makeTestDB(): Promise<AppDB> {
  globalThis.indexedDB = new IDBFactory()
  return openAppDB()
}

const flour: PantryItem = { id: 'p1', ingredient: { name: 'Flour', quantity: '500g' } }
const egg: PantryItem = { id: 'p2', ingredient: { name: 'Egg' } }

describe('IndexedDBPantryRepository', () => {
  let repo: IndexedDBPantryRepository

  beforeEach(async () => {
    const db = await makeTestDB()
    repo = new IndexedDBPantryRepository(db)
  })

  it('should return empty list when pantry is empty', async () => {
    expect(await repo.getAll()).toEqual([])
  })

  it('should save and retrieve all items', async () => {
    await repo.save(flour)
    await repo.save(egg)
    expect(await repo.getAll()).toHaveLength(2)
  })

  it('should overwrite an item on save with same id', async () => {
    await repo.save(flour)
    const updated: PantryItem = { ...flour, ingredient: { ...flour.ingredient, quantity: '1kg' } }
    await repo.save(updated)
    const all = await repo.getAll()
    expect(all).toHaveLength(1)
    expect(all[0]).toBeDefined()
    expect(all[0]?.ingredient.quantity).toBe('1kg')
  })

  it('should delete an item by id', async () => {
    await repo.save(flour)
    await repo.delete('p1')
    expect(await repo.getAll()).toEqual([])
  })

  it('should clear all items', async () => {
    await repo.save(flour)
    await repo.save(egg)
    await repo.clear()
    expect(await repo.getAll()).toEqual([])
  })
})
