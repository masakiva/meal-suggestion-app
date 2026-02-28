import type { PantryItem } from '../domain/entities'
import type { PantryRepository } from '../domain/repositories'
import type { AppDB } from './db'

export class IndexedDBPantryRepository implements PantryRepository {
  constructor(private db: AppDB) {}

  getAll(): Promise<PantryItem[]> {
    return this.db.getAll('pantry')
  }

  async save(item: PantryItem): Promise<void> {
    await this.db.put('pantry', item)
  }

  delete(id: string): Promise<void> {
    return this.db.delete('pantry', id)
  }

  clear(): Promise<void> {
    return this.db.clear('pantry')
  }
}
